import { simplifyError } from '../utils/mask.js';

// [TALİMAT NO: 9 | TALİMAT ADI: GITHUB ÖZETİNİ KESİNTİSİZ HALE GETİR] Bu açıklama, GitHub özetinin fallback ile güvenli çalışması için eklendi.
export async function getGithubSummary() {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || 'main';
  const repoUrl = owner && repo ? `https://github.com/${owner}/${repo}` : 'https://github.com/';

  if (!owner || !repo) {
    return {
      mode: 'fallback',
      branch,
      lastCommit: 'GitHub owner/repo bilgisi eksik.',
      repoUrl,
      committedAt: null
    };
  }

  try {
    const headers = { Accept: 'application/vnd.github+json' };
    if (process.env.Nekot_Buhtig) {
      headers.Authorization = `Bearer ${process.env.Nekot_Buhtig}`;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits/${branch}`, { headers });
    if (!response.ok) {
      throw new Error(`GitHub API hatası: ${response.status}`);
    }

    const data = await response.json();
    return {
      mode: 'live',
      branch,
      lastCommit: data.commit?.message || 'Commit mesajı yok',
      repoUrl,
      committedAt: data.commit?.author?.date || data.commit?.committer?.date || null
    };
  } catch (error) {
    throw new Error(simplifyError(error, 'GitHub özeti alınamadı.'));
  }
}
