'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  hasNextPage,
  hasPrevPage,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number, direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    // Clear existing cursors so we don't mix
    params.delete('after');
    params.delete('before');
    // Carry forward the current cursor from URL into the opposite param
    const currentAfter = searchParams.get('after');
    const currentBefore = searchParams.get('before');
    if (direction === 'next' && currentAfter) {
      params.set('after', currentAfter);
    }
    if (direction === 'prev' && currentBefore) {
      params.set('before', currentBefore);
    }
    router.push(`/?${params.toString()}`);
    onPageChange?.(page);
  };

  const handlePrevious = () => {
    if (hasPrevPage) {
      handlePageChange(currentPage - 1, 'prev');
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      handlePageChange(currentPage + 1, 'next');
    }
  };

  return (
    <div className="flex items-center justify-center space-x-4 mt-8">
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={!hasPrevPage}
        className={`
          inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            hasPrevPage
              ? 'bg-white text-secondary border border-gray-300 hover:bg-gray-50 hover:border-primary focus:ring-primary'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
          }
        `}
        aria-label="Go to previous page"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Previous
      </button>

      {/* Page Indicator */}
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Page</span>
        <span className="px-3 py-1 text-sm font-medium text-secondary bg-white border border-gray-300 rounded-md">
          {currentPage}
        </span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        className={`
          inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg
          transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2
          disabled:cursor-not-allowed disabled:opacity-50
          ${
            hasNextPage
              ? 'bg-white text-secondary border border-gray-300 hover:bg-gray-50 hover:border-primary focus:ring-primary'
              : 'bg-gray-100 text-gray-400 border border-gray-200'
          }
        `}
        aria-label="Go to next page"
      >
        Next
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
} 