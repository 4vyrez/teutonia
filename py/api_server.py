#!/usr/bin/env python3
"""
KB! Teutonia - Backend API Server
Connects to Neon PostgreSQL database and provides REST API for the dashboard
"""

import os
import json
from datetime import datetime, date, time as datetime_time
from decimal import Decimal
from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2
from psycopg2.extras import RealDictCursor

import requests
import icalendar
app = Flask(__name__)
CORS(app)

# Neon Database Connection
DATABASE_URL = os.environ.get('DATABASE_URL', 
    'postgresql://neondb_owner:npg_fF9yHCnNzVr7@ep-cold-leaf-agmtfo2s-pooler.c-2.eu-central-1.aws.neon.tech/KB%21%20Teutonia?sslmode=require'
)

def get_db():
    """Get database connection"""
    return psycopg2.connect(DATABASE_URL, cursor_factory=RealDictCursor)

def json_serial(obj):
    """JSON serializer for objects not serializable by default json code"""
    if isinstance(obj, (datetime, date)):
        return obj.isoformat()
    if isinstance(obj, datetime_time):
        return obj.strftime('%H:%M')
    if isinstance(obj, Decimal):
        return float(obj)
    raise TypeError(f"Type {type(obj)} not serializable")

def to_json(data):
    """Convert data to JSON-safe format"""
    return json.loads(json.dumps(data, default=json_serial))

# ============================================
# Members API
# ============================================

@app.route('/api/members', methods=['GET'])
def get_members():
    """Get all members"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM allowed_members ORDER BY surname")
        members = cur.fetchall()
        conn.close()
        return jsonify(to_json(members))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/members/<member_id>', methods=['GET'])
def get_member(member_id):
    """Get single member by ID"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM allowed_members WHERE id = %s", (member_id,))
        member = cur.fetchone()
        conn.close()
        if member:
            return jsonify(to_json(member))
        return jsonify({'error': 'Member not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/members/login', methods=['POST'])
def login_member():
    """Login by full name only"""
    try:
        data = request.json
        name = data.get('name', '').strip()
        
        conn = get_db()
        cur = conn.cursor()
        # Match full_name only (case-insensitive)
        cur.execute("""
            SELECT * FROM allowed_members 
            WHERE LOWER(full_name) = LOWER(%s)
        """, (name,))
        members = cur.fetchall()
        conn.close()
        
        return jsonify(to_json(members))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/members', methods=['POST'])
def create_member():
    """Create new member"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO allowed_members (first_name, surname, member_type, admin_role, full_name)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING *
        """, (
            data.get('first_name'),
            data.get('surname'),
            data.get('member_type', 'fux'),
            data.get('admin_role'),
            f"{data.get('first_name', '')} {data.get('surname', '')}".strip()
        ))
        member = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(member)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/members/<member_id>', methods=['PATCH'])
def update_member(member_id):
    """Update member"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        
        # Get current member data first to construct full_name if needed
        cur.execute("SELECT * FROM allowed_members WHERE id = %s", (member_id,))
        current_member = cur.fetchone()
        
        if not current_member:
            conn.close()
            return jsonify({'error': 'Member not found'}), 404
            
        updates = []
        values = []
        
        # Check if name fields are being updated
        first_name = data.get('first_name', current_member['first_name'])
        surname = data.get('surname', current_member['surname'])
        
        # Always update full_name if either name part changes or is in request
        if 'first_name' in data or 'surname' in data:
            data['full_name'] = f"{first_name} {surname}".strip()
        
        for key in ['first_name', 'surname', 'member_type', 'admin_role', 'password_hash', 'full_name']:
            if key in data:
                updates.append(f"{key} = %s")
                values.append(data[key])
        
        if not updates:
            conn.close()
            return jsonify({'error': 'No fields to update'}), 400
        
        values.append(member_id)
        
        cur.execute(f"""
            UPDATE allowed_members 
            SET {', '.join(updates)}
            WHERE id = %s
            RETURNING *
        """, values)
        member = cur.fetchone()
        conn.commit()
        conn.close()
        
        return jsonify(to_json(member))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/members/<member_id>', methods=['DELETE'])
def delete_member(member_id):
    """Delete member"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM allowed_members WHERE id = %s", (member_id,))
        conn.commit()
        conn.close()
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Events API
# ============================================

