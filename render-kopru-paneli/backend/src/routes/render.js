import express from 'express';
import {
  getEnvNames,
  getLogsSummary,
  getServiceSummary,
  triggerRedeploy,
  triggerRestart
} from '../services/renderService.js';

const router = express.Router();

// [TALİMAT NO: 6 | TALİMAT ADI: BACKEND ROUTE HATA AKIŞINI GÜVENLİLEŞTİR] Bu açıklama, async route hatalarının merkezi akışa taşındığını göstermek için eklendi.
const asyncRoute = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

router.get('/render/service', asyncRoute(async (_req, res) => {
  const data = await getServiceSummary();
  res.json(data);
}));

router.get('/render/logs', asyncRoute(async (_req, res) => {
  const data = await getLogsSummary();
  res.json(data);
}));

router.post('/render/redeploy', asyncRoute(async (_req, res) => {
  const data = await triggerRedeploy();
  res.json(data);
}));

router.post('/render/restart', asyncRoute(async (_req, res) => {
  const data = await triggerRestart();
  res.json(data);
}));

router.get('/render/env-names', asyncRoute(async (_req, res) => {
  const envNames = await getEnvNames();
  res.json({ envNames });
}));

export default router;
