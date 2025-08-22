import { Pool, PoolClient } from 'pg';

let pool: Pool | null = null;

export function getPool(): Pool {
  if (!pool) {
    const databaseUrl = process.env.POSTGRESS_DB_URL;
    
    if (!databaseUrl) {
      throw new Error('POSTGRESS_DB_URL environment variable is required');
    }

    pool = new Pool({
      connectionString: databaseUrl,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    });
  }

  return pool;
}

export async function getClient(): Promise<PoolClient> {
  const pool = getPool();
  return await pool.connect();
}

export async function initializeDatabase(): Promise<void> {
  const client = await getClient();
  
  try {
    // Create table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS post_summaries (
        id SERIAL PRIMARY KEY,
        post_id TEXT UNIQUE NOT NULL,
        post_title TEXT NOT NULL,
        post_content TEXT,
        summary TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
  } finally {
    client.release();
  }
}

export async function getSummary(postId: string): Promise<string | null> {
  const client = await getClient();
  
  try {
    const result = await client.query(
      'SELECT summary FROM post_summaries WHERE post_id = $1',
      [postId]
    );
    return result.rows[0]?.summary || null;
  } finally {
    client.release();
  }
}

export async function saveSummary(
  postId: string,
  postTitle: string,
  postContent: string | null,
  summary: string
): Promise<void> {
  const client = await getClient();
  
  try {
    await client.query(
      `INSERT INTO post_summaries (post_id, post_title, post_content, summary, updated_at) 
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)
       ON CONFLICT (post_id) 
       DO UPDATE SET 
         post_title = EXCLUDED.post_title,
         post_content = EXCLUDED.post_content,
         summary = EXCLUDED.summary,
         updated_at = CURRENT_TIMESTAMP`,
      [postId, postTitle, postContent, summary]
    );
  } finally {
    client.release();
  }
}

export async function closeDatabase(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
} 