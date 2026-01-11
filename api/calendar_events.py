from http.server import BaseHTTPRequestHandler
import json
from datetime import datetime
import requests
import icalendar

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
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
                    
                    event = {
                        'summary': str(component.get('summary')),
                        'start': start_dt.isoformat() if hasattr(start_dt, 'isoformat') else str(start_dt),
                        'end': end_dt.isoformat() if end_dt and hasattr(end_dt, 'isoformat') else str(end_dt),
                        'location': str(component.get('location')) if component.get('location') else None,
                        'description': str(component.get('description')) if component.get('description') else None
                    }
                    events.append(event)
            
            events.sort(key=lambda x: x['start'])
            now = datetime.now().isoformat()
            future_events = [e for e in events if e['start'] >= now[:10]]
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            self.wfile.write(json.dumps(future_events).encode())
            
        except Exception as e:
            self.send_response(500)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode())
