import React from 'react';
import { useGitHubRepos } from '../hooks/useGitHubRepos';

const LANG_COLORS: Record<string, string> = {
  Python: '#3b82f6',
  JavaScript: '#f59e0b',
  TypeScript: '#60a5fa',
  HTML: '#f97316',
  CSS: '#8b5cf6',
};

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
    });
  } catch {
    return '';
  }
}

function isValidUrl(url: string | null): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'https:' || parsed.protocol === 'http:';
  } catch {
    return false;
  }
}

export const Projects: React.FC = () => {
  const {
    filteredRepos,
    isLoading,
    error,
    isRateLimited,
    isFromCache,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    availableLanguages,
    sortBy,
    setSortBy,
    refresh,
  } = useGitHubRepos('k13592759-max');


  return (
    <section id="projects" className="section-padding bg-[#0c1220]">
      <div className="max-w-5xl mx-auto px-5 sm:px-8">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <span className="text-xs font-mono tracking-widest text-blue-400 uppercase">
            03 / Projects
          </span>
          <div className="flex-1 h-px bg-slate-800" />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-100 mb-1">
              GitHub Repositories
            </h2>
            <p className="text-slate-400 text-sm">
              Live data from{' '}
              <a
                href="https://github.com/k13592759-max"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline"
              >
                @k13592759-max
              </a>
              {isFromCache && (
                <span className="ml-2 text-xs text-slate-500">(cached)</span>
              )}
            </p>
          </div>

          <button
            onClick={refresh}
            disabled={isLoading}
            className="shrink-0 px-4 py-2 rounded-lg border border-slate-700 text-slate-400 hover:text-slate-200 hover:border-slate-500 text-sm transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Loading…' : 'Refresh'}
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search repositories…"
            className="flex-1 min-w-[200px] px-4 py-2 rounded-lg bg-[#111827] border border-slate-700 text-slate-200 text-sm placeholder:text-slate-500 focus:outline-none focus:border-blue-500/60 transition-colors"
          />

          {availableLanguages.length > 1 && (
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-3 py-2 rounded-lg bg-[#111827] border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
            >
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          )}

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
            className="px-3 py-2 rounded-lg bg-[#111827] border border-slate-700 text-slate-300 text-sm focus:outline-none focus:border-blue-500/60 transition-colors"
          >
            <option value="updated">Recently updated</option>
            <option value="stars">Stars</option>
            <option value="name">Name (A–Z)</option>
          </select>
        </div>

        {/* Rate limit warning */}
        {isRateLimited && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm">
            GitHub API rate limit reached — showing cached repository data.
          </div>
        )}

        {/* Error state */}
        {error && !isRateLimited && (
          <div className="mb-6 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-300 text-sm">
            {error}
          </div>
        )}

        {/* Loading skeleton */}
        {isLoading && (
          <div className="grid sm:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="glass-card rounded-xl p-5 h-36 animate-pulse"
              />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredRepos.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <p className="text-base mb-2">No repositories match your filters.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedLanguage('All'); }}
              className="text-blue-400 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Repository cards */}
        {!isLoading && filteredRepos.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-4">
            {filteredRepos.map((repo) => {
              const langColor = repo.language ? (LANG_COLORS[repo.language] ?? '#94a3b8') : undefined;
              const hasDemo = isValidUrl(repo.homepage);

              return (
                <div
                  key={repo.id}
                  className="glass-card glass-card-hover rounded-xl p-5 flex flex-col gap-3"
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-100 font-semibold text-base hover:text-blue-400 transition-colors leading-tight"
                    >
                      {repo.name}
                    </a>
                    <div className="flex items-center gap-2 shrink-0 mt-0.5">
                      {repo.stargazers_count > 0 && (
                        <span className="flex items-center gap-1 text-xs text-slate-400">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          {repo.stargazers_count}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-400 leading-relaxed flex-1">
                    {repo.description || (
                      <span className="italic text-slate-600">No description provided.</span>
                    )}
                  </p>

                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {repo.topics.slice(0, 5).map((topic) => (
                        <span key={topic} className="tag-pill">{topic}</span>
                      ))}
                    </div>
                  )}

                  {/* Footer row */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/60 mt-auto">
                    <div className="flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1.5 text-xs text-slate-400">
                          <span
                            className="w-2.5 h-2.5 rounded-full"
                            style={{ backgroundColor: langColor }}
                          />
                          {repo.language}
                        </span>
                      )}
                      <span className="text-xs text-slate-500">
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {hasDemo && (
                        <a
                          href={repo.homepage!}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors"
                        >
                          Demo ↗
                        </a>
                      )}
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        Code ↗
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View all on GitHub */}
        {!isLoading && filteredRepos.length > 0 && (
          <div className="mt-8 text-center">
            <a
              href="https://github.com/k13592759-max"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 hover:border-blue-500/40 text-slate-300 hover:text-blue-300 text-sm font-medium transition-colors"
            >
              View all repositories on GitHub
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};
