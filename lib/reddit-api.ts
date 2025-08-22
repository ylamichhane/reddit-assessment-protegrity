import axios from 'axios';

// Create axios instance with default configuration
const redditApi = axios.create({
  baseURL: 'https://www.reddit.com',
  timeout: 15000,
  headers: {
    'User-Agent': 'web:Protegrity-Reddit-Feed:v1.0.0 (by /u/ylamichhane)',
    'Accept': 'application/json',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
  },
});

// Reddit API utility functions
export interface RedditPost {
  id: string;
  title: string;
  selftext: string;
  author: string;
  num_comments: number;
  permalink: string;
  url: string;
  created_utc: number;
  score: number;
  subreddit: string;
  is_self: boolean;
}

export interface RedditResponse {
  data: {
    children: Array<{
      data: RedditPost;
    }>;
    after: string | null;
    before: string | null;
  };
}

export interface RedditApiError {
  error: number;
  message: string;
}

// Rate limiting utility
class RateLimiter {
  private requests: number[] = [];
  private readonly maxRequests = 50; // More reasonable limit for Reddit's API (they allow 60/minute)
  private readonly windowMs = 60000; // 1 minute window

  async checkRateLimit(): Promise<void> {
    const now = Date.now();
    // Remove requests older than the window
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    

    
    if (this.requests.length >= this.maxRequests) {
      const oldestRequest = this.requests[0];
      const waitTime = this.windowMs - (now - oldestRequest);
      throw new Error(`Rate limit exceeded. Please wait ${Math.ceil(waitTime / 1000)} seconds.`);
    }
    
    // Add the current request timestamp
    this.requests.push(now);
  }
}

// Create a fresh rate limiter instance to reset state
const rateLimiter = new RateLimiter();

// Reddit API configuration
// Using axios instance with default configuration above

/**
 * Fetch posts from a subreddit with optimized query parameters
 */
export async function fetchSubredditPosts(
  subreddit: string,
  sort: 'hot' | 'top' | 'new' = 'hot',
  limit: number = 12,
  after?: string,
  before?: string,
  fallbackSubreddit: string = 'data'
): Promise<{ posts: RedditPost[]; after: string | null; before: string | null }> {
  try {
    // Check rate limit before making request
    await rateLimiter.checkRateLimit();

    // Build optimized query parameters
    const params = new URLSearchParams({
      limit: limit.toString(),
      raw_json: '1',
      // Optimize for hot posts with better engagement metrics
      ...(sort === 'hot' && { g: 'GLOBAL' }), // Global hot posts
      ...(sort === 'top' && { t: 'week' }), // Top posts from this week
    });

    if (after) {
      params.append('after', after);
    }
    if (before) {
      params.append('before', before);
    }

    const url = `/r/${subreddit}/${sort}.json`;

    const response = await redditApi.get(url, {
      params: params,
    });

    const data: RedditResponse = response.data;

    // Transform and validate the response
    const posts = data.data.children
      .map(child => child.data)
      .filter(post => {
        // Keep most posts; allow link posts too
        return (
          post.title.length > 5 &&
          post.num_comments >= 0
        );
      })
      .slice(0, limit); // Ensure we don't exceed the limit

    return {
      posts,
      after: data.data.after,
      before: data.data.before,
    };
  } catch (error) {
    console.error('Error fetching Reddit posts:', error);
    
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const statusText = error.response?.statusText;
      
      // If the original subreddit failed and we haven't tried the fallback yet
      if (subreddit !== fallbackSubreddit && (status === 403 || status === 404)) {
        console.log(`Trying fallback subreddit: ${fallbackSubreddit}`);
        try {
          // Try the fallback subreddit
          return await fetchSubredditPosts(fallbackSubreddit, sort, limit, after, before, fallbackSubreddit);
        } catch (fallbackError) {
          console.error('Fallback subreddit also failed:', fallbackError);
        }
      }
      
      // Handle specific HTTP status codes
      if (status === 403) {
        throw new Error('Access denied by Reddit. This subreddit may be private or restricted.');
      }
      if (status === 404) {
        throw new Error('Subreddit not found. Please check the subreddit name.');
      }
      if (status === 429) {
        throw new Error('Rate limited by Reddit. Please wait a moment before trying again.');
      }
      if (status === 503) {
        throw new Error('Reddit service temporarily unavailable. Please try again later.');
      }
      
      throw new Error(`Reddit API error: ${status} ${statusText}`);
    }
    
    // Handle other types of errors
    if (error instanceof Error) {
      if (error.message.includes('timeout')) {
        throw new Error('Request timed out. Please try again.');
      }
      if (error.message.includes('Rate limit')) {
        throw new Error('Too many requests. Please wait before trying again.');
      }
    }
    
    throw new Error('Failed to fetch posts from Reddit. Please try again later.');
  }
}

/**
 * Get the full Reddit URL for a post
 */
export function getRedditPostUrl(permalink: string): string {
  return `https://reddit.com${permalink}`;
}

/**
 * Format post data for display
 */
export function formatPostData(post: RedditPost) {
  return {
    id: post.id,
    title: post.title,
    content: post.selftext,
    author: `u/${post.author}`,
    comments: post.num_comments,
    url: getRedditPostUrl(post.permalink),
    score: post.score,
    subreddit: post.subreddit,
    created: new Date(post.created_utc * 1000),
  };
}

/**
 * Validate subreddit name
 */
export function validateSubreddit(subreddit: string): boolean {
  // Reddit subreddit naming rules
  const subredditRegex = /^[a-zA-Z0-9_]{3,21}$/;
  return subredditRegex.test(subreddit);
} 