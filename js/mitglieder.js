/**
 * KB! Teutonia - Mitgliederbereich v2.0
 * Complete rewrite with role-based system, KW meals, and detailed event management
 */

// ============================================
// Configuration
// ============================================
const SUPABASE_URL = 'https://hhxpvlfnovtigamqvjhb.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhoeHB2bGZub3Z0aWdhbXF2amhiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMDU5ODMsImV4cCI6MjA4MDc4MTk4M30.6t8g8DD23awiX4fcBWZ_Ch1ntHJ1wfHGtF_HB6NenDE';
const SESSION_KEY = 'teutonia_member_session';

// Role definitions
const ROLES = {
    systemadmin: { label: '👑 Systemadmin', color: '#D4AF37', permissions: ['all'] },
    admin: { label: '👑 Administrator', color: '#D4AF37', permissions: ['all'] },
    veranstaltungsleiter: { label: '📅 Veranstaltungsleiter', color: '#3498db', permissions: ['events'] },
    koch: { label: '👨‍🍳 Koch', color: '#27ae60', permissions: ['meals'] },
    member: { label: 'Aktiver Bursche', color: '#8B0000', permissions: ['signup'] },
    inactive: { label: 'Inaktiv', color: '#7f8c8d', permissions: ['view'] }
};

// Sample events data (will be replaced with Supabase data when RLS allows)
const SAMPLE_EVENTS = [
    {
        id: 'huette',
        title: 'Hüttenwochenende',
        emoji: '🎿',
        date: '2024-11-29',
        end_date: '2024-12-01',
        time: null,
        meeting_time: '17:00',
        location: 'Schwarzwaldhütte',
        description: 'Unser jährliches Hüttenwochenende in den Bergen'
    },
    {
        id: 'grillen',
        title: 'Chilenisches Grillen',
        emoji: '🍖',
        date: '2024-12-07',
        time: '19:00',
        meeting_time: '18:30',
        location: 'Auf dem Haus',
        description: 'Traditionelles Grillfest'
    },
    {
        id: 'ankneipe',
        title: 'Ankneipe',
        emoji: '🍺',
        date: '2024-12-14',
        time: '20:00',
        meeting_time: '19:30',
        location: 'Auf dem Haus',
        description: 'Offizielle Ankneipe'
    },
    {
        id: 'blauer-salon',
        title: 'Blauer Salon',
        emoji: '🎩',
        date: '2024-12-20',
        time: '20:00',
        meeting_time: '19:00',
        location: 'Auf dem Haus',
        description: 'Festlicher Abend'
    },
    {
        id: 'burschentag',
        title: 'Burschentag',
        emoji: '📜',
        date: '2025-01-11',
        time: '14:00',
        meeting_time: '13:30',
        location: 'Auf dem Haus',
        description: 'Offizieller Burschentag'
    },
    {
        id: 'teutonentour',
        title: 'Teutonentour',
        emoji: '🚌',
        date: '2025-02-15',
        time: '09:00',
        meeting_time: '08:30',
        location: 'Vor dem Haus',
        description: 'Jahrestour der Teutonia'
    }
];

// Special user role overrides (since Supabase only allows 'admin' and 'member')
// Map specific users to special roles
const SPECIAL_ROLES = {
    'Theo': 'systemadmin',      // Systemadmin
    'Kevin': 'koch'              // Koch - Kevin Becker
    // Add more special roles as needed:
    // 'Name': 'veranstaltungsleiter',
};

// Function to get effective role for a user
function getEffectiveRole(user) {
    // Check if user has a special role override
    if (SPECIAL_ROLES[user.surname]) {
        return SPECIAL_ROLES[user.surname];
    }
    return user.role;
}

// State
let currentUser = null;
let members = [];
let currentKW = getWeekNumber(new Date());
let currentYear = new Date().getFullYear();
let selectedEventId = null;

// ============================================
// Utility Functions
// ============================================

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getDateOfWeek(week, year, dayOfWeek) {
    const simple = new Date(year, 0, 1 + (week - 1) * 7);
    const dow = simple.getDay();
    const ISOweekStart = simple;
    if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    ISOweekStart.setDate(ISOweekStart.getDate() + dayOfWeek);
    return ISOweekStart;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' });
}

function formatDateLong(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}

const WEEKDAYS = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

// ============================================
// API Functions
// ============================================

