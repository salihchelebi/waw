import express from 'express';

const router = express.Router();

router.get('/health', (_req, res) => {
  res.json({
    ok: true,
    message: 'Köprü servisi çalışıyor.',
    timestamp: new Date().toISOString()
  });
});

export default router;
