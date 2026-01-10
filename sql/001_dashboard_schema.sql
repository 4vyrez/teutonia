-- ============================================
-- KB! Teutonia Dashboard - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. Update allowed_members table
-- ============================================
ALTER TABLE allowed_members 
ADD COLUMN IF NOT EXISTS member_type VARCHAR(50) DEFAULT 'bursche',
ADD COLUMN IF NOT EXISTS admin_role VARCHAR(50),
ADD COLUMN IF NOT EXISTS first_name VARCHAR(100);

-- Update existing members with member_type based on current data
-- (Run this separately if you have existing data to migrate)

-- ============================================
-- 2. Events Table
-- ============================================
CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  end_date DATE,
  time TIME,
  meeting_time TIME,
  location VARCHAR(255) DEFAULT 'Auf dem Haus',
  description TEXT,
  category VARCHAR(50) DEFAULT 'intern' CHECK (category IN ('pflicht', 'freiwillig', 'intern')),
  confirmation_deadline DATE,
  created_by UUID REFERENCES allowed_members(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster date queries
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);

-- ============================================
-- 3. Event Registrations Table
-- ============================================
CREATE TABLE IF NOT EXISTS event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
  status VARCHAR(20) NOT NULL DEFAULT 'ja' CHECK (status IN ('ja', 'nein', 'vielleicht')),
  confirmed BOOLEAN DEFAULT FALSE,
  extras TEXT,
  guest_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, member_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_event_reg_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_member ON event_registrations(member_id);

-- ============================================
-- 4. Meals Table
-- ============================================
CREATE TABLE IF NOT EXISTS meals (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  year INTEGER NOT NULL,
  week INTEGER NOT NULL,
  day_index INTEGER NOT NULL CHECK (day_index >= 0 AND day_index <= 4),
  vorspeise VARCHAR(255),
  hauptgericht VARCHAR(255),
  nachspeise VARCHAR(255),
  kochteam VARCHAR(255),
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'sick', 'vacation')),
  signup_deadline TIME DEFAULT '10:00',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(year, week, day_index)
);

-- Index for week queries
CREATE INDEX IF NOT EXISTS idx_meals_week ON meals(year, week);

-- ============================================
-- 5. Meal Signups Table
-- ============================================
CREATE TABLE IF NOT EXISTS meal_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  meal_id UUID REFERENCES meals(id) ON DELETE CASCADE,
  member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
  types TEXT[] DEFAULT '{}',
  amount DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(meal_id, member_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_meal_signup_meal ON meal_signups(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_signup_member ON meal_signups(member_id);

-- ============================================
-- 6. Announcements Table
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES allowed_members(id),
  category VARCHAR(50) DEFAULT 'info' CHECK (category IN ('info', 'urgent', 'event')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ
);

-- Index for active announcements
CREATE INDEX IF NOT EXISTS idx_announcements_active ON announcements(is_active, created_at DESC);

-- ============================================
-- 7. Announcement Reads Table
-- ============================================
CREATE TABLE IF NOT EXISTS announcement_reads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
  member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
  read_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(announcement_id, member_id)
);

-- ============================================
-- 8. Drinks/Expenses Table (for Aktivenkasse)
-- ============================================
CREATE TABLE IF NOT EXISTS expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('drinks', 'other', 'meals')),
  description VARCHAR(255),
  amount DECIMAL(10,2) NOT NULL,
  date DATE DEFAULT CURRENT_DATE,
  recorded_by UUID REFERENCES allowed_members(id),
  is_paid BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_expenses_member ON expenses(member_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);

-- ============================================
-- Row Level Security (RLS) Policies
-- ============================================

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE meals ENABLE ROW LEVEL SECURITY;
ALTER TABLE meal_signups ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcement_reads ENABLE ROW LEVEL SECURITY;
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Events: All authenticated users can read, admins can write
CREATE POLICY "Events are viewable by all" ON events FOR SELECT USING (true);
CREATE POLICY "Events can be created by admins" ON events FOR INSERT WITH CHECK (true);
CREATE POLICY "Events can be updated by admins" ON events FOR UPDATE USING (true);
CREATE POLICY "Events can be deleted by admins" ON events FOR DELETE USING (true);

-- Event Registrations: All can read, users can update their own
CREATE POLICY "Registrations are viewable by all" ON event_registrations FOR SELECT USING (true);
CREATE POLICY "Registrations can be created" ON event_registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Registrations can be updated" ON event_registrations FOR UPDATE USING (true);

-- Meals: All can read, koch/admin can write
CREATE POLICY "Meals are viewable by all" ON meals FOR SELECT USING (true);
CREATE POLICY "Meals can be created" ON meals FOR INSERT WITH CHECK (true);
CREATE POLICY "Meals can be updated" ON meals FOR UPDATE USING (true);

-- Meal Signups: All can read, users can manage their own
CREATE POLICY "Meal signups are viewable by all" ON meal_signups FOR SELECT USING (true);
CREATE POLICY "Meal signups can be created" ON meal_signups FOR INSERT WITH CHECK (true);
CREATE POLICY "Meal signups can be updated" ON meal_signups FOR UPDATE USING (true);
CREATE POLICY "Meal signups can be deleted" ON meal_signups FOR DELETE USING (true);

-- Announcements: All can read, admins can write
CREATE POLICY "Announcements are viewable by all" ON announcements FOR SELECT USING (true);
CREATE POLICY "Announcements can be created" ON announcements FOR INSERT WITH CHECK (true);
CREATE POLICY "Announcements can be updated" ON announcements FOR UPDATE USING (true);

-- Announcement Reads: Users can manage their own
CREATE POLICY "Reads are viewable by all" ON announcement_reads FOR SELECT USING (true);
CREATE POLICY "Reads can be created" ON announcement_reads FOR INSERT WITH CHECK (true);

-- Expenses: Viewable by admins, tracked by aktivenkasse
CREATE POLICY "Expenses are viewable by all" ON expenses FOR SELECT USING (true);
CREATE POLICY "Expenses can be created" ON expenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Expenses can be updated" ON expenses FOR UPDATE USING (true);

-- ============================================
-- Seed initial events (optional - from current hardcoded data)
-- ============================================
INSERT INTO events (title, date, end_date, time, meeting_time, location, category) VALUES
  ('Burschentag', '2025-01-11', NULL, '14:00', '13:30', 'Auf dem Haus', 'pflicht'),
  ('Teutonentour', '2025-02-15', NULL, '09:00', '08:30', 'Treffpunkt wird bekannt gegeben', 'freiwillig')
ON CONFLICT DO NOTHING;

COMMIT;
