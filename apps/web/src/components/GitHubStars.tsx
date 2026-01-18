'use client';

import { useState, useEffect } from 'react';

const GITHUB_REPO = 'hemjay07/PrivKit';
const CACHE_KEY = 'github-stars-cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheData {
  stars: number;
  timestamp: number;
}

export function GitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStars = async () => {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const data: CacheData = JSON.parse(cached);
          if (Date.now() - data.timestamp < CACHE_DURATION) {
            setStars(data.stars);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Cache read failed, continue to fetch
      }

      // Fetch from GitHub API
      try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`);
        if (!response.ok) throw new Error('Failed to fetch');

        const data = await response.json();
        const starCount = data.stargazers_count || 0;

        // Cache the result
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            stars: starCount,
            timestamp: Date.now(),
          }));
        } catch {
          // Cache write failed, continue anyway
        }

        setStars(starCount);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchStars();
  }, []);

  // Don't render anything if loading or error
  if (loading || error || stars === null) {
    return null;
  }

  return (
    <a
      href={`https://github.com/${GITHUB_REPO}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-surface border border-border rounded-full hover:border-zinc-600 transition-colors duration-150"
      aria-label={`${stars} stars on GitHub`}
    >
      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
      </svg>
      <span className="text-zinc-300">{stars.toLocaleString()}</span>
      <span className="text-zinc-500">stars</span>
    </a>
  );
}
