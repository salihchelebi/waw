const BACKEND_STORAGE_KEY = 'render_kopru_api_base';

const elements = {
  baglanti: document.getElementById('baglanti'),
  servis: document.getElementById('servis'),
  deploy: document.getElementById('deploy'),
  log: document.getElementById('log'),
  github: document.getElementById('github'),
  env: document.getElementById('env'),
  sonuc: document.getElementById('sonuc'),
  backendUrl: document.getElementById('backendUrl'),
  saveBackendUrl: document.getElementById('saveBackendUrl'),
  resetBackendUrl: document.getElementById('resetBackendUrl'),
  backendBilgi: document.getElementById('backendBilgi')
};

// [TALİMAT NO: 1 | TALİMAT ADI: GÖREVİN TEK HEDEFİNİ KİLİTLE] Bu açıklama, frontend ve backend tam uyum hedefini sabitlemek için eklendi.
// [TALİMAT NO: 2 | TALİMAT ADI: İZOLASYON SINIRINI KORU] Bu açıklama, panelin mevcut projeden ayrıştığını göstermek için eklendi.
// [TALİMAT NO: 3 | TALİMAT ADI: INDEX HTML İÇİN GEREKEN TÜM ÖĞELERİ SABİTLE] Bu açıklama, HTML ve JS öğe eşleşmesini garanti etmek için eklendi.
// [TALİMAT NO: 4 | TALİMAT ADI: FRONTEND API TABANINI ACEMİ DOSTU HALE GETİR] Bu açıklama, backend adresi ayarını panel içinden yönetilebilir yapmak için eklendi.
// [TALİMAT NO: 5 | TALİMAT ADI: BUTONLARI GERÇEK API UÇ NOKTALARIYLA EŞLEŞTİR] Bu açıklama, buton ve endpoint eşleşmesini görünür biçimde sabitlemek için eklendi.
// [TALİMAT NO: 10 | TALİMAT ADI: FRONTEND DURUM YAZILARINI TUTARLI KIL] Bu açıklama, kullanıcıya görünen metinlerin tek bir dil ve biçimde kalması için eklendi.
// [TALİMAT NO: 11 | TALİMAT ADI: KOPYALANABİLİR ÖZETİ GERÇEK DURUMDAN ÜRET] Bu açıklama, pano özetinin sunulabilir ve temiz kalması için eklendi.
// [TALİMAT NO: 15 | TALİMAT ADI: FRONTEND YAYIN AKIŞINI BOŞLUKSUZ ANLAT] Bu açıklama, statik frontend yayın akışının açık yazılması için eklendi.
// [TALİMAT NO: 16 | TALİMAT ADI: README VE DOKÜMANLARI GERÇEK DURUMA EŞLE] Bu açıklama, doküman ile gerçek kod davranışını eşitlemek için eklendi.
// [TALİMAT NO: 18 | TALİMAT ADI: DOĞRULAMA KOMUTLARINI GERÇEKÇİ KUR] Bu açıklama, yanlış test anlatımı yerine gerçek doğrulama zinciri kurmak için eklendi.
// [TALİMAT NO: 19 | TALİMAT ADI: CANLI AÇILIŞ YOLUNU HAZIRLA] Bu açıklama, kodun canlı açılış zincirine hazır hale gelmesi için eklendi.
// [TALİMAT NO: 20 | TALİMAT ADI: TESLİM RAPORUNU DOSYA BAZLI VE KANITLI VER] Bu açıklama, teslim raporunun kanıtsız ve dağınık olmaması için eklendi.
// [TALİMAT NO: 21 | TALİMAT ADI: SON UYGULAMA EMRİNİ NET VER] Bu açıklama, uygulama sırasının sapmasız izlenmesi için eklendi.

function trimSlash(url) {
  return (url || '').trim().replace(/\/+$/, '');
}

function inferDefaultApiBase() {
  const originApi = `${window.location.origin}/api`;
  if (window.location.protocol.startsWith('http')) {
    return originApi;
  }
  return 'http://localhost:4000/api';
}

function getApiBase() {
  const fromWindow = trimSlash(window.API_BASE);
  if (fromWindow) return fromWindow;

  const fromStorage = trimSlash(localStorage.getItem(BACKEND_STORAGE_KEY));
  if (fromStorage) return fromStorage;

  return inferDefaultApiBase();
}

let apiBase = getApiBase();

function updateBackendInfo(message) {
  elements.backendBilgi.textContent = `${message} Aktif adres: ${apiBase}`;
}

function setText(id, text, cls = '') {
  elements[id].className = cls;
  elements[id].textContent = text || 'bilgi yok';
}

function fmt(value) {
  return value === null || value === undefined || value === '' ? 'bilgi yok' : String(value);
}

