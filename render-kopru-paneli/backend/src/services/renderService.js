import { simplifyError } from '../utils/mask.js';

const RENDER_API = 'https://api.render.com/v1';

// [TALİMAT NO: 8 | TALİMAT ADI: RENDER SERVİS VERİSİNİ DOĞRU YORUMLA] Bu açıklama, Render verisinin yanlış mantıkla yorumlanmaması için eklendi.
function serviceHeaders() {
  return {
    Authorization: `Bearer ${process.env.RENDER_API_KEY || ''}`,
    'Content-Type': 'application/json'
  };
}

function fallbackServiceSummary() {
  return {
    mode: 'fallback',
    serviceName: process.env.RENDER_SERVICE_NAME || 'Örnek Servis',
    serviceType: 'web_service',
    serviceStatus: 'bilgi-yok',
    lastDeployStatus: 'bilgi-yok',
    lastDeployAt: null,
    health: 'bilgi-yok'
  };
}

async function parseJsonSafe(response) {
  if (response.status === 204) return null;
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

async function renderFetch(path, options = {}) {
  if (!process.env.RENDER_API_KEY || !process.env.RENDER_SERVICE_ID) {
    return null;
  }

  const response = await fetch(`${RENDER_API}${path}`, {
    ...options,
    headers: {
      ...serviceHeaders(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Render API hatası: ${response.status}`);
  }

  return parseJsonSafe(response);
}

function normalizeDeploys(deploys) {
  if (Array.isArray(deploys)) return deploys;
  if (Array.isArray(deploys?.data)) return deploys.data;
  if (Array.isArray(deploys?.items)) return deploys.items;
  return [];
}

function normalizeLogs(rawLogs) {
  const list = Array.isArray(rawLogs)
    ? rawLogs
    : Array.isArray(rawLogs?.logs)
      ? rawLogs.logs
      : Array.isArray(rawLogs?.data)
        ? rawLogs.data
        : [];

  return list.slice(0, 5).map((line) => {
    if (typeof line === 'string') return line;
    if (line?.message) return line.message;
    if (line?.text) return line.text;
    return JSON.stringify(line);
  });
}

function normalizeEnvNames(envVars) {
  const list = Array.isArray(envVars)
    ? envVars
    : Array.isArray(envVars?.data)
      ? envVars.data
      : [];

  return list
    .map((item) => item?.key || item?.name || null)
    .filter(Boolean);
}

export async function getServiceSummary() {
  try {
    const service = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}`);
    const deploysRaw = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/deploys?limit=1`);

    if (!service) {
      return fallbackServiceSummary();
    }

    const deploys = normalizeDeploys(deploysRaw);
    const latestDeploy = deploys[0] || {};
    const suspended = service.suspended;
    const serviceStatus = suspended === 'not_suspended' || suspended === false ? 'aktif' : 'pasif';

    return {
      mode: 'live',
      serviceName: service.name || process.env.RENDER_SERVICE_NAME || 'Bilinmeyen Servis',
      serviceType: service.type || 'bilinmiyor',
      serviceStatus,
      lastDeployStatus: latestDeploy.status || 'bilgi-yok',
      lastDeployAt: latestDeploy.createdAt || latestDeploy.updatedAt || null,
      health: service.health || service.serviceDetails?.health || 'bilgi-yok'
    };
  } catch (error) {
    simplifyError(error, 'Render servis özeti alınamadı.');
    return fallbackServiceSummary();
  }
}

export async function getLogsSummary() {
  try {
    const logsRaw = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/logs?limit=20`);
    if (!logsRaw) {
      return { lines: ['Log bilgisi yok.'], summary: 'Fallback modda örnek log özeti gösteriliyor.' };
    }

    const lines = normalizeLogs(logsRaw);
    return {
      lines,
      summary: lines.length ? 'Son loglardan kısa özet üretildi.' : 'Log kaydı bulunamadı.'
    };
  } catch (error) {
    simplifyError(error, 'Log özeti alınamadı.');
    return {
      lines: ['Log verisi alınamadı.'],
      summary: 'Render log API erişimi başarısız oldu; servis çalışıyor olabilir.'
    };
  }
}

export async function triggerRedeploy() {
  try {
    const result = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/deploys`, {
      method: 'POST'
    });

    if (!result) {
      return { accepted: true, message: 'Fallback modda redeploy çağrısı simüle edildi.' };
    }

    return { accepted: true, message: 'Redeploy işlemi başlatıldı.' };
  } catch (error) {
    simplifyError(error, 'Redeploy işlemi başlatılamadı.');
    return { accepted: false, message: 'Redeploy işlemi şu anda başlatılamadı.' };
  }
}

export async function triggerRestart() {
  try {
    const result = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/restart`, {
      method: 'POST'
    });

    if (!result) {
      return { accepted: true, message: 'Fallback modda restart çağrısı simüle edildi.' };
    }

    return { accepted: true, message: 'Restart işlemi başlatıldı.' };
  } catch (error) {
    simplifyError(error, 'Restart işlemi başlatılamadı.');
    return { accepted: false, message: 'Restart işlemi şu anda başlatılamadı.' };
  }
}

export async function getEnvNames() {
  try {
    const envVars = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/env-vars`);
    if (!envVars) {
      return ['RENDER_API_KEY', 'RENDER_SERVICE_ID', 'Nekot_Buhtig'];
    }

    const names = normalizeEnvNames(envVars);
    return names.length ? names : ['bilgi-yok'];
  } catch (error) {
    simplifyError(error, 'Ortam değişken adları alınamadı.');
    return ['RENDER_API_KEY', 'RENDER_SERVICE_ID', 'Nekot_Buhtig'];
  }
}
