import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import githubRoutes from './routes/github.js';
import healthRoutes from './routes/health.js';
import renderRoutes from './routes/render.js';
import { getGithubSummary } from './services/githubService.js';
import { getEnvNames, getLogsSummary, getServiceSummary } from './services/renderService.js';

const app = express();
const PORT = process.env.PORT || 4000;

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

app.get('/api/summary', async (_req, res) => {
  const [service, logs, github, envNames] = await Promise.all([
    getServiceSummary(),
    getLogsSummary(),
    getGithubSummary(),
    getEnvNames()
  ]);

  res.json({
    service,
    logs,
    github,
    envNames
  });
});

app.use((error, _req, res, _next) => {
  console.error('[kritik-hata]', error);
  res.status(500).json({ message: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.' });
});

app.listen(PORT, () => {
  console.log(`Render köprü backend ${PORT} portunda hazır.`);
});
