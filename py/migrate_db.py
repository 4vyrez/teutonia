import os
import psycopg2

DATABASE_URL = os.environ.get('DATABASE_URL', 
    'postgresql://neondb_owner:npg_fF9yHCnNzVr7@ep-cold-leaf-agmtfo2s-pooler.c-2.eu-central-1.aws.neon.tech/KB%21%20Teutonia?sslmode=require'
)

def migrate():
    conn = psycopg2.connect(DATABASE_URL)
    cur = conn.cursor()
    
    try:
        print("Checking if external_id column exists...")
        cur.execute("""
            SELECT column_name 
            FROM information_schema.columns 
            WHERE table_name='events' AND column_name='external_id'
        """)
        
        if cur.fetchone():
            print("Column 'external_id' already exists.")
        else:
            print("Adding 'external_id' column...")
            cur.execute("ALTER TABLE events ADD COLUMN external_id TEXT")
            cur.execute("CREATE UNIQUE INDEX IF NOT EXISTS idx_events_external_id ON events(external_id)")
            conn.commit()
            print("Migration successful: Added external_id column and index.")
            
    except Exception as e:
        print(f"Migration failed: {e}")
        conn.rollback()
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
