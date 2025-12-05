/*
  # Create Blog Posts Table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key) - Unique identifier for each blog post
      - `title` (text, not null) - Title of the blog post
      - `content` (text, not null) - Full content of the blog post
      - `excerpt` (text) - Short excerpt/summary of the post
      - `category` (text, not null) - Category: 'places' or 'tech'
      - `image_url` (text) - URL to header image for the post
      - `author` (text, not null) - Author name
      - `created_at` (timestamptz) - Creation timestamp
      - `search_vector` (tsvector) - Full-text search vector for efficient searching

  2. Indexes
    - GIN index on search_vector for fast full-text search
    - Index on category for filtering
    - Index on created_at for sorting

  3. Security
    - Enable RLS on `blog_posts` table
    - Add policy for public read access (anyone can view blog posts)
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  category text NOT NULL CHECK (category IN ('places', 'tech')),
  image_url text,
  author text NOT NULL DEFAULT 'Admin',
  created_at timestamptz DEFAULT now(),
  search_vector tsvector
);

-- Create index for full-text search
CREATE INDEX IF NOT EXISTS blog_posts_search_idx ON blog_posts USING GIN (search_vector);

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts (category);

-- Create index for sorting by date
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts (created_at DESC);

-- Function to automatically update search_vector
CREATE OR REPLACE FUNCTION blog_posts_search_vector_update() RETURNS trigger AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', COALESCE(NEW.title, '') || ' ' || COALESCE(NEW.content, '') || ' ' || COALESCE(NEW.excerpt, ''));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update search_vector on insert/update
DROP TRIGGER IF EXISTS blog_posts_search_vector_trigger ON blog_posts;
CREATE TRIGGER blog_posts_search_vector_trigger
  BEFORE INSERT OR UPDATE ON blog_posts
  FOR EACH ROW
  EXECUTE FUNCTION blog_posts_search_vector_update();

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read blog posts (public access)
CREATE POLICY "Anyone can view blog posts"
  ON blog_posts
  FOR SELECT
  USING (true);