async function api(path, options = {}) {
  const response = await fetch(`${apiBase}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'İstek başarısız oldu.');
  }
  return data;
}

function renderServiceCard(service) {
  setText('servis', `Servis: ${fmt(service.serviceName)} | Tip: ${fmt(service.serviceType)} | Durum: ${fmt(service.serviceStatus)}`);
  setText('deploy', `Deploy: ${fmt(service.lastDeployStatus)} | Zaman: ${fmt(service.lastDeployAt)} | Health: ${fmt(service.health)}`);
}

function renderLogs(logs) {
  const lines = Array.isArray(logs.lines) ? logs.lines.join(' | ') : 'bilgi yok';
  setText('log', `Özet: ${fmt(logs.summary)} | Satırlar: ${fmt(lines)}`);
}

function renderGithub(github) {
  setText('github', `Branch: ${fmt(github.branch)} | Commit: ${fmt(github.lastCommit)} | Repo: ${fmt(github.repoUrl)}`);
}

function renderEnv(envNames) {
  const list = Array.isArray(envNames) ? envNames.join(', ') : 'bilgi yok';
  setText('env', `Anahtarlar: ${fmt(list)}`);
}

async function refreshSummary() {
  const data = await api('/summary');
  renderServiceCard(data.service || {});
  renderLogs(data.logs || {});
  renderGithub(data.github || {});
  renderEnv(data.envNames || []);

  const issueText = (data.issues || []).length ? `Eksik parçalar: ${data.issues.join(', ')}` : 'Tüm parçalar alındı.';
  setText('sonuc', issueText, (data.issues || []).length ? 'warn' : 'ok');
}

async function handleAction(action) {
  try {
    if (action === 'baglanti') {
      const health = await api('/health');
      setText('baglanti', `Bağlantı hazır. Mesaj: ${fmt(health.message)}`, 'ok');
      setText('sonuc', 'Bağlantı kontrolü tamamlandı.', 'ok');
      return;
    }

    if (action === 'servis') {
      const service = await api('/render/service');
      renderServiceCard(service);
      setText('sonuc', 'Servis özeti güncellendi.', 'ok');
      return;
    }

    if (action === 'yenile') {
      await refreshSummary();
      return;
    }

    if (action === 'log') {
      const logs = await api('/render/logs');
      renderLogs(logs);
      setText('sonuc', 'Log özeti güncellendi.', 'ok');
      return;
    }

    if (action === 'redeploy') {
      if (!window.confirm('Yeniden deploy başlatılsın mı?')) return;
      const result = await api('/render/redeploy', { method: 'POST' });
      setText('sonuc', fmt(result.message), 'ok');
      return;
    }

    if (action === 'restart') {
      if (!window.confirm('Servis yeniden başlatılsın mı?')) return;
      const result = await api('/render/restart', { method: 'POST' });
      setText('sonuc', fmt(result.message), 'ok');
      return;
    }

    if (action === 'github') {
      const github = await api('/github/summary');
      renderGithub(github);
      setText('sonuc', 'GitHub özeti güncellendi.', 'ok');
      return;
    }

    if (action === 'env') {
      const env = await api('/render/env-names');
      renderEnv(env.envNames || []);
      setText('sonuc', 'Ortam değişken adları listelendi.', 'warn');
      return;
    }

    if (action === 'kopyala') {
      const summaryText = [
        `Backend Adresi: ${fmt(apiBase)}`,
        `Bağlantı Durumu: ${fmt(elements.baglanti.textContent)}`,
        `Servis Özeti: ${fmt(elements.servis.textContent)}`,
        `Deploy Özeti: ${fmt(elements.deploy.textContent)}`,
        `Log Özeti: ${fmt(elements.log.textContent)}`,
        `GitHub Özeti: ${fmt(elements.github.textContent)}`,
        `Env Özeti: ${fmt(elements.env.textContent)}`
      ].join('\n');

      await navigator.clipboard.writeText(summaryText);
      setText('sonuc', 'Durum özeti panoya kopyalandı.', 'ok');
      return;
    }
  } catch (_error) {
    setText('sonuc', 'İşlem tamamlanamadı. Lütfen backend adresini ve bağlantıyı kontrol edin.', 'err');
  }
}

elements.saveBackendUrl.addEventListener('click', () => {
  const nextUrl = trimSlash(elements.backendUrl.value);
  if (!nextUrl) {
    setText('sonuc', 'Kaydetmek için geçerli bir backend adresi girin.', 'warn');
    return;
  }

  localStorage.setItem(BACKEND_STORAGE_KEY, nextUrl);
  apiBase = nextUrl;
  updateBackendInfo('Backend adresi kaydedildi.');
  setText('sonuc', 'Backend adresi kaydedildi.', 'ok');
});

elements.resetBackendUrl.addEventListener('click', () => {
  localStorage.removeItem(BACKEND_STORAGE_KEY);
  apiBase = getApiBase();
  elements.backendUrl.value = '';
  updateBackendInfo('Backend adresi sıfırlandı.');
  setText('sonuc', 'Varsayılan adres akışına dönüldü.', 'warn');
});

document.querySelectorAll('button[data-action]').forEach((button) => {
  button.addEventListener('click', () => handleAction(button.dataset.action));
});

updateBackendInfo('Panel hazır.');
setText('baglanti', 'Bağlantıyı Kontrol Et ile başlayın.', 'warn');
