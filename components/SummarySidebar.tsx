'use client';



interface SummarySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  summary: string | null;
  postTitle: string | null;
  isLoading: boolean;
}

export default function SummarySidebar({
  isOpen,
  onClose,
  summary,
  postTitle,
  isLoading,
}: SummarySidebarProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="summary-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 id="summary-title" className="text-lg font-semibold text-secondary">
            Post Summary
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md"
            aria-label="Close summary sidebar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto h-full">
          {postTitle && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Original Post</h3>
              <p className="text-secondary font-medium line-clamp-3">{postTitle}</p>
            </div>
          )}

          <div className="border-t border-gray-200 pt-4">
            <h3 className="text-sm font-medium text-gray-500 mb-3">AI Summary</h3>
            
            {isLoading ? (
              <div className="space-y-3">
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary"
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
                  Generating summary...
                </div>
              </div>
            ) : summary ? (
              <div className="prose prose-sm max-w-none">
                <p className="text-text leading-relaxed whitespace-pre-wrap">{summary}</p>
              </div>
            ) : (
              <p className="text-gray-500 italic">No summary available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
} 