import { Suspense } from 'react';
import { fetchPosts } from './actions/reddit-actions';
import RedditPostCard from '../components/RedditPostCard';
import Pagination from '../components/Pagination';
import Controls from '../components/Controls';
import ClientLayout from '../components/ClientLayout';

interface PageProps {
  searchParams: Promise<{
    after?: string;
    before?: string;
    subreddit?: string;
    sort?: string;
    page?: string;
  }>;
}

// Loading component
function PostsLoading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-400">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
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
      <div className="text-red-600 mb-4">
        <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-secondary mb-2">Error Loading Posts</h3>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}

// Posts component (Server Component)
async function Posts({ searchParams }: PageProps) {
  const params = await searchParams;
  const subreddit = params.subreddit || 'data';
  const sort = (params.sort as 'hot' | 'top' | 'new') || 'hot';
  const after = params.after;
  const before = params.before;

  // Fetch posts from Reddit
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
  const hasPrevPage = !!result.before || (!!after && !result.after && result.posts.length > 0);
  
  // Calculate current page based on URL parameters
  // We'll use a page parameter to track the current page number
  let currentPage = parseInt(params.page || '1');
  
  // If we have an 'after' cursor but no page parameter, we're on page 2
  if (after && !params.page) {
    currentPage = 2;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xxl:grid-cols-6 gap-6">
        {result.posts.map((post) => (
          <RedditPostCard key={post.id} post={post} />
        ))}
      </div>

      {result.posts.length > 0 && (
        <Pagination
          hasNextPage={hasNextPage}
          hasPrevPage={hasPrevPage}
          currentPage={currentPage}
          after={result.after}
          before={result.before}
        />
      )}
    </>
  );
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;
  const initialSubreddit = params.subreddit || 'data';
  const initialSort = (params.sort as 'hot' | 'top' | 'new') || 'hot';

  return (
    <ClientLayout>
      <div className="min-h-screen bg-background">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-6">
            <h1 className="text-3xl font-bold text-secondary">
              Protegrity Reddit Feed
            </h1>
            <p className="text-gray-600 mt-2">
              Curated posts from the developer community
            </p>
            
            <Suspense fallback={<div className="mt-4 h-8 bg-gray-200 rounded animate-pulse"></div>}>
              <Controls
                initialSubreddit={initialSubreddit}
                initialSort={initialSort}
              />
            </Suspense>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8">
          <Suspense fallback={<PostsLoading />}>
            <Posts searchParams={searchParams} />
          </Suspense>
        </main>
      </div>
    </ClientLayout>
  );
}