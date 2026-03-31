import express from 'express';
import { getGithubSummary } from '../services/githubService.js';

const router = express.Router();

router.get('/github/summary', async (_req, res) => {
  const data = await getGithubSummary();
  res.json(data);
});

export default router;
