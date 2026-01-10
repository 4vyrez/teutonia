import requests
import json

# Supabase configuration (same as in mitglieder-v3.js)
SUPABASE_URL = 'https://hhxpvlfnovtigamqvjhb.supabase.co'
SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeHB2bGZub3Z0aWdhbXF2amhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDU5ODMsImV4cCI6MjA4MDc4MTk4M30.6t8g8DD23awiX4fcBWZ_Ch1ntHJ1wfHGtF_HB6NenDE'

def supabase_request(endpoint, method='GET', data=None):
    """Make a request to Supabase REST API"""
    url = f"{SUPABASE_URL}/rest/v1/{endpoint}"
    headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': f'Bearer {SUPABASE_KEY}',
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
    }
    
    if method == 'GET':
        response = requests.get(url, headers=headers)
    elif method == 'POST':
        response = requests.post(url, headers=headers, json=data)
    elif method == 'PATCH':
        response = requests.patch(url, headers=headers, json=data)
    elif method == 'DELETE':
        response = requests.delete(url, headers=headers)
    
    if not response.ok:
        print(f"❌ API Error: {response.status_code} - {response.text}")
        return None
    
    return response.json() if response.text else []

def list_members():
    """List all members in allowed_members table"""
    print("\n📋 Lade Mitglieder aus allowed_members...")
    
    members = supabase_request('allowed_members?select=*&order=id')
    
    if members is None:
        return
    
    print(f"\n👥 Mitglieder ({len(members)} Einträge):")
    print("-" * 80)
    for member in members:
        print(f"  ID {member.get('id', '?')}: surname='{member.get('surname', '')}' | first_name='{member.get('first_name', '')}' | password_hash={'set' if member.get('password_hash') else 'not set'}")
    print("-" * 80)
    
    return members

def add_first_name_column():
    """Check if first_name column exists (via schema introspection or test query)"""
    # Try to query with first_name
    result = supabase_request('allowed_members?select=first_name&limit=1')
    if result is None:
        print("⚠️ first_name Spalte existiert möglicherweise nicht - muss in Supabase UI hinzugefügt werden:")
        print("   ALTER TABLE allowed_members ADD COLUMN first_name TEXT;")
    else:
        print("✅ first_name Spalte existiert bereits")

def update_member_first_name(member_id, first_name):
    """Update a member's first_name by ID"""
    result = supabase_request(f'allowed_members?id=eq.{member_id}', method='PATCH', data={'first_name': first_name})
    if result:
        print(f"✅ Updated ID {member_id} -> first_name = '{first_name}'")
    return result

def fix_member_names():
    """Fix the member names: extract first_name from surname where needed"""
    members = supabase_request('allowed_members?select=*&order=id')
    
    if not members:
        print("❌ Keine Mitglieder gefunden")
        return
    
    print("\n🔧 Korrigiere Mitgliedernamen...\n")
    
    # Known name mappings (surname in DB -> correct first_name, surname)
    name_corrections = {
        'Max': ('Max', None),  # Just first name, no surname
        'Kevin': ('Kevin', None),  # Angestellter
        # Add more as needed based on what's in the DB
    }
    
    # Füxe with both first and last names
    fuexe_names = {
        'Johannes Bauer': ('Johannes', 'Bauer'),
        'Theo Reichert': ('Theo', 'Reichert'),
        'Florian Dreizler': ('Florian', 'Dreizler'),
        'Per Oskar Lundgren': ('Per Oskar', 'Lundgren'),
        'Benedict Anton': ('Benedict', 'Anton'),
        'Jannik Heideprim': ('Jannik', 'Heideprim'),
        'Elias Kalla': ('Elias', 'Kalla'),
        'Leandro Polo Morawietz': ('Leandro', 'Polo Morawietz'),
        'Julius Renner': ('Julius', 'Renner'),
        'Marco': ('Marco', None),
    }
    
    for member in members:
        current_surname = member.get('surname', '')
        current_first = member.get('first_name', '')
        member_id = member.get('id')
        
        print(f"  Prüfe ID {member_id}: surname='{current_surname}' first_name='{current_first}'")
        
        # Check if this looks like a full name in surname field
        if ' ' in current_surname and not current_first:
            # Try to find in our known names
            if current_surname in fuexe_names:
                first, last = fuexe_names[current_surname]
                print(f"    → Korrigiere zu: first_name='{first}', surname='{last or current_surname}'")
                # Update via API
                update_data = {'first_name': first}
                if last:
                    update_data['surname'] = last
                result = supabase_request(f'allowed_members?id=eq.{member_id}', method='PATCH', data=update_data)
                if result:
                    print(f"    ✅ Erfolgreich aktualisiert!")

