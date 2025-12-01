ALTER TABLE leaderboard ADD COLUMN difficulty TEXT NOT NULL DEFAULT 'unknown';

-- Remove the old index on score
DROP INDEX IF EXISTS idx_leaderboard_score;

-- Create a composite index on score and difficulty for improved query performance
CREATE INDEX IF NOT EXISTS idx_leaderboard_score_difficulty ON leaderboard(score, difficulty);
