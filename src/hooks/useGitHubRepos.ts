import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchGitHubRepos, type GitHubRepo } from '../services/githubApi';

export type RepoSortOption = 'updated' | 'stars' | 'name';

export function useGitHubRepos(username: string = 'k13592759-max') {
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRateLimited, setIsRateLimited] = useState<boolean>(false);
  const [rateLimitReset, setRateLimitReset] = useState<Date | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);
  const [isFromCache, setIsFromCache] = useState<boolean>(false);

  // Filters & Sorting state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');
  const [includeForks, setIncludeForks] = useState<boolean>(false);
  const [includeArchived, setIncludeArchived] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<RepoSortOption>('updated');

  const loadRepos = useCallback(async (force = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await fetchGitHubRepos(username, force);
      setAllRepos(result.repos);
      setIsFromCache(result.fromCache);
      setIsRateLimited(result.rateLimited);
      setRateLimitReset(result.resetTime);
      setLastFetched(new Date());

      if (result.rateLimited) {
        setError('GitHub API rate limit exceeded. Displaying cached repository data.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to retrieve GitHub repositories.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    loadRepos(false);
  }, [loadRepos]);

  // Extract all unique languages available across repositories
  const availableLanguages = useMemo(() => {
    const set = new Set<string>();
    allRepos.forEach((repo) => {
      if (repo.language) set.add(repo.language);
    });
    return ['All', ...Array.from(set)];
  }, [allRepos]);

  // Filtered and sorted repositories
  const filteredRepos = useMemo(() => {
    return allRepos
      .filter((repo) => {
        // Exclude forked repositories by default
        if (!includeForks && repo.fork) return false;

        // Exclude archived repositories by default
        if (!includeArchived && repo.archived) return false;

        // Filter by language
        if (selectedLanguage !== 'All' && repo.language !== selectedLanguage) {
          return false;
        }

        // Filter by search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = repo.name.toLowerCase().includes(q);
          const matchDesc = (repo.description || '').toLowerCase().includes(q);
          const matchTopics = repo.topics.some((t) => t.toLowerCase().includes(q));
          const matchLang = (repo.language || '').toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchTopics && !matchLang) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stargazers_count - a.stargazers_count;
        }
        if (sortBy === 'name') {
          return a.name.localeCompare(b.name);
        }
        // Default: Sort by last updated
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [allRepos, includeForks, includeArchived, selectedLanguage, searchQuery, sortBy]);

  return {
    allRepos,
    filteredRepos,
    isLoading,
    error,
    isRateLimited,
    rateLimitReset,
    lastFetched,
    isFromCache,
    searchQuery,
    setSearchQuery,
    selectedLanguage,
    setSelectedLanguage,
    availableLanguages,
    includeForks,
    setIncludeForks,
    includeArchived,
    setIncludeArchived,
    sortBy,
    setSortBy,
    refresh: () => loadRepos(true)
  };
}
