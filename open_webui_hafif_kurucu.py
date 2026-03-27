import os
import sys
import subprocess
import threading
import socket
import webbrowser
import time
from pathlib import Path
import tkinter as tk
from tkinter import ttk, filedialog, messagebox

APP_TITLE = "Open WebUI Hafif Kurucu / Başlatıcı"
DEFAULT_PATH = r"C:\......a\open-webui-0.8.1"
DEFAULT_PORT = 8080


def is_windows():
    return os.name == "nt"


def get_python_in_venv(venv_dir: Path) -> Path:
    if is_windows():
        return venv_dir / "Scripts" / "python.exe"
    return venv_dir / "bin" / "python"


def get_open_webui_exe(venv_dir: Path) -> Path:
    if is_windows():
        return venv_dir / "Scripts" / "open-webui.exe"
    return venv_dir / "bin" / "open-webui"


def find_free_port(preferred: int = 8080) -> int:
    for port in [preferred] + list(range(preferred + 1, preferred + 30)):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            try:
                s.bind(("127.0.0.1", port))
                return port
            except OSError:
                pass
    raise RuntimeError("Boş port bulunamadı.")


class App:
    def __init__(self, root):
        self.root = root
        self.root.title(APP_TITLE)
        self.root.geometry("900x620")

        self.proc = None
        self.running_thread = None

        self.base_path = tk.StringVar(value=DEFAULT_PATH)
        self.port_var = tk.StringVar(value=str(DEFAULT_PORT))
        self.api_base_var = tk.StringVar(value="")
        self.model_var = tk.StringVar(value="")
        self.use_local_repo_var = tk.BooleanVar(value=True)
        self.install_from_pip_var = tk.BooleanVar(value=False)
        self.auto_browser_var = tk.BooleanVar(value=True)

        self._build_ui()

    def _build_ui(self):
        pad = {"padx": 10, "pady": 6}

        frm = ttk.Frame(self.root)
        frm.pack(fill="both", expand=True)

        top = ttk.LabelFrame(frm, text="Kurulum Ayarları")
        top.pack(fill="x", padx=10, pady=10)

        ttk.Label(top, text="Open WebUI klasörü").grid(row=0, column=0, sticky="w", **pad)
        ttk.Entry(top, textvariable=self.base_path, width=70).grid(row=0, column=1, sticky="ew", **pad)
        ttk.Button(top, text="Seç", command=self.pick_dir).grid(row=0, column=2, **pad)

        ttk.Label(top, text="Port").grid(row=1, column=0, sticky="w", **pad)
        ttk.Entry(top, textvariable=self.port_var, width=15).grid(row=1, column=1, sticky="w", **pad)

        ttk.Label(top, text="OpenAI-Compatible API Base (opsiyonel)").grid(row=2, column=0, sticky="w", **pad)
        ttk.Entry(top, textvariable=self.api_base_var, width=70).grid(row=2, column=1, sticky="ew", **pad)

        ttk.Label(top, text="Varsayılan model adı (opsiyonel)").grid(row=3, column=0, sticky="w", **pad)
        ttk.Entry(top, textvariable=self.model_var, width=70).grid(row=3, column=1, sticky="ew", **pad)

        ttk.Checkbutton(top, text="Yerel klasörden kur / çalıştır", variable=self.use_local_repo_var).grid(row=4, column=0, columnspan=2, sticky="w", **pad)
        ttk.Checkbutton(top, text="Pip üzerinden kur (yerel klasör yerine)", variable=self.install_from_pip_var).grid(row=5, column=0, columnspan=2, sticky="w", **pad)
        ttk.Checkbutton(top, text="Hazır olunca tarayıcıyı aç", variable=self.auto_browser_var).grid(row=6, column=0, columnspan=2, sticky="w", **pad)

        top.columnconfigure(1, weight=1)

        btns = ttk.Frame(frm)
        btns.pack(fill="x", padx=10, pady=(0, 10))

        ttk.Button(btns, text="1) Venv Oluştur + Güncelle", command=self.create_venv).pack(side="left", padx=5)
        ttk.Button(btns, text="2) Open WebUI Kur", command=self.install_webui).pack(side="left", padx=5)
        ttk.Button(btns, text="3) Başlat", command=self.start_webui).pack(side="left", padx=5)
        ttk.Button(btns, text="Durdur", command=self.stop_webui).pack(side="left", padx=5)
        ttk.Button(btns, text="Hepsini Otomatik Yap", command=self.full_setup).pack(side="left", padx=5)

        notes = ttk.LabelFrame(frm, text="Not")
        notes.pack(fill="x", padx=10, pady=(0, 10))
        msg = (
            "Bu araç global Python paketlerini karıştırmamak için kendi .venv klasörünü oluşturur.\n"
            "İlk açılış uzun sürebilir. Sorun olursa log penceresinin en alt satırlarına bak."
        )
        ttk.Label(notes, text=msg, justify="left").pack(anchor="w", padx=10, pady=8)

        logfrm = ttk.LabelFrame(frm, text="Log")
        logfrm.pack(fill="both", expand=True, padx=10, pady=(0, 10))

        self.text = tk.Text(logfrm, wrap="word", height=25)
        self.text.pack(fill="both", expand=True, padx=8, pady=8)

        self.write("Hazır.\n")

    def pick_dir(self):
        d = filedialog.askdirectory(initialdir=self.base_path.get() or os.getcwd())
        if d:
            self.base_path.set(d)

    def write(self, msg: str):
        self.text.insert("end", msg)
        self.text.see("end")
        self.root.update_idletasks()

    def run_cmd(self, cmd, cwd=None, env=None):
        self.write(f"\n> {' '.join(str(x) for x in cmd)}\n")
        proc = subprocess.Popen(
            cmd,
            cwd=cwd,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            shell=False
        )
        for line in proc.stdout:
            self.write(line)
        code = proc.wait()
        if code != 0:
            raise RuntimeError(f"Komut hata verdi. Çıkış kodu: {code}")

    def get_paths(self):
        base = Path(self.base_path.get().strip()).resolve()
        venv_dir = base / ".venv"
        python_exe = get_python_in_venv(venv_dir)
        open_webui_exe = get_open_webui_exe(venv_dir)
        data_dir = base / "data"
        return base, venv_dir, python_exe, open_webui_exe, data_dir

    def ensure_base(self):
        base, *_ = self.get_paths()
        base.mkdir(parents=True, exist_ok=True)
        return base

    def create_venv(self):
        try:
            base, venv_dir, python_exe, _, _ = self.get_paths()
            self.ensure_base()
            if not venv_dir.exists():
                self.run_cmd([sys.executable, "-m", "venv", str(venv_dir)], cwd=str(base))
            self.run_cmd([str(python_exe), "-m", "pip", "install", "--upgrade", "pip", "setuptools", "wheel"], cwd=str(base))
            self.write("\n[V] Venv hazır.\n")
        except Exception as e:
            messagebox.showerror("Hata", str(e))
            self.write(f"\n[HATA] {e}\n")

    def install_webui(self):
        try:
            base, venv_dir, python_exe, _, _ = self.get_paths()
            if not venv_dir.exists():
                self.create_venv()

            if self.install_from_pip_var.get():
                self.run_cmd([str(python_exe), "-m", "pip", "install", "open-webui"], cwd=str(base))
            else:
                pyproject = base / "pyproject.toml"
                if not pyproject.exists():
                    raise RuntimeError("Seçtiğin klasörde pyproject.toml yok. Doğru Open WebUI klasörünü seç.")
                self.run_cmd([str(python_exe), "-m", "pip", "install", "."], cwd=str(base))

            self.write("\n[V] Open WebUI kurulumu tamam.\n")
        except Exception as e:
            messagebox.showerror("Hata", str(e))
            self.write(f"\n[HATA] {e}\n")

    def _start_thread(self):
        base, venv_dir, python_exe, open_webui_exe, data_dir = self.get_paths()

        if not venv_dir.exists():
            raise RuntimeError(".venv bulunamadı. Önce kurulum yap.")
        if not python_exe.exists():
            raise RuntimeError("Venv Python bulunamadı.")
        if not open_webui_exe.exists():
            # bazı sistemlerde exe yerine python -m open_webui daha güvenli olabilir
            if not (venv_dir / "Lib").exists():
                raise RuntimeError("Open WebUI komutu bulunamadı. Önce kurulum yap.")

        port = int(self.port_var.get().strip() or "8080")
        port = find_free_port(port)
        self.port_var.set(str(port))

        data_dir.mkdir(parents=True, exist_ok=True)

        env = os.environ.copy()
        env["DATA_DIR"] = str(data_dir)
        env["WEBUI_AUTH"] = "False"
        env["PORT"] = str(port)
        env["HOST"] = "127.0.0.1"
        env["ENABLE_OPENAI_API"] = "True"
        env["ENABLE_OLLAMA_API"] = "True"

        if self.api_base_var.get().strip():
            env["OPENAI_API_BASE_URL"] = self.api_base_var.get().strip()

        if self.model_var.get().strip():
            env["DEFAULT_MODELS"] = self.model_var.get().strip()

        cmd = [str(python_exe), "-m", "open_webui", "serve"]

        self.write(f"\n[*] DATA_DIR = {data_dir}\n")
        self.write(f"[*] URL = http://127.0.0.1:{port}\n")
        self.write("[*] WEBUI_AUTH kapalı. İlk test için giriş zorunluluğu yok.\n")

        self.proc = subprocess.Popen(
            cmd,
            cwd=str(base),
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            encoding="utf-8",
            errors="replace",
            shell=False
        )

        opened = False
        for line in self.proc.stdout:
            self.write(line)
            low = line.lower()
            if self.auto_browser_var.get() and not opened and ("application startup complete" in low or "running on" in low or "http://127.0.0.1" in low):
                opened = True
                webbrowser.open(f"http://127.0.0.1:{port}")

        rc = self.proc.wait()
        self.write(f"\n[!] Süreç bitti. Kod: {rc}\n")

    def start_webui(self):
        try:
            if self.running_thread and self.running_thread.is_alive():
                messagebox.showinfo("Bilgi", "Zaten çalışıyor.")
                return
            self.running_thread = threading.Thread(target=self._start_thread, daemon=True)
            self.running_thread.start()
        except Exception as e:
            messagebox.showerror("Hata", str(e))
            self.write(f"\n[HATA] {e}\n")

    def stop_webui(self):
        try:
            if self.proc and self.proc.poll() is None:
                self.proc.terminate()
                time.sleep(1)
                if self.proc.poll() is None:
                    self.proc.kill()
                self.write("\n[V] Open WebUI durduruldu.\n")
            else:
                self.write("\n[i] Çalışan süreç yok.\n")
        except Exception as e:
            messagebox.showerror("Hata", str(e))
            self.write(f"\n[HATA] {e}\n")

    def full_setup(self):
        def worker():
            try:
                self.create_venv()
                self.install_webui()
                self.start_webui()
            except Exception as e:
                self.write(f"\n[HATA] {e}\n")
        threading.Thread(target=worker, daemon=True).start()


if __name__ == "__main__":
    root = tk.Tk()
    try:
        ttk.Style().theme_use("clam")
    except Exception:
        pass
    app = App(root)
    root.mainloop()
