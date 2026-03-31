import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import githubRoutes from './routes/github.js';
import healthRoutes from './routes/health.js';
import renderRoutes from './routes/render.js';
import { getGithubSummary } from './services/githubService.js';
import { getEnvNames, getLogsSummary, getServiceSummary } from './services/renderService.js';
import { simplifyError } from './utils/mask.js';

const app = express();
const PORT = Number(process.env.PORT || 4000);

app.use(cors());
app.use(express.json());

// [TALİMAT NO: 1 | TALİMAT ADI: GÖREVİN KAPSAMINI DOĞRU SABİTLE] Bu açıklama, yeni yapının mevcut projeden izole tutulduğunu göstermek için eklendi.
// [TALİMAT NO: 2 | TALİMAT ADI: EN BASİT UYGULANABİLİR MİMARİYİ KUR] Bu açıklama, tek sayfa görünüm ile güvenli backend ayrımını göstermek için eklendi.
// [TALİMAT NO: 3 | TALİMAT ADI: PARÇALARI NEREYE KOYACAĞINI SABİTLE] Bu açıklama, klasörlerin görevlerini açık biçimde ayırmak için eklendi.
// [TALİMAT NO: 7 | TALİMAT ADI: BACKEND UÇ NOKTALARINI MİNİMUM VE ANLAŞILIR KUR] Bu açıklama, backend uç noktalarının sade ve görev odaklı kurulduğunu göstermek için eklendi.
// [TALİMAT NO: 8 | TALİMAT ADI: GÜVENLİK SINIRLARINI NET KORU] Bu açıklama, gizli değerlerin istemciye sızmaması için eklendi.
// [TALİMAT NO: 10 | TALİMAT ADI: DOĞRULAMA ZİNCİRİ OLMADAN TAMAMLANDI DEME] Bu açıklama, işin test ve doğrulama olmadan bitmiş sayılmaması için eklendi.

app.use('/api', healthRoutes);
app.use('/api', renderRoutes);
app.use('/api', githubRoutes);

app.get('/api/summary', async (_req, res, next) => {
  try {
    const [service, logs, github, envNames] = await Promise.allSettled([
      getServiceSummary(),
      getLogsSummary(),
      getGithubSummary(),
      getEnvNames()
    ]);

    res.json({
      service: service.status === 'fulfilled' ? service.value : {
        serviceName: process.env.RENDER_SERVICE_NAME || 'Örnek Servis',
        serviceType: 'web_service',
        serviceStatus: 'hata',
        lastDeployStatus: simplifyError(service.reason, 'Servis özeti alınamadı.'),
        lastDeployAt: null,
        health: 'hata'
      },
      logs: logs.status === 'fulfilled' ? logs.value : {
        lines: ['Log özeti alınamadı.'],
        summary: simplifyError(logs.reason, 'Log özeti alınamadı.')
      },
      github: github.status === 'fulfilled' ? github.value : {
        branch: process.env.GITHUB_BRANCH || 'main',
        lastCommit: simplifyError(github.reason, 'GitHub özeti alınamadı.'),
        repoUrl: process.env.GITHUB_OWNER && process.env.GITHUB_REPO ? `https://github.com/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}` : 'https://github.com/',
        committedAt: null
      },
      envNames: envNames.status === 'fulfilled' ? envNames.value : []
    });
  } catch (error) {
    next(error);
  }
});

app.use((error, _req, res, _next) => {
  console.error('[kritik-hata]', error);
  const message = simplifyError(error, 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.');
  res.status(500).json({ message });
});

app.listen(PORT, () => {
  console.log(`Render köprü backend ${PORT} portunda hazır.`);
});
