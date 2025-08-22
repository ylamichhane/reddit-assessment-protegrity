'use client';

import { useState, createContext, useContext } from 'react';
import SummarySidebar from './SummarySidebar';

interface SummaryContextType {
  handleSummarize: (postId: string, postTitle: string, postContent: string | null) => Promise<void>;
}

const SummaryContext = createContext<SummaryContextType | null>(null);

export function useSummary() {
  const context = useContext(SummaryContext);
  if (!context) {
    throw new Error('useSummary must be used within a ClientLayout');
  }
  return context;
}

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentSummary, setCurrentSummary] = useState<string | null>(null);
  const [currentPostTitle, setCurrentPostTitle] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);

  const handleSummarize = async (postId: string, postTitle: string, postContent: string | null) => {
    setIsLoadingSummary(true);
    setCurrentPostTitle(postTitle);
    setSidebarOpen(true);

    try {
      const response = await fetch('/api/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          postTitle,
          postContent,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate summary');
      }

      const data = await response.json();
      setCurrentSummary(data.summary);
    } catch (error) {
      console.error('Summarization error:', error);
      setCurrentSummary('Failed to generate summary. Please try again.');
    } finally {
      setIsLoadingSummary(false);
    }
  };

  return (
    <SummaryContext.Provider value={{ handleSummarize }}>
      {children}
      
      <SummarySidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        summary={currentSummary}
        postTitle={currentPostTitle}
        isLoading={isLoadingSummary}
      />
    </SummaryContext.Provider>
  );
}