async function supabaseRequest(endpoint, options = {}) {
    const url = `${SUPABASE_URL}/rest/v1/${endpoint}`;
    const headers = {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': options.prefer || 'return=representation'
    };

    try {
        const response = await fetch(url, {
            method: options.method || 'GET',
            headers,
            body: options.body ? JSON.stringify(options.body) : undefined
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Supabase request failed:', error);
        throw error;
    }
}

// ============================================
// Session Management
// ============================================

function saveSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

function loadSession() {
    const data = localStorage.getItem(SESSION_KEY);
    return data ? JSON.parse(data) : null;
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// ============================================
// Permission Checks
// ============================================

function hasPermission(permission) {
    if (!currentUser) return false;
    const effectiveRole = getEffectiveRole(currentUser);
    const role = ROLES[effectiveRole] || ROLES.member;
    return role.permissions.includes('all') || role.permissions.includes(permission);
}

function isAdmin() {
    if (!currentUser) return false;
    const effectiveRole = getEffectiveRole(currentUser);
    return effectiveRole === 'admin' || effectiveRole === 'systemadmin';
}

function isVA() {
    if (!currentUser) return false;
    const effectiveRole = getEffectiveRole(currentUser);
    return effectiveRole === 'veranstaltungsleiter' || isAdmin();
}

function isKoch() {
    if (!currentUser) return false;
    const effectiveRole = getEffectiveRole(currentUser);
    return effectiveRole === 'koch' || isAdmin();
}

// ============================================
// UI Functions
// ============================================

function showLogin() {
    document.getElementById('login-section').classList.remove('member-login-page--hidden');
    document.getElementById('dashboard-section').classList.add('member-dashboard--hidden');
}

function showDashboard() {
    document.getElementById('login-section').classList.add('member-login-page--hidden');
    document.getElementById('dashboard-section').classList.remove('member-dashboard--hidden');

    // Update user info
    document.getElementById('user-name').textContent = currentUser.surname;
    document.getElementById('user-avatar').textContent = currentUser.surname.charAt(0).toUpperCase();

    // Use effective role for display
    const effectiveRole = getEffectiveRole(currentUser);
    const roleInfo = ROLES[effectiveRole] || ROLES.member;
    const roleBadge = document.getElementById('user-role-badge');
    roleBadge.textContent = roleInfo.label;
    roleBadge.style.backgroundColor = roleInfo.color;


    // Show/hide admin elements
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = isAdmin() ? '' : 'none';
    });

    document.querySelectorAll('.va-only').forEach(el => {
        el.style.display = isVA() ? '' : 'none';
    });

    document.querySelectorAll('.koch-only').forEach(el => {
        el.style.display = isKoch() ? '' : 'none';
    });

    // Load data
    loadEvents();
    loadMeals();
    if (isAdmin()) {
        loadMembers();
    }
}

function showError(message, isInfo = false) {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = message;
    errorEl.className = 'member-login-card__error ' + (isInfo ? 'member-login-card__error--info' : 'member-login-card__error--error');
    errorEl.style.display = 'block';
}

function hideError() {
    document.getElementById('login-error').style.display = 'none';
}

// ============================================
// Tab Navigation
// ============================================

function initTabs() {
    document.querySelectorAll('.dashboard-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;

            // Update active tab
            document.querySelectorAll('.dashboard-tab').forEach(t => t.classList.remove('dashboard-tab--active'));
            tab.classList.add('dashboard-tab--active');

            // Update active panel
            document.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('dashboard-panel--active'));
            document.getElementById(`panel-${tabId}`).classList.add('dashboard-panel--active');
        });
    });
}

// ============================================
// Events System
// ============================================

function loadEvents() {
    const tabsContainer = document.getElementById('events-tabs');
    const contentContainer = document.getElementById('events-content');

    // For now, use sample events (in production, fetch from Supabase)
    const events = SAMPLE_EVENTS;

    // Create event tabs
    tabsContainer.innerHTML = events.map((event, index) => `
        <button class="event-tab ${index === 0 ? 'event-tab--active' : ''}" data-event-id="${event.id}">
            <span class="event-tab__emoji">${event.emoji}</span>
            <span class="event-tab__name">${event.title}</span>
            <span class="event-tab__date">${formatDate(event.date)}</span>
        </button>
    `).join('');

    // Add click handlers
    tabsContainer.querySelectorAll('.event-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.event-tab').forEach(t => t.classList.remove('event-tab--active'));
            tab.classList.add('event-tab--active');
            renderEventDetail(events.find(e => e.id === tab.dataset.eventId));
        });
    });

    // Render first event
    if (events.length > 0) {
        renderEventDetail(events[0]);
    } else {
        contentContainer.innerHTML = '<div class="empty-state">Keine Veranstaltungen geplant</div>';
    }
}

