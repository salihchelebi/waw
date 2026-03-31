import { simplifyError } from '../utils/mask.js';

const RENDER_API = 'https://api.render.com/v1';

function hasRenderConfig() {
  return Boolean(process.env.RENDER_API_KEY && process.env.RENDER_SERVICE_ID);
}

function headers() {
  return {
    Authorization: `Bearer ${process.env.RENDER_API_KEY || ''}`,
    'Content-Type': 'application/json'
  };
}

async function renderFetch(path, options = {}) {
  if (!hasRenderConfig()) {
    return null;
  }

  const response = await fetch(`${RENDER_API}${path}`, {
    ...options,
    headers: {
      ...headers(),
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error(`Render API hatası: ${response.status}`);
  }

  if (response.status === 204) {
    return { accepted: true };
  }

  return response.json();
}

function getFallbackServiceSummary() {
  return {
    serviceName: process.env.RENDER_SERVICE_NAME || 'Örnek Servis',
    serviceType: 'web_service',
    serviceStatus: 'örnek-mod',
    lastDeployStatus: 'bilgi-yok',
    lastDeployAt: null,
    health: 'bilgi-yok'
  };
}

export async function getServiceSummary() {
  try {
    const service = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}`);
    const deploys = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/deploys?limit=1`);

    if (!service || !deploys) {
      return getFallbackServiceSummary();
    }

    const latestDeploy = Array.isArray(deploys) ? (deploys[0] || {}) : ((deploys.deploys || [])[0] || {});
    const isActive = service.suspended === 'not_suspended' || service.suspended === false;
    const health = service.serviceDetails?.healthCheckPath ? 'izleniyor' : (service.health || 'bilinmiyor');

    return {
      serviceName: service.name || process.env.RENDER_SERVICE_NAME || 'Render Servisi',
      serviceType: service.type || 'web_service',
      serviceStatus: isActive ? 'aktif' : 'pasif-veya-belirsiz',
      lastDeployStatus: latestDeploy.status || 'bilinmiyor',
      lastDeployAt: latestDeploy.createdAt || latestDeploy.finishedAt || null,
      health
    };
  } catch (error) {
    throw new Error(simplifyError(error, 'Render servis özeti alınamadı.'));
  }
}

export async function getLogsSummary() {
  try {
    const logs = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/logs?limit=20`);
    if (!logs) {
      return { lines: ['Log bilgisi yok.'], summary: 'Render API anahtarı olmadığı için örnek veri gösteriliyor.' };
    }

    const rawLines = Array.isArray(logs) ? logs : (logs.logs || logs.lines || []);
    const lines = rawLines.slice(0, 5).map((line) => line.message || line.text || String(line));
    return {
      lines,
      summary: lines.length ? 'Son loglardan kısa özet hazırlandı.' : 'Log kaydı bulunamadı.'
    };
  } catch (error) {
    throw new Error(simplifyError(error, 'Log özeti alınamadı.'));
  }
}

export async function triggerRedeploy() {
  try {
    const result = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/deploys`, {
      method: 'POST'
    });

    if (!result) {
      return { accepted: true, message: 'Örnek modda redeploy çağrısı simüle edildi.' };
    }

    return { accepted: true, message: 'Redeploy işlemi başlatıldı.' };
  } catch (error) {
    throw new Error(simplifyError(error, 'Redeploy işlemi başlatılamadı.'));
  }
}

export async function triggerRestart() {
  try {
    const result = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/restart`, {
      method: 'POST'
    });

    if (!result) {
      return { accepted: true, message: 'Örnek modda restart çağrısı simüle edildi.' };
    }

    return { accepted: true, message: 'Restart işlemi başlatıldı.' };
  } catch (error) {
    throw new Error(simplifyError(error, 'Restart işlemi başlatılamadı.'));
  }
}

export async function getEnvNames() {
  try {
    const envVars = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/env-vars`);
    if (!envVars) {
      return ['RENDER_API_KEY', 'RENDER_SERVICE_ID', 'RENDER_SERVICE_NAME', 'GITHUB_TOKEN', 'GITHUB_OWNER', 'GITHUB_REPO', 'GITHUB_BRANCH'];
    }

    const items = Array.isArray(envVars) ? envVars : (envVars.envVars || []);
    return items.map((item) => item.key).filter(Boolean);
  } catch (error) {
    throw new Error(simplifyError(error, 'Ortam değişken adları alınamadı.'));
  }
}
