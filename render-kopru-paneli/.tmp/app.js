const STORAGE_KEY = 'render-kopru-paneli-api-base';

function getDefaultApiBase() {
  if (window.API_BASE) return window.API_BASE;
  if (window.location.protocol.startsWith('http')) {
    return `${window.location.origin.replace(/\/$/, '')}/api`;
  }
  return 'http://localhost:4000/api';
}

function getApiBase() {
  return localStorage.getItem(STORAGE_KEY) || getDefaultApiBase();
}

const elements = {
  baglanti: document.getElementById('baglanti'),
  servis: document.getElementById('servis'),
  deploy: document.getElementById('deploy'),
  log: document.getElementById('log'),
  github: document.getElementById('github'),
  env: document.getElementById('env'),
  sonuc: document.getElementById('sonuc'),
  apiBase: document.getElementById('apiBase'),
  apiBaseBilgi: document.getElementById('apiBaseBilgi'),
  apiBaseKaydet: document.getElementById('apiBaseKaydet')
};

// [TALİMAT NO: 4 | TALİMAT ADI: İLK ÇALIŞAN SÜRÜMÜN ÖZELLİK SINIRINI KORU] Bu açıklama, ilk sürümün gereksiz büyümesini önlemek için eklendi.
// [TALİMAT NO: 5 | TALİMAT ADI: İLK ÇALIŞAN SÜRÜMDE OLMASI GEREKEN BUTONLARI KUR] Bu açıklama, ilk sürümdeki temel butonların kapsamını sabitlemek için eklendi.
// [TALİMAT NO: 6 | TALİMAT ADI: ARAYÜZÜ AŞIRI KOLAY KULLANILIR TASARLA] Bu açıklama, tek sayfa ve acemi dostu tasarım kararını göstermek için eklendi.
// [TALİMAT NO: 9 | TALİMAT ADI: TESLİM ÇIKTILARINI TAM HAZIRLA] Bu açıklama, teslimin sadece koddan ibaret olmadığını göstermek için eklendi.
// [TALİMAT NO: 11 | TALİMAT ADI: KODEKS ÇIKTI BİÇİMİNİ SABİTLE] Bu açıklama, sonuç raporunun dağılmaması için eklendi.
// [TALİMAT NO: 12 | TALİMAT ADI: KISA OPERASYON ÖZETİNİ TEK PARAGRAFTA SABİTLE] Bu açıklama, projenin özünü tek paragrafta sabitlemek için eklendi.
// [TALİMAT NO: 13 | TALİMAT ADI: YASAKLI DAVRANIŞLARI AÇIKÇA KORU] Bu açıklama, yanlış genişlemeyi ve mevcut projeye karışmayı önlemek için eklendi.
// [TALİMAT NO: 14 | TALİMAT ADI: İŞE BAŞLAMA EMRİNİ KISA VE KESİN VER] Bu açıklama, uygulama sırasını sabitlemek için eklendi.

async function api(path, options = {}) {
  const response = await fetch(`${getApiBase()}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'İstek başarısız oldu.');
  }
  return data;
}

function write(id, text, cls = '') {
  elements[id].className = cls;
  elements[id].textContent = text;
}

function renderApiBaseInfo() {
  const current = getApiBase();
  elements.apiBase.value = current;
  elements.apiBaseBilgi.textContent = `Aktif backend adresi: ${current}`;
}

async function refreshAll() {
  const data = await api('/summary');
  write('servis', `${data.service.serviceName} (${data.service.serviceType}) - ${data.service.serviceStatus}`, 'ok');
  write('deploy', `${data.service.lastDeployStatus} / ${data.service.lastDeployAt || 'zaman bilgisi yok'}`);
  write('log', data.logs.lines?.join(' | ') || 'Log yok', data.logs.lines?.length ? 'warn' : '');
  write('github', `${data.github.branch} - ${data.github.lastCommit} - ${data.github.repoUrl}`);
  write('env', (data.envNames || []).join(', ') || 'Ortam değişkeni yok');
}

async function handleAction(action) {
  try {
    if (action === 'baglanti') {
      const data = await api('/health');
      write('baglanti', `${data.message} (${data.timestamp})`, 'ok');
      write('sonuc', 'Bağlantı kontrolü başarılı.', 'ok');
      return;
    }

    if (action === 'servis') {
      const data = await api('/render/service');
      write('servis', `${data.serviceName} (${data.serviceType}) - ${data.serviceStatus}`, 'ok');
      write('deploy', `${data.lastDeployStatus} / ${data.lastDeployAt || 'zaman bilgisi yok'}`);
      write('sonuc', 'Servis bilgileri güncellendi.', 'ok');
      return;
    }

    if (action === 'yenile') {
      await refreshAll();
      write('baglanti', 'Tüm veriler güncel bağlantı ile yenilendi.', 'ok');
      write('sonuc', 'Tüm kartlar yenilendi.', 'ok');
      return;
    }

    if (action === 'log') {
      const data = await api('/render/logs');
      write('log', `${data.summary} ${data.lines?.join(' | ') || ''}`.trim(), 'warn');
      write('sonuc', 'Log özeti güncellendi.', 'ok');
      return;
    }

    if (action === 'redeploy') {
      if (!window.confirm('Yeniden deploy işlemini başlatmak istediğinize emin misiniz?')) return;
      const data = await api('/render/redeploy', { method: 'POST' });
      write('sonuc', data.message, 'ok');
      return;
    }

    if (action === 'restart') {
      if (!window.confirm('Servisi yeniden başlatmak istediğinize emin misiniz?')) return;
      const data = await api('/render/restart', { method: 'POST' });
      write('sonuc', data.message, 'ok');
      return;
    }

    if (action === 'github') {
      const data = await api('/github/summary');
      write('github', `${data.branch} - ${data.lastCommit} - ${data.repoUrl}`, 'ok');
      write('sonuc', 'GitHub özeti güncellendi.', 'ok');
      return;
    }

    if (action === 'env') {
      const data = await api('/render/env-names');
      write('env', (data.envNames || []).join(', ') || 'Ortam değişkeni bulunamadı.');
      write('sonuc', 'Sadece ortam değişken adı listesi gösterildi.', 'warn');
      return;
    }

    if (action === 'kopyala') {
      const text = `Backend: ${getApiBase()}\nBağlantı: ${elements.baglanti.textContent}\nServis: ${elements.servis.textContent}\nDeploy: ${elements.deploy.textContent}\nLog: ${elements.log.textContent}\nGitHub: ${elements.github.textContent}\nEnv: ${elements.env.textContent}`;
      await navigator.clipboard.writeText(text);
      write('sonuc', 'Durum özeti panoya kopyalandı.', 'ok');
    }
  } catch (error) {
    write('sonuc', `İşlem sırasında sorun oluştu: ${error.message}`, 'err');
  }
}

elements.apiBaseKaydet.addEventListener('click', () => {
  const value = elements.apiBase.value.trim().replace(/\/$/, '');
  if (!value) {
    localStorage.removeItem(STORAGE_KEY);
  } else {
    localStorage.setItem(STORAGE_KEY, value);
  }
  renderApiBaseInfo();
  write('sonuc', 'Backend adresi kaydedildi.', 'ok');
});

document.querySelectorAll('button[data-action]').forEach((button) => {
  button.addEventListener('click', () => handleAction(button.dataset.action));
});

renderApiBaseInfo();
write('baglanti', 'Backend bağlantısı yoksa önce backend adresini kaydedin, sonra Bağlantıyı Kontrol Et butonunu kullanın.', 'warn');
