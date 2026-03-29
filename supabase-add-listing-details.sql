-- Add details column to listings table for extended listing fields
-- Run this in Supabase Dashboard > SQL Editor

ALTER TABLE listings
ADD COLUMN IF NOT EXISTS details JSONB NOT NULL DEFAULT '{}'::jsonb;

-- Optional index for querying inside details (only if needed later)
-- CREATE INDEX IF NOT EXISTS idx_listings_details_gin ON listings USING GIN (details);

