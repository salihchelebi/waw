import express from 'express';
import { getGithubSummary } from '../services/githubService.js';

const router = express.Router();

const asyncRoute = (handler) => async (req, res, next) => {
  try {
    await handler(req, res, next);
  } catch (error) {
    next(error);
  }
};

router.get('/github/summary', asyncRoute(async (_req, res) => {
  const data = await getGithubSummary();
  res.json(data);
}));

export default router;