if __name__ == "__main__":
    print("🔌 Verbinde mit Supabase...")
    
    # Test connection
    test = supabase_request('allowed_members?select=id&limit=1')
    if test is not None:
        print("✅ Verbindung erfolgreich!\n")
        
        # Check first_name column
        add_first_name_column()
        
        # List current members
        list_members()
        
        # Option to fix names
        print("\n💡 Zum Korrigieren der Namen: fix_all_names() aufrufen")
    else:
        print("❌ Verbindung fehlgeschlagen")


def fix_all_names():
    """Fix all member names to have proper first_name and surname structure"""
    members = supabase_request('allowed_members?select=*&order=id')
    
    if not members:
        print("❌ Keine Mitglieder gefunden")
        return
    
    print("\n🔧 Korrigiere alle Mitgliedernamen...\n")
    
    # Complete member database: current_surname -> (correct_first_name, correct_surname)
    # If surname is None, it means we only know the first name
    corrections = {
        # Füxe (korrekte Aufteilung)
        'Johannes Bauer': ('Johannes', 'Bauer'),
        'Theo Reichert': ('Theo', 'Reichert'),
        'Florian Dreizler': ('Florian', 'Dreizler'),
        'Per Oskar Lundgren': ('Per Oskar', 'Lundgren'),
        'Benedict Anton': ('Benedict', 'Anton'),
        'Jannik Heideprim': ('Jannik', 'Heideprim'),
        'Elias Kalla': ('Elias', 'Kalla'),
        'Leandro Polo Morawietz': ('Leandro', 'Polo Morawietz'),
        'Julius Renner': ('Julius', 'Renner'),
        
        # Einzelne Namen (nur Vorname bekannt)
        'Marco': ('Marco', None),
        'Lisandro': ('Lisandro', None),
        'Lars': ('Lars', None),
        'Benedict': ('Benedict', None),  # Duplikat von Benedict Anton?
        'Per Oskar': ('Per Oskar', None),  # Duplikat von Lundgren
        'Michael': ('Michael', None),
        'Leandro': ('Leandro', None),  # Duplikat von Polo Morawietz
        'Ludwig': ('Ludwig', None),
        'Julius': ('Julius', None),  # Duplikat von Renner?
        'Kevin': ('Kevin', None),  # Angestellter
        'Jacob': ('Jacob', None),
        'Max': ('Max', None),  # Systemadmin
        'Florian D.': ('Florian D.', None),
        'Simeon': ('Simeon', None),
        'Friedrich G.': ('Friedrich G.', None),
        'Johannes': ('Johannes', None),  # Duplikat von Bauer
        'Tilio': ('Tilio', None),
        'John': ('John', None),
        'Florian S.': ('Florian S.', None),
        'Theo': ('Theo', None),  # Duplikat von Reichert - löschen!
        'Jannik': ('Jannik', None),  # Duplikat von Heideprim
        'Frederik': ('Frederik', None),
        'Falco': ('Falco', None),
        'Nicolas': ('Nicolas', None),
        'Friedrich S.': ('Friedrich S.', None),
        'Maxime': ('Maxime', None),
        'Constantin': ('Constantin', None),
        
        # Already correct entries (surname is already set correctly)
        'Bauer': ('Johannes', 'Bauer'),
        'Dreizler': ('Florian', 'Dreizler'),
        'Kalla': ('Elias', 'Kalla'),
        'Lundgren': ('Per Oskar', 'Lundgren'),
        'Polo Morawietz': ('Leandro', 'Polo Morawietz'),
        'Heideprim': ('Jannik', 'Heideprim'),
        'Reichert': ('Theo', 'Reichert'),
        'Anton': ('Benedict', 'Anton'),
    }
    
    # Duplicates to delete (entries where first name is in surname and proper entry exists)
    duplicates_to_delete = []
    
    for member in members:
        current_surname = member.get('surname', '')
        current_first = member.get('first_name')
        member_id = member.get('id')
        
        # Check if this is a duplicate (e.g., "Theo" when "Reichert" with first_name="Theo" exists)
        proper_entries = ['Bauer', 'Dreizler', 'Kalla', 'Lundgren', 'Polo Morawietz', 'Heideprim', 'Reichert', 'Anton']
        first_name_only = ['Johannes', 'Florian D.', 'Elias', 'Per Oskar', 'Leandro', 'Jannik', 'Theo', 'Benedict']
        
        if current_surname in first_name_only:
            # Check if a proper entry exists
            matching_proper = [m for m in members if m.get('first_name') == current_surname and m.get('surname') in proper_entries]
            if matching_proper:
                print(f"  🗑️ Duplikat gefunden: ID {member_id} ('{current_surname}') - Proper entry exists with surname, diese löschen?")
                duplicates_to_delete.append(member_id)
                continue
        
        # Update entry if we have a correction
        if current_surname in corrections:
            first, last = corrections[current_surname]
            
            # Check if update is needed
            needs_update = False
            update_data = {}
            
            if current_first != first:
                update_data['first_name'] = first
                needs_update = True
            
            # Only update surname if we have a proper surname AND the current one is different
            # (Don't overwrite proper surnames with None)
            if last and current_surname != last:
                update_data['surname'] = last
                needs_update = True
            
            if needs_update:
                print(f"  ✏️ Update ID {member_id}: '{current_surname}' -> first='{first}', surname='{last or current_surname}'")
                result = supabase_request(f'allowed_members?id=eq.{member_id}', method='PATCH', data=update_data)
                if result:
                    print(f"     ✅ Erfolgreich!")
            else:
                print(f"  ✓ ID {member_id}: '{current_surname}' bereits korrekt")
    
    # Report duplicates
    if duplicates_to_delete:
        print(f"\n⚠️ {len(duplicates_to_delete)} Duplikate gefunden:")
        for mid in duplicates_to_delete:
            print(f"   - {mid}")
        print("\n   Zum Löschen: delete_duplicates()")
    
    # Show final state
    print("\n" + "=" * 80)
    print("📋 FINALE TABELLE:")
    list_members()


