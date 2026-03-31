import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import githubRoutes from './routes/github.js';
import healthRoutes from './routes/health.js';
import renderRoutes from './routes/render.js';
import { getGithubSummary } from './services/githubService.js';
import { getEnvNames, getLogsSummary, getServiceSummary } from './services/renderService.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// [TALİMAT NO: 7 | TALİMAT ADI: SUMMARY UÇ NOKTASINI PARÇALI DAYANIKLI HALE GETİR] Bu açıklama, özet verisinin parça bazlı hata toleransı kazanması için eklendi.
// [TALİMAT NO: 13 | TALİMAT ADI: BACKEND PACKAGE VE ÇALIŞTIRMA AKIŞINI NETLEŞTİR] Bu açıklama, backend başlatma zincirinin yanlış dizin yüzünden kırılmaması için eklendi.
// [TALİMAT NO: 14 | TALİMAT ADI: RENDER BLUEPRINT VE ENV ZİNCİRİNİ TAMAMLA] Bu açıklama, backend deploy zincirinin eksiksiz kurulması için eklendi.
// [TALİMAT NO: 17 | TALİMAT ADI: GEÇİCİ DOSYA VE KALINTILARI TEMİZLE] Bu açıklama, teslimde yalnızca gerekli dosyaların bırakılması için eklendi.


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envCandidates = [
  path.resolve(__dirname, '../.env'),
  path.resolve(__dirname, '../../.env'),
  path.resolve(__dirname, '../../.env.example')
];

for (const envPath of envCandidates) {
  if (existsSync(envPath)) {
    dotenv.config({ path: envPath, override: false });
  }
}

const frontendDir = path.resolve(__dirname, '../../frontend');

if (existsSync(path.join(frontendDir, 'index.html'))) {
  app.use(express.static(frontendDir));
  app.get('/', (_req, res) => {
    res.sendFile(path.join(frontendDir, 'index.html'));
  });
}

app.use('/api', healthRoutes);
app.use('/api', renderRoutes);
app.use('/api', githubRoutes);

app.get('/api/summary', async (_req, res, next) => {
  try {
    const results = await Promise.allSettled([
      getServiceSummary(),
      getLogsSummary(),
      getGithubSummary(),
      getEnvNames()
    ]);

    const issues = [];
    const fallbackService = {
      serviceName: 'bilgi-yok',
      serviceType: 'bilgi-yok',
      serviceStatus: 'eksik',
      lastDeployStatus: 'bilgi-yok',
      lastDeployAt: null,
      health: 'bilgi-yok'
    };

    const service = results[0].status === 'fulfilled' ? results[0].value : (issues.push('Render Servis Özeti'), fallbackService);
    const logs = results[1].status === 'fulfilled' ? results[1].value : (issues.push('Log Özeti'), { lines: ['bilgi-yok'], summary: 'Log özeti alınamadı.' });
    const github = results[2].status === 'fulfilled' ? results[2].value : (issues.push('GitHub Özeti'), { branch: 'bilgi-yok', lastCommit: 'GitHub özeti alınamadı.', repoUrl: 'https://github.com/', committedAt: null });
    const envNames = results[3].status === 'fulfilled' ? results[3].value : (issues.push('Ortam Değişkenleri Özeti'), ['bilgi-yok']);

    res.json({ service, logs, github, envNames, issues });
  } catch (error) {
    next(error);
  }
});

app.get('*', (_req, res) => {
  res.status(404).json({
    message: 'Sayfa bulunamadı. Panel için / adresini, API için /api/* yollarını kullanın.'
  });
});

app.use((error, _req, res, _next) => {
  console.error('[kritik-hata]', error);
  res.status(500).json({ message: 'İşlem tamamlanamadı. Lütfen tekrar deneyin.' });
});

app.listen(PORT, () => {
  console.log(`Render köprü backend ${PORT} portunda hazır.`);
});
