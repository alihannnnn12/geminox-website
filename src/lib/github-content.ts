const GITHUB_API_BASE = "https://api.github.com";

function getGithubConfig() {
  const token = process.env.STUDIO_GITHUB_TOKEN?.trim();
  const owner = process.env.STUDIO_GITHUB_OWNER?.trim();
  const repo = process.env.STUDIO_GITHUB_REPO?.trim();
  const branch = process.env.STUDIO_GITHUB_BRANCH?.trim() || "main";

  return { token, owner, repo, branch };
}

export function isGithubStudioConfigured() {
  const { token, owner, repo } = getGithubConfig();

  return Boolean(token && owner && repo);
}

function getHeaders() {
  const { token } = getGithubConfig();

  if (!token) {
    throw new Error("Studio GitHub token is missing.");
  }

  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
    "User-Agent": "geminox-studio"
  };
}

function getContentsUrl(path: string) {
  const { owner, repo } = getGithubConfig();

  if (!owner || !repo) {
    throw new Error("Studio GitHub owner/repo is missing.");
  }

  return `${GITHUB_API_BASE}/repos/${owner}/${repo}/contents/${path}`;
}

type GithubContentResponse = {
  sha: string;
};

async function getExistingSha(path: string) {
  const { branch } = getGithubConfig();
  const response = await fetch(`${getContentsUrl(path)}?ref=${branch}`, {
    headers: getHeaders(),
    method: "GET",
    cache: "no-store"
  });

  if (response.status === 404) {
    return undefined;
  }

  if (!response.ok) {
    throw new Error(`GitHub read failed for ${path}: ${response.status}`);
  }

  const payload = (await response.json()) as GithubContentResponse;

  return payload.sha;
}

type UpdateRepoFileOptions = {
  alreadyEncoded?: boolean;
  path: string;
  content: string;
  message: string;
};

export async function updateRepoFile({ path, content, message, alreadyEncoded = false }: UpdateRepoFileOptions) {
  const { branch } = getGithubConfig();
  const sha = await getExistingSha(path);

  const response = await fetch(getContentsUrl(path), {
    headers: getHeaders(),
    method: "PUT",
    body: JSON.stringify({
      branch,
      content: alreadyEncoded ? content : Buffer.from(content).toString("base64"),
      message,
      sha
    })
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(`GitHub update failed for ${path}: ${response.status} ${errorText}`);
  }

  return response.json();
}

export function createUploadPath(fileName: string) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const sanitized = fileName
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]+/g, "-")
    .replace(/-+/g, "-");

  return `public/assets/uploads/${timestamp}-${sanitized}`;
}
