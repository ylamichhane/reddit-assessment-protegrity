import { Suspense } from 'react';
import { getDefaultPosts, fetchPosts } from './actions/reddit-actions';
import RedditPostCard from '../components/RedditPostCard';
import Pagination from '../components/Pagination';
import { formatPostData } from '../lib/reddit-api';
import Controls from '../components/Controls';

interface PageProps {
  searchParams: Promise<{
    page?: string;
    subreddit?: string;
    sort?: string;
    after?: string;
    before?: string;
  }>;
}

// Loading component for Suspense
function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border border-gray-200 shadow-sm animate-pulse"
        >
          <div className="p-6">
            <div className="h-6 bg-gray-200 rounded mb-3"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="flex justify-between">
              <div className="h-3 bg-gray-200 rounded w-20"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// Error component
function ErrorMessage({ message }: { message: string }) {
  return (
    <div className="text-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
        <svg
          className="w-12 h-12 text-red-400 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
        <h3 className="text-lg font-medium text-red-800 mb-2">Error Loading Posts</h3>
        <p className="text-red-600">{message}</p>
      </div>
    </div>
  );
}

// Posts component
async function Posts({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const subreddit = params.subreddit || 'programming';
  const sort = (params.sort as 'hot' | 'top' | 'new') || 'hot';
  const after = params['after'] as string | undefined;
  const before = params['before'] as string | undefined;

  // Fetch posts based on parameters
  const result = await fetchPosts({
    subreddit,
    sort,
    limit: 12,
    after,
    before,
  });

  if (result.error) {
    return <ErrorMessage message={result.error} />;
  }

  const hasNextPage = !!result.after;
  const hasPrevPage = !!result.before || page > 1;

  return (
    <>
      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6">
        {result.posts.map((post) => (
          <RedditPostCard key={post.id} post={post} />
        ))}
      </div>

      {/* Pagination */}
      <Pagination
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        currentPage={page}
      />
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-secondary">
            Protegrity Reddit Feed
          </h1>
          <p className="text-gray-600 mt-2">
            Curated posts from the developer community
          </p>
          <Controls
            initialSubreddit={(params.subreddit || 'programming') as string}
            initialSort={((params.sort as 'hot' | 'top' | 'new') || 'hot') as 'hot' | 'top' | 'new'}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Suspense fallback={<PostsLoading />}>
          <Posts searchParams={searchParams} />
        </Suspense>
      </main>
    </div>
  );
}
