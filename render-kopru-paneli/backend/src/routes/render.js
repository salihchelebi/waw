import express from 'express';
import {
  getEnvNames,
  getLogsSummary,
  getServiceSummary,
  triggerRedeploy,
  triggerRestart
} from '../services/renderService.js';

const router = express.Router();

router.get('/render/service', async (_req, res) => {
  const data = await getServiceSummary();
  res.json(data);
});

router.get('/render/logs', async (_req, res) => {
  const data = await getLogsSummary();
  res.json(data);
});

router.post('/render/redeploy', async (_req, res) => {
  const data = await triggerRedeploy();
  res.json(data);
});

router.post('/render/restart', async (_req, res) => {
  const data = await triggerRestart();
  res.json(data);
});

router.get('/render/env-names', async (_req, res) => {
  const envNames = await getEnvNames();
  res.json({ envNames });
});

export default router;
