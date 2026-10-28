export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  fork: boolean;
  archived: boolean;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  homepage: string | null;
  size: number;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  languages?: Record<string, number>;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  default_branch: string;
}

export interface GitHubApiState {
  repos: GitHubRepo[];
  isLoading: boolean;
  error: string | null;
  isRateLimited: boolean;
  lastFetched: Date | null;
  rateLimitReset: Date | null;
}

const CACHE_KEY = 'github_repos_k13592759_max';
const CACHE_TIME_KEY = 'github_repos_time_k13592759_max';
const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes cache

// Initial verified fallback for k13592759-max in case of offline or instant rate limit
export const SEED_REPOSITORIES: GitHubRepo[] = [
  {
    id: 1388909207,
    name: "ClauseWise",
    full_name: "k13592759-max/ClauseWise",
    html_url: "https://github.com/k13592759-max/ClauseWise",
    description: "Understand before you agree — local, session-only legal contract analysis and information workspace built with Python and modern web interface.",
    fork: false,
    archived: false,
    created_at: "2026-09-26T08:49:42Z",
    updated_at: "2026-10-28T14:37:22Z",
    pushed_at: "2026-10-28T14:37:17Z",
    homepage: null,
    size: 848,
    stargazers_count: 0,
    watchers_count: 0,
    language: "Python",
    languages: { Python: 39662, HTML: 3387 },
    forks_count: 0,
    open_issues_count: 0,
    topics: ["legal-tech", "python", "document-analysis"],
    default_branch: "main"
  },
  {
    id: 1388909208,
    name: "capstrong",
    full_name: "k13592759-max/capstrong",
    html_url: "https://github.com/k13592759-max/capstrong",
    description: "Capstrong - Aarogya Twin AI Healthcare Platform. Comprehensive health management solutions powered by intelligent agents and interactive web UI.",
    fork: false,
    archived: false,
    created_at: "2026-08-30T10:00:00Z",
    updated_at: "2026-09-01T04:10:39Z",
    pushed_at: "2026-09-01T04:10:30Z",
    homepage: "https://k13592759-max.github.io/capstrong/",
    size: 2450,
    stargazers_count: 0,
    watchers_count: 0,
    language: "JavaScript",
    languages: { JavaScript: 215511, CSS: 12212, HTML: 7286 },
    forks_count: 0,
    open_issues_count: 0,
    topics: ["healthcare", "ai-agents", "web-platform"],
    default_branch: "main"
  },
  {
    id: 1388909209,
    name: "rebrob",
    full_name: "k13592759-max/rebrob",
    html_url: "https://github.com/k13592759-max/rebrob",
    description: "E-commerce and modern product catalog application featuring responsive client architecture and product showcase.",
    fork: false,
    archived: false,
    created_at: "2026-08-30T09:00:00Z",
    updated_at: "2026-08-30T10:56:39Z",
    pushed_at: "2026-08-30T10:56:00Z",
    homepage: null,
    size: 420,
    stargazers_count: 0,
    watchers_count: 0,
    language: "HTML",
    languages: { HTML: 6382, Python: 5422, JavaScript: 3900 },
    forks_count: 0,
    open_issues_count: 0,
    topics: ["e-commerce", "web-app"],
    default_branch: "main"
  },
  {
    id: 1388909210,
    name: "3d-main",
    full_name: "k13592759-max/3d-main",
    html_url: "https://github.com/k13592759-max/3d-main",
    description: "Interactive 3D web experimentation repository exploring viewport rendering, spatial canvas, and visual computing.",
    fork: false,
    archived: false,
    created_at: "2026-08-26T07:30:00Z",
    updated_at: "2026-08-26T07:37:31Z",
    pushed_at: "2026-08-26T07:37:00Z",
    homepage: null,
    size: 310,
    stargazers_count: 0,
    watchers_count: 0,
    language: "HTML",
    languages: { HTML: 14340 },
    forks_count: 0,
    open_issues_count: 0,
    topics: ["3d", "webgl", "experiment"],
    default_branch: "main"
  },
  {
    id: 1388909211,
    name: "potfolio",
    full_name: "k13592759-max/potfolio",
    html_url: "https://github.com/k13592759-max/potfolio",
    description: "Personal developer portfolio website made with semantic HTML and modern CSS styling.",
    fork: false,
    archived: false,
    created_at: "2026-08-26T07:13:38Z",
    updated_at: "2026-08-26T07:18:42Z",
    pushed_at: "2026-08-26T07:18:18Z",
    homepage: "https://k13592759-max.github.io/potfolio/",
    size: 7653,
    stargazers_count: 0,
    watchers_count: 0,
    language: "HTML",
    languages: { HTML: 70406 },
    forks_count: 0,
    open_issues_count: 0,
    topics: ["portfolio", "css", "html"],
    default_branch: "main"
  }
];

