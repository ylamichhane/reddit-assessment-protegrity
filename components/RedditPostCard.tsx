import { formatPostData } from '@/lib/reddit-api';

interface RedditPostCardProps {
  post: ReturnType<typeof formatPostData>;
}

export default function RedditPostCard({ post }: RedditPostCardProps) {
  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      {/* Card Content */}
      <div className="p-6">
        {/* Post Title */}
        <h2 className="text-lg font-semibold text-secondary mb-3 line-clamp-2 hover:text-primary transition-colors duration-200">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
          >
            {post.title}
          </a>
        </h2>

        {/* Post Content */}
        <p className="text-gray-700 text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.content}
        </p>

        {/* Post Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">{post.author}</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            {post.comments}
          </span>
        </div>

        {/* Read More Link */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 rounded"
          >
            Read full post
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
} 