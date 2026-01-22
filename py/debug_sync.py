import os
import psycopg2
import requests
import icalendar
from datetime import datetime
from psycopg2.extras import RealDictCursor

DATABASE_URL = os.environ.get('DATABASE_URL', 
    'postgresql://neondb_owner:npg_fF9yHCnNzVr7@ep-cold-leaf-agmtfo2s-pooler.c-2.eu-central-1.aws.neon.tech/KB%21%20Teutonia?sslmode=require'
)

def debug_sync():
    conn = psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)
    cur = conn.cursor()
    
    print("--- 1. Check User ID Type ---")
    cur.execute("SELECT id, full_name FROM allowed_members LIMIT 1")
    user = cur.fetchone()
    if user:
        print(f"Found user: {user['full_name']} (ID: {user['id']}, Type: {type(user['id'])})")
        sys_user_id = user['id']
    else:
        print("No users found!")
        sys_user_id = 1
        
    print(f"Using system user ID: {sys_user_id}")

    print("\n--- 2. Fetching Calendar ---")
    url = "https://calendar.google.com/calendar/ical/2c089ae9f60a46e7e0176a1651089a9b7b95a23907d8f899b5dffcba12d4edb6%40group.calendar.google.com/public/basic.ics"
    resp = requests.get(url)
    print(f"Status: {resp.status_code}")
    
    cal = icalendar.Calendar.from_ical(resp.content)
    
    print("\n--- 3. Processing Events ---")
    count = 0
    for component in cal.walk():
        if component.name == "VEVENT":
            try:
                summary = str(component.get('summary'))
                uid = str(component.get('uid'))
                start_dt = component.get('dtstart').dt
                
                # Basic date handling
                if isinstance(start_dt, datetime):
                    db_date = start_dt.date()
                    db_time = start_dt.time()
                else:
                    db_date = start_dt
                    db_time = None
                    
                print(f"Syncing: {summary} ({db_date})")
                
                # Check if exists
                cur.execute("SELECT id FROM events WHERE external_id = %s", (uid,))
                exists = cur.fetchone()
                action = "UPDATE" if exists else "INSERT"
                
                cur.execute("""
                    INSERT INTO events (title, date, time, location, created_by, external_id, category)
                    VALUES (%s, %s, %s, %s, %s, %s, 'extern')
                    ON CONFLICT (external_id) 
                    DO UPDATE SET title = EXCLUDED.title, 
                                  date = EXCLUDED.date, 
                                  time = EXCLUDED.time, 
                                  updated_at = NOW()
                    RETURNING id
                """, (
                    summary, 
                    db_date, 
                    db_time, 
                    str(component.get('location') or ''), 
                    sys_user_id,
                    uid
                ))
                res = cur.fetchone()
                print(f"  -> {action} successful. ID: {res['id']}")
                conn.commit()
                count += 1
                
            except Exception as e:
                print(f"  -> ERROR: {e}")
                conn.rollback()
                
    print(f"\nTotal processed: {count}")
    conn.close()

if __name__ == "__main__":
    debug_sync()
