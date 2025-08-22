'use server';

import { fetchSubredditPosts, formatPostData, validateSubreddit } from '../../lib/reddit-api';

export interface FetchPostsParams {
  subreddit: string;
  sort?: 'hot' | 'top' | 'new';
  limit?: number;
  after?: string;
  before?: string;
}

export interface FetchPostsResult {
  posts: ReturnType<typeof formatPostData>[];
  after: string | null;
  before: string | null;
  error?: string;
}

/**
 * Server action to fetch posts from Reddit
 */
export async function fetchPosts({
  subreddit,
  sort = 'hot',
  limit = 12,
  after,
  before,
}: FetchPostsParams): Promise<FetchPostsResult> {
  try {
    // Validate subreddit name
    if (!validateSubreddit(subreddit)) {
      return {
        posts: [],
        after: null,
        before: null,
        error: 'Invalid subreddit name',
      };
    }

    // Fetch posts from Reddit API
    const result = await fetchSubredditPosts(subreddit, sort, limit, after, before);

    // Format posts for display
    const formattedPosts = result.posts.map(formatPostData);

    return {
      posts: formattedPosts,
      after: result.after,
      before: result.before,
    };
  } catch (error) {
    console.error('Error in fetchPosts action:', error);
    
    return {
      posts: [],
      after: null,
      before: null,
      error: error instanceof Error ? error.message : 'Failed to fetch posts',
    };
  }
}

/**
 * Get default posts for the homepage
 */
export async function getDefaultPosts(): Promise<FetchPostsResult> {
  return fetchPosts({
    subreddit: 'data',
    sort: 'hot',
    limit: 12,
  });
} 