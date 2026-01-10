#!/usr/bin/env python3
"""
Database initialization script for KB! Teutonia
Connects to Neon and creates all required tables from scratch
"""

import psycopg2

DATABASE_URL = 'postgresql://neondb_owner:npg_fF9yHCnNzVr7@ep-cold-leaf-agmtfo2s-pooler.c-2.eu-central-1.aws.neon.tech/KB%21%20Teutonia?sslmode=require'

SCHEMA = """
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Members Table (main user table)
CREATE TABLE IF NOT EXISTS allowed_members (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    surname VARCHAR(100) NOT NULL,
    first_name VARCHAR(100),
    full_name VARCHAR(200),
    member_type VARCHAR(50) DEFAULT 'bursche',
    admin_role VARCHAR(50),
    password_hash VARCHAR(255),
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events Table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    end_date DATE,
    time TIME,
    meeting_time TIME,
    location VARCHAR(255) DEFAULT 'Auf dem Haus',
    description TEXT,
    category VARCHAR(50) DEFAULT 'intern',
    confirmation_deadline DATE,
    created_by UUID REFERENCES allowed_members(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Registrations Table
CREATE TABLE IF NOT EXISTS event_registrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'ja',
    confirmed BOOLEAN DEFAULT FALSE,
    extras TEXT,
    guest_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(event_id, member_id)
);

-- Meals Table
CREATE TABLE IF NOT EXISTS meals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    year INTEGER NOT NULL,
    week INTEGER NOT NULL,
    day_index INTEGER NOT NULL,
    vorspeise VARCHAR(255),
    hauptgericht VARCHAR(255),
    nachspeise VARCHAR(255),
    kochteam VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active',
    signup_deadline TIME DEFAULT '10:00',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(year, week, day_index)
);

-- Meal Signups Table
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

-- Announcements Table
CREATE TABLE IF NOT EXISTS announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author_id UUID REFERENCES allowed_members(id),
    category VARCHAR(50) DEFAULT 'info',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    expires_at TIMESTAMPTZ
);

-- Announcement Reads Table
CREATE TABLE IF NOT EXISTS announcement_reads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    announcement_id UUID REFERENCES announcements(id) ON DELETE CASCADE,
    member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
    read_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(announcement_id, member_id)
);

-- Expenses Table
CREATE TABLE IF NOT EXISTS expenses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    member_id UUID REFERENCES allowed_members(id) ON DELETE CASCADE,
    category VARCHAR(50) NOT NULL,
    description VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    recorded_by UUID REFERENCES allowed_members(id),
    is_paid BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_event_reg_event ON event_registrations(event_id);
CREATE INDEX IF NOT EXISTS idx_event_reg_member ON event_registrations(member_id);
CREATE INDEX IF NOT EXISTS idx_meals_week ON meals(year, week);
CREATE INDEX IF NOT EXISTS idx_meal_signup_meal ON meal_signups(meal_id);
CREATE INDEX IF NOT EXISTS idx_meal_signup_member ON meal_signups(member_id);
CREATE INDEX IF NOT EXISTS idx_expenses_member ON expenses(member_id);
CREATE INDEX IF NOT EXISTS idx_expenses_date ON expenses(date);
"""

SEED_MEMBERS = """
-- Insert initial members (die Aktiven und Füxe)
INSERT INTO allowed_members (surname, first_name, full_name, member_type, admin_role) VALUES
    ('Reichert', 'Theo', 'Theo Reichert', 'fux', 'systemadmin'),
    ('Pallasch', 'Max', 'Max Pallasch', 'bursche', 'systemadmin'),
    ('Bauer', 'Johannes', 'Johannes Bauer', 'fux', 'va'),
    ('Renner', 'Julius', 'Julius Renner', 'bursche', 'aktivenkasse'),
    ('Dreizler', 'Florian', 'Florian Dreizler', 'fux', NULL),
    ('Lundgren', 'Oskar', 'Oskar Lundgren', 'fux', NULL),
    ('Anton', 'Benedict', 'Benedict Anton', 'fux', NULL),
    ('Heidepriem', 'Jannik', 'Jannik Heidepriem', 'fux', NULL),
    ('Kalla', 'Elias', 'Elias Kalla', 'fux', NULL),
    ('Polo Morawietz', 'Leandro', 'Leandro Polo Morawietz', 'fux', NULL),
    ('Nedliko', 'Marko', 'Marko Nedliko', 'fux', NULL),
    ('Kevin', NULL, 'Kevin', 'employee', 'koch')
ON CONFLICT DO NOTHING;
"""

SEED_EVENTS = """
-- Seed initial events
INSERT INTO events (title, date, time, meeting_time, location, category) VALUES
    ('Burschentag', '2025-01-11', '14:00', '13:30', 'Auf dem Haus', 'pflicht'),
    ('Teutonentour', '2025-02-15', '09:00', '08:30', 'Treffpunkt wird bekannt gegeben', 'freiwillig'),
    ('Stammtisch', '2025-01-18', '20:00', '19:30', 'Auf dem Haus', 'intern'),
    ('Ankneipe', '2025-01-25', '20:00', '19:00', 'Auf dem Haus', 'pflicht')
ON CONFLICT DO NOTHING;
"""

def run_migration():
    print("🔌 Connecting to Neon database...")
    try:
        conn = psycopg2.connect(DATABASE_URL)
        cur = conn.cursor()
        
        print("📦 Creating schema...")
        cur.execute(SCHEMA)
        conn.commit()
        print("✅ Schema created!")
        
        print("👥 Adding members...")
        cur.execute(SEED_MEMBERS)
        conn.commit()
        print("✅ Members added!")
        
        print("📅 Adding events...")
        cur.execute(SEED_EVENTS)
        conn.commit()
        print("✅ Events added!")
        
        # Show summary
        print("\n" + "="*50)
        print("📋 DATABASE SUMMARY")
        print("="*50)
        
        cur.execute("SELECT COUNT(*) FROM allowed_members")
        print(f"   Members: {cur.fetchone()[0]}")
        
        cur.execute("SELECT COUNT(*) FROM events")
        print(f"   Events: {cur.fetchone()[0]}")
        
        cur.execute("SELECT COUNT(*) FROM meals")
        print(f"   Meals: {cur.fetchone()[0]}")
        
        # Show members
        print("\n👥 Members:")
        cur.execute("SELECT surname, first_name, member_type, admin_role FROM allowed_members ORDER BY surname")
        for m in cur.fetchall():
            role = f" [{m[3]}]" if m[3] else ""
            print(f"   - {m[0]}, {m[1] or ''} ({m[2]}){role}")
        
        # Show events
        print("\n📅 Events:")
        cur.execute("SELECT title, date, category FROM events ORDER BY date")
        for e in cur.fetchall():
            print(f"   - {e[0]} ({e[1]}) - {e[2]}")
        
        conn.close()
        print("\n✅ Database initialization complete!")
        return True
        
    except Exception as e:
        print(f"❌ Error: {e}")
        import traceback
        traceback.print_exc()
        return False

if __name__ == '__main__':
    run_migration()
