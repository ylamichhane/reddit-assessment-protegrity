'use client';

import { useState } from 'react';
import { formatPostData } from '../lib/reddit-api';
import { useSummary } from './ClientLayout';

interface RedditPostCardProps {
  post: ReturnType<typeof formatPostData>;
}

export default function RedditPostCard({ post }: RedditPostCardProps) {
  const [isSummarizing, setIsSummarizing] = useState(false);
  const { handleSummarize: onSummarize } = useSummary();

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      await onSummarize(post.id, post.title, post.content);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <article className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md hover:border-[#fa5a25] transition-all duration-200 focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2">
      <div className="p-6">
        <h2 className="text-lg font-semibold text-secondary mb-3 line-clamp-2 hover:text-primary transition-colors duration-200">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {post.title}
          </a>
        </h2>
        <p className="text-text text-sm mb-4 line-clamp-3">
          {post.content || 'No content preview available.'}
        </p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="font-medium">By {post.author}</span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1 text-primary"
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
            {post.comments} comments
          </span>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <button
            onClick={handleSummarize}
            disabled={isSummarizing}
            className="inline-flex items-center text-gray-600 hover:text-[#fa5a25] hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            aria-label={`Summarize post: ${post.title}`}
          >
            {isSummarizing ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Summarizing...
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Summarize
              </>
            )}
          </button>
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-primary hover:underline text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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