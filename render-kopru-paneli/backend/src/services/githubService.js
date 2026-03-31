import { simplifyError } from '../utils/mask.js';

export async function getGithubSummary() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;

  if (!owner || !repo) {
    return {
      branch: 'main',
      lastCommit: 'GitHub bilgisi için owner/repo ayarlanmadı.',
      repoUrl: 'https://github.com/',
      committedAt: null
    };
  }

  try {
    const headers = {
      Accept: 'application/vnd.github+json'
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const branch = process.env.GITHUB_BRANCH || 'main';
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data = await response.json();

    return {
      branch,
      lastCommit: data.commit?.message || 'Commit mesajı yok',
      repoUrl: `https://github.com/${owner}/${repo}`,
      committedAt: data.commit?.author?.date || null
    };
  } catch (error) {
    throw new Error(simplifyError(error, 'GitHub özeti alınamadı.'));
  }
}