@app.route('/api/events', methods=['GET'])
def get_events():
    """Get all events with registrations"""
    try:
        # Sync with Google Calendar first
        sync_google_events()
        
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT * FROM events ORDER BY date ASC")
        events = cur.fetchall()
        
        # Get registrations for each event
        for event in events:
            cur.execute("""
                SELECT * FROM event_registrations WHERE event_id = %s
            """, (event['id'],))
            event['registrations'] = cur.fetchall()
        
        conn.close()
        return jsonify(to_json(events))
    except Exception as e:
        print(f"Error in get_events: {e}")
        return jsonify({'error': str(e)}), 500

def sync_google_events():
    """Sync events from public Google Calendar to DB"""
    try:
        url = "https://calendar.google.com/calendar/ical/2c089ae9f60a46e7e0176a1651089a9b7b95a23907d8f899b5dffcba12d4edb6%40group.calendar.google.com/public/basic.ics"
        response = requests.get(url, timeout=5)
        if response.status_code != 200:
            print(f"Google Calendar sync failed: {response.status_code}")
            return

        cal = icalendar.Calendar.from_ical(response.content)
        conn = get_db()
        cur = conn.cursor()
        
        now = datetime.now()
        
        for component in cal.walk():
            if component.name == "VEVENT":
                try:
                    uid = str(component.get('uid'))
                    summary = str(component.get('summary'))
                    start_dt = component.get('dtstart').dt
                    end_dt = component.get('dtend').dt if component.get('dtend') else None
                    location = str(component.get('location')) if component.get('location') else ''
                    description = str(component.get('description')) if component.get('description') else ''
                    
                    # Normalize dates
                    if not isinstance(start_dt, datetime):
                        # Convert date to datetime at midnight if needed, OR keep as date string
                        # The DB schema likely expects specific format. 
                        # Let's check typical DB usage: 'date' column usually DATE type, 'time' column TIME type.
                        # But Google events can be datetime.
                        # Adjusting for existing schema: title, date, end_date, time, meeting_time, location
                        
                        db_date = start_dt # It's a date object
                        db_time = None
                    else:
                        db_date = start_dt.date()
                        db_time = start_dt.time()

                    if end_dt:
                        if isinstance(end_dt, datetime):
                            db_end_date = end_dt.date()
                        else:
                            db_end_date = end_dt
                    else:
                        db_end_date = None

                    # Get a valid user ID for created_by (e.g., system admin or first user)
                    # Cache this if possible, or just query once per sync
                    cur.execute("SELECT id FROM allowed_members ORDER BY id ASC LIMIT 1")
                    sys_user = cur.fetchone()
                    sys_user_id = sys_user['id'] if sys_user else 1 # Fallback to 1 if empty (unlikely)

                    # Upsert event
                    cur.execute("""
                        INSERT INTO events (title, date, end_date, time, location, created_by, external_id, category)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, 'extern')
                        ON CONFLICT (external_id) 
                        DO UPDATE SET title = EXCLUDED.title, 
                                      date = EXCLUDED.date, 
                                      end_date = EXCLUDED.end_date, 
                                      time = EXCLUDED.time, 
                                      location = EXCLUDED.location,
                                      updated_at = NOW()
                    """, (
                        summary, 
                        db_date, 
                        db_end_date, 
                        db_time, 
                        location, 
                        sys_user_id,
                        uid
                    ))
                except Exception as ev_e:
                    print(f"Error syncing event {summary}: {ev_e}")
                    continue
                    
        conn.commit()
        conn.close()
    except Exception as e:
        print(f"Sync error: {e}")


@app.route('/api/events', methods=['POST'])
def create_event():
    """Create new event"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO events (title, date, end_date, time, meeting_time, location, category, created_by)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            RETURNING *
        """, (
            data.get('title'),
            data.get('date'),
            data.get('end_date'),
            data.get('time'),
            data.get('meeting_time'),
            data.get('location', 'Auf dem Haus'),
            data.get('category', 'intern'),
            data.get('created_by')
        ))
        event = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(event)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events/<event_id>', methods=['PATCH'])