function renderEventDetail(event) {
    selectedEventId = event.id;
    const container = document.getElementById('events-content');

    // Get member registrations (simulated for now)
    const registrations = getEventRegistrations(event.id);

    container.innerHTML = `
        <div class="event-detail">
            <div class="event-detail__header">
                <div class="event-detail__emoji">${event.emoji}</div>
                <div class="event-detail__info">
                    <h3 class="event-detail__title">${event.title}</h3>
                    <p class="event-detail__description">${event.description || ''}</p>
                </div>
                ${isVA() ? `
                    <button class="event-detail__edit" onclick="editEvent('${event.id}')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                ` : ''}
            </div>
            
            <div class="event-detail__meta">
                <div class="event-meta-item">
                    <span class="event-meta-item__icon">📅</span>
                    <span class="event-meta-item__label">Datum</span>
                    <span class="event-meta-item__value">${formatDateLong(event.date)}${event.end_date ? ' - ' + formatDate(event.end_date) : ''}</span>
                </div>
                ${event.time ? `
                    <div class="event-meta-item">
                        <span class="event-meta-item__icon">🕐</span>
                        <span class="event-meta-item__label">Uhrzeit</span>
                        <span class="event-meta-item__value">${event.time} Uhr</span>
                    </div>
                ` : ''}
                ${event.meeting_time ? `
                    <div class="event-meta-item">
                        <span class="event-meta-item__icon">⏰</span>
                        <span class="event-meta-item__label">Treffpunkt</span>
                        <span class="event-meta-item__value">${event.meeting_time} Uhr</span>
                    </div>
                ` : ''}
                <div class="event-meta-item">
                    <span class="event-meta-item__icon">📍</span>
                    <span class="event-meta-item__label">Ort</span>
                    <span class="event-meta-item__value">${event.location}</span>
                </div>
            </div>
            
            <div class="event-detail__signup">
                <h4 class="event-detail__signup-title">Deine Anmeldung</h4>
                <div class="signup-buttons">
                    <button class="signup-btn signup-btn--yes ${registrations[currentUser?.id]?.attendance === 'ja' ? 'signup-btn--active' : ''}" 
                            onclick="registerForEvent('${event.id}', 'ja')">
                        <span class="signup-btn__icon">✅</span>
                        <span>Ja</span>
                    </button>
                    <button class="signup-btn signup-btn--no ${registrations[currentUser?.id]?.attendance === 'nein' ? 'signup-btn--active' : ''}"
                            onclick="registerForEvent('${event.id}', 'nein')">
                        <span class="signup-btn__icon">❌</span>
                        <span>Nein</span>
                    </button>
                    <button class="signup-btn signup-btn--maybe ${registrations[currentUser?.id]?.attendance === 'vielleicht' ? 'signup-btn--active' : ''}"
                            onclick="registerForEvent('${event.id}', 'vielleicht')">
                        <span class="signup-btn__icon">🤔</span>
                        <span>Vielleicht</span>
                    </button>
                </div>
                
                <div class="signup-options">
                    <label class="signup-option">
                        <input type="checkbox" id="comes-later" ${registrations[currentUser?.id]?.comes_later ? 'checked' : ''} 
                               onchange="updateEventOptions('${event.id}')">
                        <span>🕐 Ich komme später</span>
                    </label>
                    <label class="signup-option">
                        <input type="checkbox" id="leaves-early" ${registrations[currentUser?.id]?.leaves_early ? 'checked' : ''}
                               onchange="updateEventOptions('${event.id}')">
                        <span>🚶 Ich gehe früher</span>
                    </label>
                    <label class="signup-option">
                        <input type="checkbox" id="drives-there" ${registrations[currentUser?.id]?.drives_there ? 'checked' : ''}
                               onchange="updateEventOptions('${event.id}')">
                        <span>🚗 Fahre hin (Plätze frei)</span>
                    </label>
                    <label class="signup-option">
                        <input type="checkbox" id="drives-back" ${registrations[currentUser?.id]?.drives_back ? 'checked' : ''}
                               onchange="updateEventOptions('${event.id}')">
                        <span>🚗 Fahre zurück (Plätze frei)</span>
                    </label>
                </div>
            </div>
            
            <div class="event-detail__attendees">
                <h4 class="event-detail__attendees-title">Anmeldungen</h4>
                <div class="attendees-summary">
                    <div class="attendees-count attendees-count--yes">
                        <span class="attendees-count__num">${countRegistrations(registrations, 'ja')}</span>
                        <span class="attendees-count__label">Zusagen</span>
                    </div>
                    <div class="attendees-count attendees-count--maybe">
                        <span class="attendees-count__num">${countRegistrations(registrations, 'vielleicht')}</span>
                        <span class="attendees-count__label">Vielleicht</span>
                    </div>
                    <div class="attendees-count attendees-count--no">
                        <span class="attendees-count__num">${countRegistrations(registrations, 'nein')}</span>
                        <span class="attendees-count__label">Absagen</span>
                    </div>
                </div>
                <div class="attendees-list">
                    ${renderAttendeesList(registrations)}
                </div>
            </div>
        </div>
    `;
}

function getEventRegistrations(eventId) {
    // Load from localStorage for now (in production, from Supabase)
    const key = `event_reg_${eventId}`;
    const data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    }

    // Generate default registrations based on active/inactive status
    const regs = {};
    members.forEach(m => {
        // Active members default to "ja", inactive to "nein"
        // For now, treat all as active since we don't have status field
        regs[m.id] = {
            attendance: m.role === 'inactive' ? 'nein' : 'ja',
            comes_later: false,
            leaves_early: false,
            drives_there: false,
            drives_back: false
        };
    });
    return regs;
}

function countRegistrations(regs, status) {
    return Object.values(regs).filter(r => r.attendance === status).length;
}

function renderAttendeesList(registrations) {
    const jaList = [];
    const vielleichtList = [];
    const neinList = [];

    members.forEach(m => {
        const reg = registrations[m.id];
        if (!reg) return;

        const extras = [];
        if (reg.comes_later) extras.push('🕐');
        if (reg.leaves_early) extras.push('🚶');
        if (reg.drives_there) extras.push('🚗→');
        if (reg.drives_back) extras.push('🚗←');

        const entry = `<span class="attendee">${m.surname} ${extras.join(' ')}</span>`;

        if (reg.attendance === 'ja') jaList.push(entry);
        else if (reg.attendance === 'vielleicht') vielleichtList.push(entry);
        else if (reg.attendance === 'nein') neinList.push(entry);
    });

    return `
        ${jaList.length > 0 ? `<div class="attendees-group attendees-group--yes"><strong>✅ Ja:</strong> ${jaList.join(', ')}</div>` : ''}
        ${vielleichtList.length > 0 ? `<div class="attendees-group attendees-group--maybe"><strong>🤔 Vielleicht:</strong> ${vielleichtList.join(', ')}</div>` : ''}
        ${neinList.length > 0 ? `<div class="attendees-group attendees-group--no"><strong>❌ Nein:</strong> ${neinList.join(', ')}</div>` : ''}
    `;
}

function registerForEvent(eventId, status) {
    const key = `event_reg_${eventId}`;
    const regs = getEventRegistrations(eventId);

    if (!regs[currentUser.id]) {
        regs[currentUser.id] = {};
    }
    regs[currentUser.id].attendance = status;

    localStorage.setItem(key, JSON.stringify(regs));
    renderEventDetail(SAMPLE_EVENTS.find(e => e.id === eventId));
}

function updateEventOptions(eventId) {
    const key = `event_reg_${eventId}`;
    const regs = getEventRegistrations(eventId);

    if (!regs[currentUser.id]) {
        regs[currentUser.id] = { attendance: 'ja' };
    }

    regs[currentUser.id].comes_later = document.getElementById('comes-later')?.checked || false;
    regs[currentUser.id].leaves_early = document.getElementById('leaves-early')?.checked || false;
    regs[currentUser.id].drives_there = document.getElementById('drives-there')?.checked || false;
    regs[currentUser.id].drives_back = document.getElementById('drives-back')?.checked || false;

    localStorage.setItem(key, JSON.stringify(regs));
}

// ============================================
// Meals System (KW-based)
// ============================================

function loadMeals() {
    updateKWDisplay();
    renderMealsWeek();
}

function updateKWDisplay() {
    document.getElementById('current-kw').textContent = `KW ${currentKW}`;
}

function renderMealsWeek() {
    const container = document.getElementById('meals-week');

    // Get meals for current KW from localStorage (in production from Supabase)
    const mealsKey = `meals_${currentYear}_${currentKW}`;
    const mealsData = JSON.parse(localStorage.getItem(mealsKey) || '{}');

    let html = '<div class="meals-grid">';

    for (let i = 0; i < 5; i++) {
        const dayDate = getDateOfWeek(currentKW, currentYear, i);
        const dateStr = dayDate.toISOString().split('T')[0];
        const dayMeal = mealsData[i] || {};
        const signupsKey = `meal_signups_${currentYear}_${currentKW}_${i}`;
        const signups = JSON.parse(localStorage.getItem(signupsKey) || '{}');

        html += `
            <div class="meal-day-card">
                <div class="meal-day-card__header">
                    <div class="meal-day-card__day">${WEEKDAYS[i]}</div>
                    <div class="meal-day-card__date">${formatDate(dateStr)}</div>
                </div>
                
                <div class="meal-day-card__menu">
                    ${dayMeal.vorspeise ? `<div class="meal-course meal-course--starter"><span class="meal-course__icon">🥗</span><span class="meal-course__name">${dayMeal.vorspeise}</span></div>` : ''}
                    ${dayMeal.hauptgericht ? `<div class="meal-course meal-course--main"><span class="meal-course__icon">🍽️</span><span class="meal-course__name">${dayMeal.hauptgericht}</span></div>` : '<div class="meal-course meal-course--empty">Noch kein Menü eingetragen</div>'}
                    ${dayMeal.nachspeise ? `<div class="meal-course meal-course--dessert"><span class="meal-course__icon">🍰</span><span class="meal-course__name">${dayMeal.nachspeise}</span></div>` : ''}
                </div>
                
                ${dayMeal.kochteam ? `<div class="meal-day-card__team">👨‍🍳 ${dayMeal.kochteam}</div>` : ''}
                
                ${isKoch() ? `
                    <button class="meal-day-card__edit" onclick="editMeal(${currentKW}, ${i})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                ` : ''}
                
                <div class="meal-day-card__signup">
                    <div class="meal-signup-title">Deine Anmeldung:</div>
                    <div class="meal-signup-buttons">
                        <button class="meal-signup-btn ${signups[currentUser?.id] === 'aktiv' ? 'meal-signup-btn--active' : ''}" 
                                onclick="signupForMeal(${currentKW}, ${i}, 'aktiv')">
                            <span>Aktiv</span>
                            <span class="meal-signup-btn__price">3€</span>
                        </button>
                        <button class="meal-signup-btn ${signups[currentUser?.id] === 'spaeter' ? 'meal-signup-btn--active' : ''}"
                                onclick="signupForMeal(${currentKW}, ${i}, 'spaeter')">
                            <span>Später</span>
                            <span class="meal-signup-btn__price">6€</span>
                        </button>
                        <button class="meal-signup-btn ${signups[currentUser?.id] === 'gast' ? 'meal-signup-btn--active' : ''}"
                                onclick="signupForMeal(${currentKW}, ${i}, 'gast')">
                            <span>Gast</span>
                            <span class="meal-signup-btn__price">3€</span>
                        </button>
                        <button class="meal-signup-btn ${signups[currentUser?.id] === 'reste' ? 'meal-signup-btn--active' : ''}"
                                onclick="signupForMeal(${currentKW}, ${i}, 'reste')">
                            <span>Reste</span>
                            <span class="meal-signup-btn__price">2.50€</span>
                        </button>
                    </div>
                    ${signups[currentUser?.id] ? `<button class="meal-cancel-btn" onclick="cancelMealSignup(${currentKW}, ${i})">Abmelden</button>` : ''}
                </div>
                
                <div class="meal-day-card__signups-summary">
                    <span class="signups-count">${Object.keys(signups).length} angemeldet</span>
                    ${isAdmin() || isKoch() ? `<button class="signups-detail-btn" onclick="showMealSignups(${currentKW}, ${i})">Details</button>` : ''}
                </div>
            </div>
        `;
    }

    html += '</div>';
    container.innerHTML = html;
}

function signupForMeal(kw, dayIndex, type) {
    const signupsKey = `meal_signups_${currentYear}_${kw}_${dayIndex}`;
    const signups = JSON.parse(localStorage.getItem(signupsKey) || '{}');
    signups[currentUser.id] = type;
    localStorage.setItem(signupsKey, JSON.stringify(signups));
    renderMealsWeek();
}

function cancelMealSignup(kw, dayIndex) {
    const signupsKey = `meal_signups_${currentYear}_${kw}_${dayIndex}`;
    const signups = JSON.parse(localStorage.getItem(signupsKey) || '{}');
    delete signups[currentUser.id];
    localStorage.setItem(signupsKey, JSON.stringify(signups));
    renderMealsWeek();
}

function editMeal(kw, dayIndex) {
    const mealsKey = `meals_${currentYear}_${kw}`;
    const mealsData = JSON.parse(localStorage.getItem(mealsKey) || '{}');
    const dayMeal = mealsData[dayIndex] || {};

    openModal('Essen bearbeiten - ' + WEEKDAYS[dayIndex], `
        <form id="meal-form" class="modal-form">
            <div class="form-field">
                <label class="form-field__label">Vorspeise (optional)</label>
                <input type="text" class="form-field__input" id="meal-vorspeise" value="${dayMeal.vorspeise || ''}" placeholder="z.B. Salat">
            </div>
            <div class="form-field">
                <label class="form-field__label">Hauptgericht</label>
                <input type="text" class="form-field__input" id="meal-hauptgericht" value="${dayMeal.hauptgericht || ''}" placeholder="z.B. Schnitzel mit Pommes" required>
            </div>
            <div class="form-field">
                <label class="form-field__label">Nachspeise (optional)</label>
                <input type="text" class="form-field__input" id="meal-nachspeise" value="${dayMeal.nachspeise || ''}" placeholder="z.B. Tiramisu">
            </div>
            <div class="form-field">
                <label class="form-field__label">Kochteam</label>
                <input type="text" class="form-field__input" id="meal-kochteam" value="${dayMeal.kochteam || ''}" placeholder="z.B. Max, Julius">
            </div>
            <button type="submit" class="modal-submit">Speichern</button>
        </form>
    `);

    document.getElementById('meal-form').onsubmit = (e) => {
        e.preventDefault();
        mealsData[dayIndex] = {
            vorspeise: document.getElementById('meal-vorspeise').value,
            hauptgericht: document.getElementById('meal-hauptgericht').value,
            nachspeise: document.getElementById('meal-nachspeise').value,
            kochteam: document.getElementById('meal-kochteam').value
        };
        localStorage.setItem(mealsKey, JSON.stringify(mealsData));
        closeModal();
        renderMealsWeek();
    };
}

function showMealSignups(kw, dayIndex) {
    const signupsKey = `meal_signups_${currentYear}_${kw}_${dayIndex}`;
    const signups = JSON.parse(localStorage.getItem(signupsKey) || '{}');

    const grouped = { aktiv: [], spaeter: [], gast: [], reste: [] };
    Object.entries(signups).forEach(([memberId, type]) => {
        const member = members.find(m => m.id === memberId);
        if (member && grouped[type]) {
            grouped[type].push(member.surname);
        }
    });

    openModal('Anmeldungen - ' + WEEKDAYS[dayIndex], `
        <div class="signups-detail">
            <div class="signups-detail__group">
                <h4>Aktiv (3€)</h4>
                <p>${grouped.aktiv.length > 0 ? grouped.aktiv.join(', ') : 'Keine'}</p>
            </div>
            <div class="signups-detail__group">
                <h4>Später (6€)</h4>
                <p>${grouped.spaeter.length > 0 ? grouped.spaeter.join(', ') : 'Keine'}</p>
            </div>
            <div class="signups-detail__group">
                <h4>Gast (3€)</h4>
                <p>${grouped.gast.length > 0 ? grouped.gast.join(', ') : 'Keine'}</p>
            </div>
            <div class="signups-detail__group">
                <h4>Reste (2.50€)</h4>
                <p>${grouped.reste.length > 0 ? grouped.reste.join(', ') : 'Keine'}</p>
            </div>
            <div class="signups-detail__total">
                <strong>Gesamt: ${Object.keys(signups).length} Personen</strong>
            </div>
        </div>
    `);
}

// KW Navigation
document.getElementById('prev-kw')?.addEventListener('click', () => {
    currentKW = currentKW > 1 ? currentKW - 1 : 52;
    if (currentKW === 52) currentYear--;
    loadMeals();
});

document.getElementById('next-kw')?.addEventListener('click', () => {
    currentKW = currentKW < 52 ? currentKW + 1 : 1;
    if (currentKW === 1) currentYear++;
    loadMeals();
});

// ============================================
// Members System
// ============================================

async function loadMembers() {
    try {
        members = await supabaseRequest('allowed_members?select=*&order=surname');
        renderMembers();
    } catch (error) {
        console.error('Failed to load members:', error);
        document.getElementById('members-grid').innerHTML = '<div class="error-state">Fehler beim Laden der Mitglieder</div>';
    }
}

function renderMembers() {
    const container = document.getElementById('members-grid');

    const activeMembers = members.filter(m => m.role !== 'inactive');
    const inactiveMembers = members.filter(m => m.role === 'inactive');

    container.innerHTML = `
        <div class="members-section">
            <h3 class="members-section__title">Aktive Mitglieder (${activeMembers.length})</h3>
            <div class="members-list">
                ${activeMembers.map(m => renderMemberCard(m)).join('')}
            </div>
        </div>
        ${inactiveMembers.length > 0 ? `
            <div class="members-section">
                <h3 class="members-section__title">Inaktive (${inactiveMembers.length})</h3>
                <div class="members-list">
                    ${inactiveMembers.map(m => renderMemberCard(m)).join('')}
                </div>
            </div>
        ` : ''}
    `;
}

function renderMemberCard(member) {
    const roleInfo = ROLES[member.role] || ROLES.member;
    const isSelf = currentUser && member.id === currentUser.id;

    return `
        <div class="member-card-v2 ${isSelf ? 'member-card-v2--self' : ''}">
            <div class="member-card-v2__avatar" style="background: ${roleInfo.color}">
                ${member.surname.charAt(0).toUpperCase()}
            </div>
            <div class="member-card-v2__info">
                <span class="member-card-v2__name">${member.surname}</span>
                <span class="member-card-v2__role">${roleInfo.label}</span>
            </div>
            <div class="member-card-v2__status">
                ${member.password_hash ? '<span class="status-badge status-badge--active">✓</span>' : '<span class="status-badge status-badge--pending">⏳</span>'}
            </div>
            ${isAdmin() && !isSelf ? `
                <div class="member-card-v2__actions">
                    <button class="member-action-btn" onclick="changeMemberRole('${member.id}')" title="Rolle ändern">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="3"/>
                            <path d="M12 1v6m0 6v10"/>
                        </svg>
                    </button>
                    <button class="member-action-btn member-action-btn--danger" onclick="deleteMember('${member.id}')" title="Löschen">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6"/>
                            <path d="M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                        </svg>
                    </button>
                </div>
            ` : ''}
        </div>
    `;
}

function changeMemberRole(memberId) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    const roleOptions = Object.entries(ROLES).map(([key, val]) =>
        `<option value="${key}" ${member.role === key ? 'selected' : ''}>${val.label}</option>`
    ).join('');

    openModal('Rolle ändern - ' + member.surname, `
        <form id="role-form" class="modal-form">
            <div class="form-field">
                <label class="form-field__label">Rolle auswählen</label>
                <select class="form-field__input" id="new-role">
                    ${roleOptions}
                </select>
            </div>
            <button type="submit" class="modal-submit">Speichern</button>
        </form>
    `);

    document.getElementById('role-form').onsubmit = async (e) => {
        e.preventDefault();
        const newRole = document.getElementById('new-role').value;

        try {
            await supabaseRequest(`allowed_members?id=eq.${memberId}`, {
                method: 'PATCH',
                body: { role: newRole }
            });
            closeModal();
            loadMembers();
        } catch (error) {
            alert('Fehler beim Ändern der Rolle: ' + error.message);
        }
    };
}

// ============================================
// Modal System
// ============================================

function openModal(title, content) {
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-body').innerHTML = content;
    document.getElementById('modal').classList.add('modal-overlay--active');
}

function closeModal() {
    document.getElementById('modal').classList.remove('modal-overlay--active');
}

document.getElementById('modal-close')?.addEventListener('click', closeModal);
document.getElementById('modal-backdrop')?.addEventListener('click', closeModal);

// ============================================
// Login System
// ============================================

async function handleLogin(e) {
    e.preventDefault();
    hideError();

    const name = document.getElementById('login-name').value.trim();
    const password = document.getElementById('login-password').value;
    const newPassword = document.getElementById('new-password')?.value;
    const confirmPassword = document.getElementById('confirm-password')?.value;

    if (!name) {
        showError('Bitte gib deinen Namen ein');
        return;
    }

    try {
        // Find user
        const users = await supabaseRequest(`allowed_members?surname=ilike.${encodeURIComponent(name)}`);

        if (users.length === 0) {
            showError('Benutzer nicht gefunden. Bitte kontaktiere den Administrator.');
            return;
        }

        const user = users[0];

        // First-time login - set password
        if (!user.password_hash) {
            if (!newPassword) {
                // Show password fields
                document.getElementById('password-group').classList.add('form-field--hidden');
                document.getElementById('new-password-group').classList.remove('form-field--hidden');
                document.getElementById('confirm-password-group').classList.remove('form-field--hidden');
                document.getElementById('login-btn').querySelector('span').textContent = 'Passwort setzen';
                showError('Willkommen! Bitte erstelle ein Passwort für deinen Account.', true);
                return;
            }

            if (newPassword.length < 6) {
                showError('Das Passwort muss mindestens 6 Zeichen haben');
                return;
            }

            if (newPassword !== confirmPassword) {
                showError('Die Passwörter stimmen nicht überein');
                return;
            }

            // Set new password
            const hash = await sha256(newPassword);
            await supabaseRequest(`allowed_members?id=eq.${user.id}`, {
                method: 'PATCH',
                body: { password_hash: hash, last_login: new Date().toISOString() }
            });

            user.password_hash = hash;
        } else {
            // Verify password
            if (!password) {
                showError('Bitte gib dein Passwort ein');
                return;
            }

            const hash = await sha256(password);
            if (hash !== user.password_hash) {
                showError('Falsches Passwort');
                return;
            }

            // Update last login
            await supabaseRequest(`allowed_members?id=eq.${user.id}`, {
                method: 'PATCH',
                body: { last_login: new Date().toISOString() }
            });
        }

        // Success - save session and show dashboard
        currentUser = user;
        saveSession(user);

        // Load members first for event registrations
        members = await supabaseRequest('allowed_members?select=*&order=surname');

        showDashboard();

    } catch (error) {
        console.error('Login failed:', error);
        showError('Anmeldung fehlgeschlagen: ' + error.message);
    }
}

function handleLogout() {
    clearSession();
    currentUser = null;

    // Reset form
    document.getElementById('login-form').reset();
    document.getElementById('password-group').classList.remove('form-field--hidden');
    document.getElementById('new-password-group').classList.add('form-field--hidden');
    document.getElementById('confirm-password-group').classList.add('form-field--hidden');
    document.getElementById('login-btn').querySelector('span').textContent = 'Einloggen';

    showLogin();
}

// ============================================
// Initialization
// ============================================

async function init() {
    // Check for existing session
    const savedSession = loadSession();

    if (savedSession) {
        try {
            // Verify session is still valid
            const users = await supabaseRequest(`allowed_members?id=eq.${savedSession.id}`);
            if (users.length > 0) {
                currentUser = users[0];
                members = await supabaseRequest('allowed_members?select=*&order=surname');
                showDashboard();
            } else {
                clearSession();
                showLogin();
            }
        } catch (error) {
            console.error('Session validation failed:', error);
            showLogin();
        }
    } else {
        showLogin();
    }

    // Setup event listeners
    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);

    // Check for first-time login when name field blurs
    document.getElementById('login-name')?.addEventListener('blur', async (e) => {
        const name = e.target.value.trim();
        if (!name) return;

        try {
            const users = await supabaseRequest(`allowed_members?surname=ilike.${encodeURIComponent(name)}`);
            if (users.length > 0 && !users[0].password_hash) {
                document.getElementById('password-group').classList.add('form-field--hidden');
                document.getElementById('new-password-group').classList.remove('form-field--hidden');
                document.getElementById('confirm-password-group').classList.remove('form-field--hidden');
                document.getElementById('login-btn').querySelector('span').textContent = 'Passwort setzen';
                showError('Willkommen! Bitte erstelle ein Passwort für deinen Account.', true);
            }
        } catch (error) {
            console.error('User check failed:', error);
        }
    });

    // Initialize tabs
    initTabs();

    // Mark page as loaded
    document.body.classList.add('page-loaded');
}

// Start the app
document.addEventListener('DOMContentLoaded', init);
