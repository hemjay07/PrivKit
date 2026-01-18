'use client';

import { useState, useEffect } from 'react';

const PACKAGE_NAME = 'create-solana-privacy-app';
const CACHE_KEY = 'npm-downloads-cache';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

interface CacheData {
  downloads: number;
  timestamp: number;
}

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

export function NpmDownloads() {
  const [downloads, setDownloads] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchDownloads = async () => {
      // Check cache first
      try {
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
          const data: CacheData = JSON.parse(cached);
          if (Date.now() - data.timestamp < CACHE_DURATION) {
            setDownloads(data.downloads);
            setLoading(false);
            return;
          }
        }
      } catch {
        // Cache read failed, continue to fetch
      }

      // Fetch from npm API (weekly downloads)
      try {
        const response = await fetch(
          `https://api.npmjs.org/downloads/point/last-week/${PACKAGE_NAME}`
        );

        if (!response.ok) {
          // Package might not exist yet or no downloads
          setDownloads(0);
          setLoading(false);
          return;
        }

        const data = await response.json();
        const downloadCount = data.downloads || 0;

        // Cache the result
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({
            downloads: downloadCount,
            timestamp: Date.now(),
          }));
        } catch {
          // Cache write failed, continue anyway
        }

        setDownloads(downloadCount);
        setLoading(false);
      } catch {
        setError(true);
        setLoading(false);
      }
    };

    fetchDownloads();
  }, []);

  // Don't render anything if loading or error
  if (loading || error || downloads === null) {
    return null;
  }

  return (
    <a
      href={`https://www.npmjs.com/package/${PACKAGE_NAME}`}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-surface border border-border rounded-full hover:border-zinc-600 transition-all duration-150 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label={`${downloads} weekly downloads on npm`}
    >
      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M0 7.334v8h6.666v1.332H12v-1.332h12v-8H0zm6.666 6.664H5.334v-4H3.999v4H1.335V8.667h5.331v5.331zm4 0v1.336H8.001V8.667h5.334v5.332h-2.669v-.001zm12.001 0h-1.33v-4h-1.336v4h-1.335v-4h-1.33v4h-2.671V8.667h8.002v5.331zM10.665 10H12v2.667h-1.335V10z" />
      </svg>
      <span className="text-zinc-300">{formatNumber(downloads)}</span>
      <span className="text-zinc-500">/week</span>
    </a>
  );
}