def update_event(event_id):
    """Update event"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            UPDATE events 
            SET title = %s, date = %s, end_date = %s, time = %s, 
                meeting_time = %s, location = %s, updated_at = NOW()
            WHERE id = %s
            RETURNING *
        """, (
            data.get('title'),
            data.get('date'),
            data.get('end_date'),
            data.get('time'),
            data.get('meeting_time'),
            data.get('location'),
            event_id
        ))
        event = cur.fetchone()
        conn.commit()
        conn.close()
        
        if event:
            return jsonify(to_json(event))
        return jsonify({'error': 'Event not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/events/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    """Delete event"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("DELETE FROM events WHERE id = %s", (event_id,))
        conn.commit()
        conn.close()
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Event Registrations API
# ============================================

@app.route('/api/event-registrations', methods=['POST'])
def upsert_event_registration():
    """Create or update event registration"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO event_registrations (event_id, member_id, status, confirmed, extras)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (event_id, member_id) 
            DO UPDATE SET status = EXCLUDED.status, confirmed = EXCLUDED.confirmed, 
                          extras = EXCLUDED.extras, updated_at = NOW()
            RETURNING *
        """, (
            data.get('event_id'),
            data.get('member_id'),
            data.get('status', 'ja'),
            data.get('confirmed', False),
            data.get('extras')
        ))
        reg = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(reg)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Meals API
# ============================================

@app.route('/api/meals', methods=['GET'])
def get_meals():
    """Get meals for a specific week"""
    try:
        year = request.args.get('year', type=int)
        week = request.args.get('week', type=int)
        
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            SELECT * FROM meals WHERE year = %s AND week = %s
        """, (year, week))
        meals = cur.fetchall()
        
        # Get signups for each meal
        for meal in meals:
            cur.execute("""
                SELECT * FROM meal_signups WHERE meal_id = %s
            """, (meal['id'],))
            meal['signups'] = cur.fetchall()
        
        conn.close()
        return jsonify(to_json(meals))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/meals', methods=['POST'])
def upsert_meal():
    """Create or update meal"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO meals (year, week, day_index, vorspeise, hauptgericht, nachspeise, kochteam, status)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (year, week, day_index) 
            DO UPDATE SET vorspeise = EXCLUDED.vorspeise, hauptgericht = EXCLUDED.hauptgericht,
                          nachspeise = EXCLUDED.nachspeise, kochteam = EXCLUDED.kochteam,
                          status = EXCLUDED.status, updated_at = NOW()
            RETURNING *
        """, (
            data.get('year'),
            data.get('week'),
            data.get('day_index'),
            data.get('vorspeise'),
            data.get('hauptgericht'),
            data.get('nachspeise'),
            data.get('kochteam'),
            data.get('status', 'active')
        ))
        meal = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(meal)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Meal Signups API
# ============================================

@app.route('/api/meal-signups', methods=['POST'])
def upsert_meal_signup():
    """Create or update meal signup"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        
        # First ensure meal exists
        cur.execute("""
            INSERT INTO meals (year, week, day_index)
            VALUES (%s, %s, %s)
            ON CONFLICT (year, week, day_index) DO NOTHING
        """, (data.get('year'), data.get('week'), data.get('day_index')))
        
        # Get meal_id
        cur.execute("""
            SELECT id FROM meals WHERE year = %s AND week = %s AND day_index = %s
        """, (data.get('year'), data.get('week'), data.get('day_index')))
        meal = cur.fetchone()
        
        if not meal:
            return jsonify({'error': 'Could not create meal'}), 500
        
        cur.execute("""
            INSERT INTO meal_signups (meal_id, member_id, types, amount)
            VALUES (%s, %s, %s, %s)
            ON CONFLICT (meal_id, member_id) 
            DO UPDATE SET types = EXCLUDED.types, amount = EXCLUDED.amount, updated_at = NOW()
            RETURNING *
        """, (
            meal['id'],
            data.get('member_id'),
            data.get('types', []),
            data.get('amount', 0)
        ))
        signup = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(signup)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Announcements API
# ============================================

@app.route('/api/announcements', methods=['GET'])
def get_announcements():
    """Get active announcements"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            SELECT * FROM announcements 
            WHERE is_active = true 
            ORDER BY created_at DESC 
            LIMIT 10
        """)
        announcements = cur.fetchall()
        conn.close()
        return jsonify(to_json(announcements))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/announcements', methods=['POST'])
