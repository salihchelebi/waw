import { simplifyError } from '../utils/mask.js';

function getRepoUrl(owner, repo) {
  return owner && repo ? `https://github.com/${owner}/${repo}` : 'https://github.com/';
}

export async function getGithubSummary() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!owner || !repo) {
    return {
      branch,
      lastCommit: 'GitHub bilgisi için owner/repo ayarlanmadı.',
      repoUrl: getRepoUrl(owner, repo),
      committedAt: null
    };
  }

  try {
    const headers = {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'render-kopru-paneli'
    };

    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`, { headers });

    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data = await response.json();

    return {
      branch,
      lastCommit: data.commit?.message || 'Commit mesajı yok',
      repoUrl: getRepoUrl(owner, repo),
      committedAt: data.commit?.author?.date || data.commit?.committer?.date || null
    };
  } catch (error) {
    throw new Error(simplifyError(error, 'GitHub özeti alınamadı.'));
  }
}