export async function fetchGitHubRepos(
  username: string = 'k13592759-max',
  forceRefresh: boolean = false
): Promise<{ repos: GitHubRepo[]; fromCache: boolean; rateLimited: boolean; resetTime: Date | null }> {
  // Check local/session cache if not force refresh
  if (!forceRefresh) {
    try {
      const cachedTimeStr = sessionStorage.getItem(CACHE_TIME_KEY) || localStorage.getItem(CACHE_TIME_KEY);
      const cachedDataStr = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);

      if (cachedTimeStr && cachedDataStr) {
        const cachedTime = parseInt(cachedTimeStr, 10);
        if (Date.now() - cachedTime < CACHE_TTL_MS) {
          const parsed = JSON.parse(cachedDataStr) as GitHubRepo[];
          if (Array.isArray(parsed) && parsed.length > 0) {
            return {
              repos: parsed,
              fromCache: true,
              rateLimited: false,
              resetTime: null
            };
          }
        }
      }
    } catch {
      // Ignore cache parse error
    }
  }

  const endpoint = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`;

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    });

    // Handle Rate Limiting (403 with x-ratelimit-remaining == 0 or 429)
    if (response.status === 403 || response.status === 429) {
      const resetHeader = response.headers.get('x-ratelimit-reset');
      const resetTime = resetHeader ? new Date(parseInt(resetHeader, 10) * 1000) : null;
      
      // Fallback to cached or seed
      const fallbackRepos = getCachedOrSeedRepos();
      return {
        repos: fallbackRepos,
        fromCache: true,
        rateLimited: true,
        resetTime
      };
    }

    if (!response.ok) {
      throw new Error(`GitHub API request failed with status: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    if (!Array.isArray(rawData)) {
      throw new Error('Invalid response format received from GitHub API.');
    }

    // Clean and validate repositories
    const repos: GitHubRepo[] = rawData.map((item: Record<string, unknown>) => ({
      id: Number(item.id),
      name: String(item.name || ''),
      full_name: String(item.full_name || ''),
      html_url: String(item.html_url || ''),
      description: item.description ? String(item.description) : null,
      fork: Boolean(item.fork),
      archived: Boolean(item.archived),
      created_at: String(item.created_at || ''),
      updated_at: String(item.updated_at || ''),
      pushed_at: String(item.pushed_at || ''),
      homepage: item.homepage && String(item.homepage).trim() ? String(item.homepage).trim() : null,
      size: Number(item.size || 0),
      stargazers_count: Number(item.stargazers_count || 0),
      watchers_count: Number(item.watchers_count || 0),
      language: item.language ? String(item.language) : null,
      forks_count: Number(item.forks_count || 0),
      open_issues_count: Number(item.open_issues_count || 0),
      topics: Array.isArray(item.topics) ? item.topics.map(t => String(t)) : [],
      default_branch: String(item.default_branch || 'main')
    }));

    // Cache the successful response
    try {
      const now = Date.now().toString();
      const json = JSON.stringify(repos);
      sessionStorage.setItem(CACHE_KEY, json);
      sessionStorage.setItem(CACHE_TIME_KEY, now);
      localStorage.setItem(CACHE_KEY, json);
      localStorage.setItem(CACHE_TIME_KEY, now);
    } catch {
      // Storage quota or disabled
    }

    return {
      repos,
      fromCache: false,
      rateLimited: false,
      resetTime: null
    };
  } catch (error) {
    // If network fails (e.g. offline), fall back to cached or verified seed
    const fallbackRepos = getCachedOrSeedRepos();
    return {
      repos: fallbackRepos,
      fromCache: true,
      rateLimited: false,
      resetTime: null
    };
  }
}

function getCachedOrSeedRepos(): GitHubRepo[] {
  try {
    const cached = sessionStorage.getItem(CACHE_KEY) || localStorage.getItem(CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // ignore
  }
  return SEED_REPOSITORIES;
}

// Fetch detailed languages breakdown for a single repository
export async function fetchRepoLanguages(
  username: string,
  repoName: string
): Promise<Record<string, number>> {
  try {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // silent fallback
  }
  return {};
}