def create_announcement():
    """Create announcement"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO announcements (title, content, author_id, category)
            VALUES (%s, %s, %s, %s)
            RETURNING *
        """, (
            data.get('title'),
            data.get('content'),
            data.get('author_id'),
            data.get('category', 'info')
        ))
        announcement = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(announcement)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Expenses API
# ============================================

@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    """Get expenses"""
    try:
        start_date = request.args.get('start_date')
        conn = get_db()
        cur = conn.cursor()
        
        if start_date:
            cur.execute("""
                SELECT * FROM expenses WHERE date >= %s ORDER BY date DESC
            """, (start_date,))
        else:
            cur.execute("SELECT * FROM expenses ORDER BY date DESC LIMIT 100")
        
        expenses = cur.fetchall()
        conn.close()
        return jsonify(to_json(expenses))
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/expenses', methods=['POST'])
def create_expense():
    """Create expense"""
    try:
        data = request.json
        conn = get_db()
        cur = conn.cursor()
        cur.execute("""
            INSERT INTO expenses (member_id, category, description, amount, recorded_by)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING *
        """, (
            data.get('member_id'),
            data.get('category'),
            data.get('description'),
            data.get('amount'),
            data.get('recorded_by')
        ))
        expense = cur.fetchone()
        conn.commit()
        conn.close()
        return jsonify(to_json(expense)), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# ============================================
# Google Calendar API
# ============================================

@app.route('/api/calendar_events', methods=['GET'])
def get_calendar_events():
    """Fetch and parse Google Calendar events"""
    try:
        url = "https://calendar.google.com/calendar/ical/2c089ae9f60a46e7e0176a1651089a9b7b95a23907d8f899b5dffcba12d4edb6%40group.calendar.google.com/public/basic.ics"
        response = requests.get(url)
        response.raise_for_status()
        
        cal = icalendar.Calendar.from_ical(response.content)
        events = []
        
        for component in cal.walk():
            if component.name == "VEVENT":
                start_dt = component.get('dtstart').dt
                end_dt = component.get('dtend').dt if component.get('dtend') else None
                
                # Convert date objects to datetime for consistency if needed, 
                # but isoformat() handles both usually.
                
                event = {
                    'summary': str(component.get('summary')),
                    'start': start_dt.isoformat() if hasattr(start_dt, 'isoformat') else str(start_dt),
                    'end': end_dt.isoformat() if end_dt and hasattr(end_dt, 'isoformat') else str(end_dt),
                    'location': str(component.get('location')) if component.get('location') else None,
                    'description': str(component.get('description')) if component.get('description') else None
                }
                events.append(event)
        
        # Sort events by start date
        events.sort(key=lambda x: x['start'])
        
        # Filter for future events only (optional but good for display)
        # For now, return all and let frontend decide or just return all 
        now = datetime.now().isoformat()
        future_events = [e for e in events if e['start'] >= now[:10]] # Simple string comparison for basic date filtering
        
        return jsonify(future_events)
    except Exception as e:
        print(f"Error fetching calendar: {e}")
        return jsonify({'error': str(e)}), 500

# ============================================
# Health Check
# ============================================

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        conn = get_db()
        cur = conn.cursor()
        cur.execute("SELECT 1")
        conn.close()
        return jsonify({'status': 'healthy', 'database': 'connected'})
    except Exception as e:
        return jsonify({'status': 'unhealthy', 'error': str(e)}), 500

if __name__ == '__main__':
    print("Starting KB! Teutonia API Server...")
    print(f"DATABASE_URL: {DATABASE_URL[:50]}...")  # Debug: show first 50 chars
    print("API available at http://localhost:5001")
    app.run(debug=False, host='0.0.0.0', port=5001)



