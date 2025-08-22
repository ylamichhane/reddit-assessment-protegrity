import { NextRequest, NextResponse } from 'next/server';
import { getSummary, saveSummary, initializeDatabase } from '../../../lib/database';

export async function POST(request: NextRequest) {
  try {
    const { postId, postTitle, postContent } = await request.json();

    if (!postId || !postTitle) {
      return NextResponse.json(
        { error: 'Post ID and title are required' },
        { status: 400 }
      );
    }

    // Initialize database (creates table if it doesn't exist)
    await initializeDatabase();

    // Check if summary already exists in cache
    const cachedSummary = await getSummary(postId);
    if (cachedSummary) {
      return NextResponse.json({ summary: cachedSummary, cached: true });
    }

    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Prepare content for summarization
    const contentToSummarize = `${postTitle}\n\n${postContent || 'No content available'}`;

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that summarizes Reddit posts. Provide concise, informative summaries that capture the main points and key insights. Keep summaries under 150 words and maintain a neutral tone.'
          },
          {
            role: 'user',
            content: `Please summarize this Reddit post:\n\n${contentToSummarize}`
          }
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', errorData);
      return NextResponse.json(
        { error: 'Failed to generate summary' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const summary = data.choices[0]?.message?.content?.trim();

    if (!summary) {
      return NextResponse.json(
        { error: 'No summary generated' },
        { status: 500 }
      );
    }

    // Save to database
    await saveSummary(postId, postTitle, postContent, summary);

    return NextResponse.json({ summary, cached: false });

  } catch (error) {
    console.error('Summarization error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 