def delete_duplicates():
    """Delete duplicate entries that are just first names"""
    # IDs of entries to delete (first names that have proper surname entries)
    duplicate_ids = [
        '8e9cac6c-e19b-48c7-a9d8-fed59fe99fab',  # 'Theo' (Reichert/Theo exists)
        '76bdd0f9-fa1e-4e98-a66e-5f5ad13b0398',  # 'Johannes' (Bauer/Johannes exists)
        '8f2f7f01-aa4e-4a46-ad1d-a488abd1893d',  # 'Jannik' (Heideprim/Jannik exists)
        '21eede0b-316e-44ef-a1bf-a4afc3077a60',  # 'Per Oskar' (Lundgren/Per Oskar exists)
        '1ecb0e31-bc35-465b-9099-9ce7e66daa69',  # 'Benedict' (Anton/Benedict exists)
        '361efad1-7521-4c8f-a9be-5008ed2bf72f',  # 'Leandro' (Polo Morawietz/Leandro exists)
    ]
    
    print("🗑️ Lösche Duplikate...")
    for mid in duplicate_ids:
        result = supabase_request(f'allowed_members?id=eq.{mid}', method='DELETE')
        print(f"   Deleted {mid}")
    
    print("\n✅ Duplikate gelöscht!")
    list_members()


