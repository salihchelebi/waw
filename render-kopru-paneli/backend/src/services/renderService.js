import { simplifyError } from '../utils/mask.js';

const RENDER_API = 'https://api.render.com/v1';

function headers() {
  return {
    Authorization: `Bearer ${process.env.RENDER_API_KEY || ''}`,
    'Content-Type': 'application/json'
  };
}

async function renderFetch(path, options = {}) {
  if (!process.env.RENDER_API_KEY || !process.env.RENDER_SERVICE_ID) {
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

  return response.json();
}

export async function getServiceSummary() {
  try {
    const service = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}`);
    const deploys = await renderFetch(`/services/${process.env.RENDER_SERVICE_ID}/deploys?limit=1`);

    if (!service || !deploys) {
      return {
        serviceName: process.env.RENDER_SERVICE_NAME || 'Örnek Servis',
        serviceType: 'web_service',
        serviceStatus: 'bilgi-yok',
        lastDeployStatus: 'bilgi-yok',
        lastDeployAt: null,
        health: 'bilgi-yok'
      };
    }

    const latestDeploy = deploys[0] || {};
    return {
      serviceName: service.name,
      serviceType: service.type,
      serviceStatus: service.serviceDetails?.buildPlan || service.suspended === 'not_suspended' ? 'aktif' : 'belirsiz',
      lastDeployStatus: latestDeploy.status || 'bilinmiyor',
      lastDeployAt: latestDeploy.createdAt || null,
      health: service.health || 'bilinmiyor'
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

    const lines = (logs.logs || []).slice(0, 5).map((line) => line.message || line);
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
      return ['RENDER_API_KEY', 'RENDER_SERVICE_ID', 'GITHUB_TOKEN'];
    }

    return (envVars || []).map((item) => item.key);
  } catch (error) {
    throw new Error(simplifyError(error, 'Ortam değişken adları alınamadı.'));
  }
}
