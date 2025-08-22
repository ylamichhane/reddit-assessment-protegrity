'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useState } from 'react';

interface ControlsProps {
  initialSubreddit: string;
  initialSort: 'hot' | 'top' | 'new';
}

export default function Controls({ initialSubreddit, initialSort }: ControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [subreddit, setSubreddit] = useState<string>(initialSubreddit);
  const [sort, setSort] = useState<'hot' | 'top' | 'new'>(initialSort);

  const buildUrl = useCallback(
    (next: { subreddit?: string; sort?: 'hot' | 'top' | 'new'; page?: number; after?: string | null; before?: string | null }) => {
      const params = new URLSearchParams(searchParams);
      if (next.subreddit !== undefined) params.set('subreddit', next.subreddit);
      if (next.sort !== undefined) params.set('sort', next.sort);
      if (next.page !== undefined) params.set('page', String(next.page));
      // reset cursors whenever filters change
      params.delete('after');
      params.delete('before');
      return `/?${params.toString()}`;
    },
    [searchParams]
  );

  const applyChanges = useCallback(() => {
    router.push(
      buildUrl({ subreddit, sort, page: 1, after: null, before: null })
    );
  }, [router, buildUrl, subreddit, sort]);

  const onSubredditKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      applyChanges();
    }
  };

  const onSubredditBlur = () => {
    if (subreddit.trim().length > 0) {
      applyChanges();
    }
  };

  const onSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'hot' | 'top' | 'new';
    setSort(value);
    router.push(buildUrl({ sort: value, page: 1, after: null, before: null }));
  };

  return (
    <div className="mt-4 flex flex-wrap gap-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="subreddit" className="text-sm font-medium text-gray-700">
          Subreddit:
        </label>
        <input
          type="text"
          id="subreddit"
          value={subreddit}
          onChange={(e) => setSubreddit(e.target.value)}
          onKeyDown={onSubredditKeyDown}
          onBlur={onSubredditBlur}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          placeholder="Enter subreddit name"
        />
      </div>

      <div className="flex items-center space-x-2">
        <label htmlFor="sort" className="text-sm font-medium text-gray-700">
          Sort:
        </label>
        <select
          id="sort"
          value={sort}
          onChange={onSortChange}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="hot">Hot</option>
          <option value="top">Top</option>
          <option value="new">New</option>
        </select>
      </div>
    </div>
  );
}