def sync_members_with_official_list():
    """
    Sync the database with the official member list.
    This will:
    1. Add member_type column if needed
    2. Update existing members with correct data
    3. Add missing members
    4. Delete incorrect/duplicate entries
    """
    
    # Official member list from user
    OFFICIAL_MEMBERS = {
        # Inaktive Burschen (8)
        'inaktiv': [
            ('Constantin', 'Lehmann'),
            ('Maxime', 'Rambaud'),
            ('Frederik', 'Schulze'),
            ('Simeon', 'Liesenfeld'),
            ('Nicolas', 'Mehwald'),
            ('Tilio', 'Schulze'),  # Note: Same surname as Frederik - need to handle
            ('Simon', 'Walter'),
            ('Friedrich', 'Schälicke'),
        ],
        # Aktive Burschen (8)
        'bursche': [
            ('Jacob', 'Blasco'),
            ('Lorant', 'Csöke'),
            ('Michael', 'Lippert'),
            ('Falco', 'Meister'),
            ('Julius', 'Renner'),
            ('Florian', 'Stolz'),
            ('Lars', 'Mildenberger'),
            ('Max', 'Pallasch'),
        ],
        # Füxe (9)
        'fux': [
            ('Johannes', 'Bauer'),
            ('Florian', 'Dreizler'),
            ('Theo', 'Reichert'),
            ('Oskar', 'Lundgren'),
            ('Leandro', 'Polo Morawietz'),
            ('Benedict', 'Anton'),
            ('Jannik', 'Heidepriem'),
            ('Elias', 'Kalla'),
            ('Marko', 'Nedliko'),
        ],
        # Angestellte (kein Mitglied)
        'employee': [
            ('Kevin', None),
        ],
    }
    
    print("\n" + "=" * 80)
    print("🔄 SYNC MIT OFFIZIELLER MITGLIEDERLISTE")
    print("=" * 80)
    
    # Get current members
    current_members = supabase_request('allowed_members?select=*&order=id')
    if not current_members:
        print("❌ Konnte aktuelle Mitglieder nicht laden")
        return
    
    print(f"\n📊 Aktuelle DB: {len(current_members)} Einträge")
    
    # Build lookup by surname (lowercase for matching)
    current_by_surname = {}
    current_by_firstname = {}
    for m in current_members:
        surname = (m.get('surname') or '').lower()
        firstname = (m.get('first_name') or '').lower()
        if surname:
            # Handle cases where surname might have multiple matches
            if surname not in current_by_surname:
                current_by_surname[surname] = []
            current_by_surname[surname].append(m)
        if firstname:
            if firstname not in current_by_firstname:
                current_by_firstname[firstname] = []
            current_by_firstname[firstname].append(m)
    
    # Track what we find
    to_update = []
    to_insert = []
    to_delete_ids = set()
    matched_ids = set()
    
    # Build flat list of all official members
    all_official = []
    for member_type, members in OFFICIAL_MEMBERS.items():
        for first, last in members:
            all_official.append((first, last, member_type))
    
    print(f"📋 Offizielle Liste: {len(all_official)} Mitglieder")
    print("   - Inaktiv: 8, Aktiv: 8, Füxe: 9, Angestellte: 1")
    
    print("\n🔍 Vergleiche Einträge...\n")
    
    def find_best_match(first_name, surname, current_members, matched_ids):
        """Find the best matching entry in the database"""
        surname_lower = (surname or '').lower()
        first_lower = (first_name or '').lower()
        
        candidates = []
        
        # 1. Exact surname match
        if surname_lower and surname_lower in current_by_surname:
            for m in current_by_surname[surname_lower]:
                if m['id'] not in matched_ids:
                    score = 100
                    # Bonus for matching first name
                    m_first = (m.get('first_name') or '').lower()
                    if m_first == first_lower:
                        score += 50
                    elif first_lower in m_first or m_first in first_lower:
                        score += 25
                    candidates.append((score, m))
        
        # 2. First name only match (for Kevin, etc.)
        if not candidates and first_lower in current_by_firstname:
            for m in current_by_firstname[first_lower]:
                if m['id'] not in matched_ids:
                    candidates.append((50, m))
        
        # 3. Partial matches (e.g., "Heideprim" vs "Heidepriem")
        if not candidates and surname_lower:
            for key, members in current_by_surname.items():
                # Check if surnames are similar (within 2 chars difference)
                if abs(len(key) - len(surname_lower)) <= 2:
                    # Check for partial match
                    if (key.startswith(surname_lower[:4]) or 
                        surname_lower.startswith(key[:4])):
                        for m in members:
                            if m['id'] not in matched_ids:
                                candidates.append((30, m))
        
        if candidates:
            candidates.sort(key=lambda x: -x[0])  # Sort by score descending
            return candidates[0][1]
        return None
    
    for first_name, surname, member_type in all_official:
        found = find_best_match(first_name, surname, current_members, matched_ids)
        
        if found:
            matched_ids.add(found['id'])
            
            # Check if update needed
            needs_update = False
            update_data = {}
            
            current_first = found.get('first_name') or ''
            current_surname = found.get('surname') or ''
            current_type = found.get('member_type')
            
            if current_first != first_name:
                update_data['first_name'] = first_name
                needs_update = True
            if surname and current_surname != surname:
                update_data['surname'] = surname
                needs_update = True
            if current_type != member_type:
                update_data['member_type'] = member_type
                needs_update = True
            
            if needs_update:
                to_update.append((found['id'], found, update_data, f"{first_name} {surname or ''}"))
                changes = []
                if 'first_name' in update_data:
                    changes.append(f"first: {current_first}→{first_name}")
                if 'surname' in update_data:
                    changes.append(f"surname: {current_surname}→{surname}")
                if 'member_type' in update_data:
                    changes.append(f"type: {current_type}→{member_type}")
                print(f"  ✏️ UPDATE {found['id'][:8]}...: {', '.join(changes)}")
            else:
                print(f"  ✓ OK: {first_name} {surname or ''} ({member_type})")
        else:
            # Need to insert
            to_insert.append((first_name, surname, member_type))
            print(f"  ➕ INSERT: {first_name} {surname or ''} ({member_type})")
    
    # Find entries not in official list (to delete)
    to_delete = []
    for m in current_members:
        if m['id'] not in matched_ids:
            to_delete.append(m)
            print(f"  🗑️ DELETE: {m.get('first_name')} {m.get('surname')} (ID: {m['id'][:8]}...)")
    
    print("\n" + "-" * 80)
    print(f"📊 ZUSAMMENFASSUNG:")
    print(f"   ✓ OK: {len(matched_ids) - len(to_update)}")
    print(f"   ✏️ Updates: {len(to_update)}")
    print(f"   ➕ Neu: {len(to_insert)}")
    print(f"   🗑️ Löschen: {len(to_delete)}")
    
    # Store for later execution
    global pending_updates, pending_inserts, pending_deletes
    pending_updates = to_update
    pending_inserts = to_insert
    pending_deletes = to_delete
    
    print("\n⚠️ Zum Ausführen: apply_sync_changes()")
    return to_update, to_insert, to_delete


def apply_sync_changes():
    """Apply the pending sync changes"""
    global pending_updates, pending_inserts, pending_deletes
    
    print("\n🚀 Führe Änderungen durch...\n")
    
    # Apply updates
    for member_id, old_data, update_data, name in pending_updates:
        result = supabase_request(f'allowed_members?id=eq.{member_id}', method='PATCH', data=update_data)
        if result is not None:
            print(f"  ✅ Updated: {name}")
        else:
            print(f"  ❌ Failed to update: {name}")
    
    # Apply inserts
    for first_name, surname, member_type in pending_inserts:
        data = {
            'first_name': first_name,
            'surname': surname,
            'member_type': member_type
        }
        result = supabase_request('allowed_members', method='POST', data=data)
        if result:
            print(f"  ✅ Inserted: {first_name} {surname or ''}")
        else:
            print(f"  ❌ Failed to insert: {first_name} {surname or ''}")
    
    # Apply deletes
    for m in pending_deletes:
        result = supabase_request(f"allowed_members?id=eq.{m['id']}", method='DELETE')
        print(f"  ✅ Deleted: {m.get('first_name')} {m.get('surname')}")
    
    print("\n✅ Sync abgeschlossen!")
    print("\n📋 Finale Mitgliederliste:")
    list_members()


# Initialize pending changes
pending_updates = []
pending_inserts = []
pending_deletes = []