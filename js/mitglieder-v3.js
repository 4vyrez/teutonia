/**
 * KB! Teutonia - Mitgliederbereich v5
 * Neon Database integration via Flask REST API
 */

// ============================================
// Configuration
// ============================================
const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_URL = isLocal ? 'http://localhost:5001/api' : '/api';
const SESSION_KEY = 'teutonia_session_v5';

// Member Types
const MEMBER_TYPES = {
    bursche: { label: 'Aktiver Bursche', defaultEventStatus: 'ja', mustConfirm: true },
    fux: { label: 'Fux', defaultEventStatus: 'ja', mustConfirm: true },
    inaktiv: { label: 'Inaktiver Bursche', defaultEventStatus: 'nein', mustConfirm: true },
    employee: { label: 'Angestellter', defaultEventStatus: null, mustConfirm: false }
};

// Admin Roles
const ADMIN_ROLES = {
    systemadmin: { label: 'Systemadmin', color: '#D4AF37' },
    va: { label: 'Veranstaltungsleiter', color: '#3498db' },
    koch: { label: 'Koch', color: '#27ae60' },
    aktivenkasse: { label: 'Aktivenkasse', color: '#9b59b6' }
};

// Meal pricing
const MEAL_PRICES = {
    aktiv: 3,
    spaeter: 6,
    gast: 3,
    reste: 2.5
};

// State
let currentUser = null;
let debugUser = null;
let members = [];
let events = [];
let currentKW = getISOWeek(new Date());
let currentYear = new Date().getFullYear();
let currentEventId = null;
let currentMealDay = null;

// ============================================
// Utility Functions
// ============================================

async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
}

function getWeekDates(week, year) {
    const jan4 = new Date(year, 0, 4);
    const dayOfWeek = jan4.getDay() || 7;
    const firstMonday = new Date(jan4);
    firstMonday.setDate(jan4.getDate() - (dayOfWeek - 1));
    const targetMonday = new Date(firstMonday);
    targetMonday.setDate(firstMonday.getDate() + (week - 1) * 7);
    const dates = [];
    for (let i = 0; i < 5; i++) {
        const d = new Date(targetMonday);
        d.setDate(targetMonday.getDate() + i);
        dates.push(d);
    }
    return dates;
}

function formatDate(date, includeYear = false) {
    const d = new Date(date);
    const day = d.getDate().toString().padStart(2, '0');
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    return includeYear ? `${day}.${month}.${d.getFullYear()}` : `${day}.${month}.`;
}

function formatDateLong(date) {
    const d = new Date(date);
    return d.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' });
}

function isEventPast(event) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(event.end_date || event.date);
    eventDate.setHours(23, 59, 59);
    return eventDate < today;
}

function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('visible'), 10);
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// API Functions
// ============================================

async function api(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
        method: options.method || 'GET',
        headers,
        body: options.body ? JSON.stringify(options.body) : undefined
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.error || `HTTP ${response.status}`);
    }

    // Handle empty responses
    if (response.status === 204) return null;

    const text = await response.text();
    return text ? JSON.parse(text) : null;
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
// Role & Permission Helpers
// ============================================

function getActiveUser() {
    return debugUser || currentUser;
}

function getUserRoles(user) {
    if (!user) return { memberType: null, adminRole: null, firstName: null };

    const firstName = user.first_name || '';
    const surname = user.surname || '';
    const memberType = user.member_type || 'bursche';
    const adminRole = user.admin_role || null;

    return {
        memberType,
        adminRole,
        firstName: firstName || surname?.split(' ')[0] || 'Mitglied'
    };
}

function isSystemAdmin() {
    const roles = getUserRoles(getActiveUser());
    return roles.adminRole === 'systemadmin';
}

function isVA() {
    const roles = getUserRoles(getActiveUser());
    return roles.adminRole === 'va' || isSystemAdmin();
}

function isKoch() {
    const roles = getUserRoles(getActiveUser());
    return roles.adminRole === 'koch' || isSystemAdmin();
}

function isAktivenkasse() {
    const roles = getUserRoles(getActiveUser());
    return roles.adminRole === 'aktivenkasse' || isSystemAdmin();
}

function getDefaultEventStatus(memberType) {
    return MEMBER_TYPES[memberType]?.defaultEventStatus || 'ja';
}

// ============================================
// UI Functions
// ============================================

function showLogin() {
    document.getElementById('login-section').classList.remove('hidden');
    document.getElementById('dashboard-section').classList.add('hidden');
}

async function showDashboard() {
    document.getElementById('login-section').classList.add('hidden');
    document.getElementById('dashboard-section').classList.remove('hidden');

    updateUserDisplay();
    setupDebugBar();

    // Load all data
    await Promise.all([
        loadEvents(),
        loadMeals(),
        loadAnnouncements()
    ]);

    updateAlertBar();

    if (isSystemAdmin() || isAktivenkasse()) {
        loadMembers();
        loadExpenses();
    }

    // Show/hide role-specific elements
    document.querySelectorAll('.admin-only').forEach(el => {
        el.classList.toggle('hidden', !isSystemAdmin() && !isAktivenkasse());
    });
    document.querySelectorAll('.va-only').forEach(el => {
        el.classList.toggle('hidden', !isVA());
    });
    document.querySelectorAll('.koch-only').forEach(el => {
        el.classList.toggle('hidden', !isKoch());
    });
}

function updateUserDisplay() {
    const user = getActiveUser();
    const roles = getUserRoles(user);

    const firstName = user.first_name || roles.firstName;
    const fullName = user.first_name && user.surname
        ? `${user.first_name} ${user.surname}`
        : (user.full_name || user.surname || firstName);

    document.getElementById('user-name').textContent = fullName;

    let roleText = MEMBER_TYPES[roles.memberType]?.label || 'Mitglied';
    if (roles.adminRole) {
        roleText = ADMIN_ROLES[roles.adminRole].label;
    }
    document.getElementById('user-role').textContent = roleText;
}

function setupDebugBar() {
    const debugBar = document.getElementById('debug-bar');
    const select = document.getElementById('debug-user-select');

    const realRoles = getUserRoles(currentUser);
    if (realRoles.adminRole !== 'systemadmin') {
        debugBar.classList.add('hidden');
        return;
    }

    debugBar.classList.remove('hidden');
    select.innerHTML = '<option value="">-- Eigene Ansicht --</option>';
    members.forEach(m => {
        const option = document.createElement('option');
        option.value = m.id;
        const fullName = `${m.first_name || ''} ${m.surname || ''}`.trim() || m.surname;
        option.textContent = fullName;
        if (debugUser && debugUser.id === m.id) option.selected = true;
        select.appendChild(option);
    });

    select.onchange = () => {
        debugUser = select.value ? members.find(m => m.id === select.value) : null;
        showDashboard();
    };
}

function updateAlertBar() {
    const alertBar = document.getElementById('alert-bar');
    const alertText = document.getElementById('alert-text');
    const user = getActiveUser();
    const roles = getUserRoles(user);

    if (!roles.memberType) {
        alertBar.classList.remove('visible');
        return;
    }

    // Count unconfirmed upcoming events
    const upcomingEvents = events.filter(e => !isEventPast(e));
    let unconfirmedCount = 0;

    upcomingEvents.forEach(event => {
        const reg = event.registrations?.find(r => r.member_id === user.id);
        if (!reg || !reg.confirmed) {
            unconfirmedCount++;
        }
    });

    if (unconfirmedCount > 0) {
        alertBar.classList.add('visible');
        alertText.innerHTML = `Du hast <strong>${unconfirmedCount} unbestätigte</strong> Veranstaltung${unconfirmedCount > 1 ? 'en' : ''}`;
    } else {
        alertBar.classList.remove('visible');
    }
}

function showError(message, isInfo = false) {
    const errorEl = document.getElementById('login-error');
    errorEl.textContent = message;
    errorEl.classList.add('visible');
    if (isInfo) errorEl.classList.add('info');
    else errorEl.classList.remove('info');
}

function hideError() {
    document.getElementById('login-error').classList.remove('visible');
}

// ============================================
// Tab Navigation
// ============================================

function initTabs() {
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.dataset.tab;
            document.querySelectorAll('.nav-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
}

function scrollToEvents() {
    document.querySelector('[data-tab="events"]').click();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// Events System
// ============================================

async function loadEvents() {
    try {
        events = await api('/events');
        renderEvents();
    } catch (error) {
        console.error('Failed to load events:', error);
        events = [];
        renderEvents();
    }
}

function renderEvents() {
    const upcomingBody = document.getElementById('events-body');
    const pastBody = document.getElementById('past-events-body');
    const user = getActiveUser();
    const roles = getUserRoles(user);

    const upcoming = events.filter(e => !isEventPast(e)).sort((a, b) => new Date(a.date) - new Date(b.date));
    const past = events.filter(e => isEventPast(e)).sort((a, b) => new Date(b.date) - new Date(a.date));

    // Upcoming events
    upcomingBody.innerHTML = upcoming.map(event => {
        const reg = event.registrations?.find(r => r.member_id === user.id);
        const defaultStatus = getDefaultEventStatus(roles.memberType);
        const status = reg?.status || defaultStatus;
        const confirmed = reg?.confirmed || false;

        let statusText, statusClass;
        if (!confirmed) {
            statusText = 'Nicht bestätigt';
            statusClass = 'status-unconfirmed';
        } else {
            statusText = status.charAt(0).toUpperCase() + status.slice(1);
            statusClass = status === 'ja' ? 'status-confirmed' : (status === 'nein' ? 'status-no' : 'status-pending');
        }

        const categoryBadge = event.category ? `<span class="category-badge category-badge--${event.category}">${event.category}</span>` : '';

        return `
            <tr>
                <td><strong>${event.title}</strong> ${categoryBadge}</td>
                <td>${formatDate(event.date)}${event.end_date ? ' - ' + formatDate(event.end_date) : ''}</td>
                <td>${event.time || '-'}</td>
                <td>${event.location}</td>
                <td><span class="${statusClass}">${statusText}</span></td>
                <td>
                    <button class="btn-open" onclick="openEventModal('${event.id}')">Öffnen</button>
                    ${isVA() ? `<button class="btn-edit-small" onclick="openAddEventModal('${event.id}')">✎</button>` : ''}
                </td>
            </tr>
        `;
    }).join('');

    if (upcoming.length === 0) {
        upcomingBody.innerHTML = '<tr><td colspan="6" class="empty-state">Keine kommenden Veranstaltungen</td></tr>';
    }

    // Past events
    pastBody.innerHTML = past.slice(0, 10).map(event => {
        const reg = event.registrations?.find(r => r.member_id === user.id);
        const status = reg?.status || '-';
        return `
            <tr>
                <td>${event.title}</td>
                <td>${formatDate(event.date, true)}</td>
                <td>${status}</td>
            </tr>
        `;
    }).join('');

    if (past.length === 0) {
        pastBody.innerHTML = '<tr><td colspan="3" class="empty-state">Keine vergangenen Veranstaltungen</td></tr>';
    }
}

async function openEventModal(eventId) {
    const event = events.find(e => e.id === eventId);
    if (!event) return;

    currentEventId = eventId;
    const user = getActiveUser();
    const roles = getUserRoles(user);
    const reg = event.registrations?.find(r => r.member_id === user.id);
    const defaultStatus = getDefaultEventStatus(roles.memberType);

    document.getElementById('event-modal-title').textContent = event.title;
    document.getElementById('event-date').textContent = formatDateLong(event.date) + (event.end_date ? ' - ' + formatDate(event.end_date) : '');
    document.getElementById('event-time').textContent = event.time || '-';
    document.getElementById('event-meeting').textContent = event.meeting_time ? event.meeting_time + ' Uhr' : '-';
    document.getElementById('event-location').textContent = event.location;

    // Set signup buttons
    const status = reg?.status || defaultStatus;
    document.querySelectorAll('.signup-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.status === status);
    });

    document.getElementById('event-extras').value = reg?.extras || '';

    renderEventAttendees(event);
    document.getElementById('event-modal').classList.remove('hidden');
}

function closeEventModal() {
    document.getElementById('event-modal').classList.add('hidden');
    currentEventId = null;
}

function renderEventAttendees(event) {
    const container = document.getElementById('event-attendees-list');
    const regs = event.registrations || [];
    const isVAorAdmin = isVA();

    const grouped = { ja: [], nein: [], vielleicht: [], unconfirmed: [] };

    members.forEach(m => {
        const reg = regs.find(r => r.member_id === m.id);
        const roles = getUserRoles(m);

        if (!roles.memberType || roles.memberType === 'employee') return;

        const defaultStatus = getDefaultEventStatus(roles.memberType);
        const status = reg?.status || defaultStatus;
        const confirmed = reg?.confirmed || false;
        const extras = reg?.extras || '';
        const fullName = `${m.first_name || ''} ${m.surname || ''}`.trim() || m.surname;

        const entry = { member: m, fullName, status, confirmed, extras };

        if (!confirmed) {
            grouped.unconfirmed.push(entry);
        } else if (status === 'ja') {
            grouped.ja.push(entry);
        } else if (status === 'nein') {
            grouped.nein.push(entry);
        } else {
            grouped.vielleicht.push(entry);
        }
    });

    const renderGroup = (entries, label, groupClass) => {
        if (entries.length === 0) return '';
        const chips = entries.map(e => {
            let reasonHtml = '';
            if (isVAorAdmin && e.extras) {
                reasonHtml = `<span class="reason">(${e.extras})</span>`;
            }
            return `<span class="attendee-chip">${e.fullName}${reasonHtml}</span>`;
        }).join('');

        return `
            <div class="attendees-group ${groupClass}">
                <div class="attendees-group-header">${label} <span class="count">${entries.length}</span></div>
                <div class="attendee-list">${chips}</div>
            </div>
        `;
    };

    let html = '';
    html += renderGroup(grouped.ja, 'Zusagen', 'yes');
    html += renderGroup(grouped.vielleicht, 'Vielleicht', 'maybe');
    html += renderGroup(grouped.nein, 'Absagen', 'no');
    html += renderGroup(grouped.unconfirmed, 'Unbestätigt', 'pending');

    container.innerHTML = html || '<p class="empty-hint">Keine Anmeldungen</p>';
}

// Event signup handlers
document.addEventListener('click', e => {
    if (e.target.classList.contains('signup-btn')) {
        document.querySelectorAll('.signup-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
    }
});

document.getElementById('confirm-event-btn')?.addEventListener('click', async () => {
    if (!currentEventId) return;

    const user = getActiveUser();
    const status = document.querySelector('.signup-btn.active')?.dataset.status || 'ja';
    const extras = document.getElementById('event-extras').value.trim();

    try {
        await api('/event-registrations', {
            method: 'POST',
            body: {
                event_id: currentEventId,
                member_id: user.id,
                status,
                confirmed: true,
                extras
            }
        });

        showToast('Anmeldung gespeichert!');
        closeEventModal();
        await loadEvents();
        updateAlertBar();
    } catch (error) {
        console.error('Failed to save registration:', error);
        showToast('Fehler beim Speichern', 'error');
    }
});

// ============================================
// Event Creation/Edit (VA only)
// ============================================

let currentEditingEventId = null;

function openAddEventModal(eventId = null) {
    currentEditingEventId = eventId;
    const modal = document.getElementById('add-event-modal');
    const deleteBtn = document.getElementById('delete-event-btn');

    if (eventId) {
        const event = events.find(e => e.id === eventId);
        if (!event) return;

        document.getElementById('add-event-modal-title').textContent = 'Veranstaltung bearbeiten';
        document.getElementById('add-event-id').value = event.id;
        document.getElementById('add-event-title').value = event.title;
        document.getElementById('add-event-date').value = event.date;
        document.getElementById('add-event-end-date').value = event.end_date || '';
        document.getElementById('add-event-time').value = event.time || '';
        document.getElementById('add-event-meeting-time').value = event.meeting_time || '';
        document.getElementById('add-event-location').value = event.location || '';
        deleteBtn.classList.remove('hidden');
    } else {
        document.getElementById('add-event-modal-title').textContent = 'Neue Veranstaltung';
        document.getElementById('add-event-id').value = '';
        document.getElementById('add-event-title').value = '';
        document.getElementById('add-event-date').value = '';
        document.getElementById('add-event-end-date').value = '';
        document.getElementById('add-event-time').value = '';
        document.getElementById('add-event-meeting-time').value = '';
        document.getElementById('add-event-location').value = '';
        deleteBtn.classList.add('hidden');
    }

    modal.classList.remove('hidden');
}

function closeAddEventModal() {
    document.getElementById('add-event-modal').classList.add('hidden');
    currentEditingEventId = null;
}

async function saveNewEvent() {
    const title = document.getElementById('add-event-title').value.trim();
    const date = document.getElementById('add-event-date').value;
    const endDate = document.getElementById('add-event-end-date').value || null;
    const time = document.getElementById('add-event-time').value || null;
    const meetingTime = document.getElementById('add-event-meeting-time').value || null;
    const location = document.getElementById('add-event-location').value.trim() || 'Auf dem Haus';

    if (!title || !date) {
        showToast('Bitte Titel und Datum eingeben', 'error');
        return;
    }

    try {
        if (currentEditingEventId) {
            await api(`/events/${currentEditingEventId}`, {
                method: 'PATCH',
                body: { title, date, end_date: endDate, time, meeting_time: meetingTime, location }
            });
            showToast('Veranstaltung aktualisiert!');
        } else {
            await api('/events', {
                method: 'POST',
                body: { title, date, end_date: endDate, time, meeting_time: meetingTime, location, created_by: currentUser.id }
            });
            showToast('Veranstaltung erstellt!');
        }

        closeAddEventModal();
        await loadEvents();
    } catch (error) {
        console.error('Failed to save event:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

async function deleteCurrentEvent() {
    if (!currentEditingEventId) return;
    if (!confirm('Veranstaltung wirklich löschen?')) return;

    try {
        await api(`/events/${currentEditingEventId}`, { method: 'DELETE' });
        showToast('Veranstaltung gelöscht');
        closeAddEventModal();
        await loadEvents();
    } catch (error) {
        console.error('Failed to delete event:', error);
        showToast('Fehler beim Löschen', 'error');
    }
}

document.getElementById('add-event-btn')?.addEventListener('click', () => openAddEventModal());

// ============================================
// Meals System
// ============================================

async function loadMeals() {
    updateKWDisplay();
    await renderMealsTable();
    loadPersonalExpenses();
}

function updateKWDisplay() {
    document.getElementById('current-kw').textContent = `KW ${currentKW}`;
    const dates = getWeekDates(currentKW, currentYear);
    ['mon', 'tue', 'wed', 'thu', 'fri'].forEach((day, i) => {
        document.getElementById(`date-${day}`).textContent = formatDate(dates[i]);
    });
}

async function renderMealsTable() {
    const user = getActiveUser();

    try {
        const mealsData = await api(`/meals?year=${currentYear}&week=${currentKW}`);
        const mealsMap = {};
        mealsData.forEach(m => mealsMap[m.day_index] = m);

        for (let i = 0; i < 5; i++) {
            const meal = mealsMap[i] || {};
            const signup = meal.signups?.find(s => s.member_id === user.id);
            const isCanceled = ['canceled', 'sick', 'vacation'].includes(meal.status);

            // Menu cell
            const menuCell = document.getElementById(`menu-${i}`);
            if (isCanceled) {
                menuCell.className = 'meal-canceled';
                menuCell.innerHTML = `<span style="text-decoration: line-through;">${meal.hauptgericht || 'Kein Menü'}</span>`;
            } else if (meal.hauptgericht) {
                let menuHtml = '';
                if (meal.vorspeise) menuHtml += `<small>${meal.vorspeise}</small><br>`;
                menuHtml += `<strong>${meal.hauptgericht}</strong>`;
                if (meal.nachspeise) menuHtml += `<br><small>${meal.nachspeise}</small>`;
                menuCell.innerHTML = menuHtml;
                menuCell.className = '';
            } else {
                menuCell.innerHTML = isKoch() ? `<button class="btn-small" onclick="editMeal(${i})">Menu eintragen</button>` : '-';
                menuCell.className = '';
            }

            // Team row
            const teamCell = document.getElementById(`team-${i}`);
            if (teamCell) {
                teamCell.innerHTML = meal.kochteam || (isKoch() ? `<button class="btn-small" onclick="editMeal(${i})">Bearbeiten</button>` : '-');
            }

            // Signup cell
            const signupCell = document.getElementById(`signup-${i}`);
            if (isCanceled) {
                signupCell.innerHTML = '<span class="canceled-hint">Ausgefallen</span>';
            } else {
                signupCell.innerHTML = renderMealSignup(i, signup, meal.id);
            }

            // Count
            const count = meal.signups?.length || 0;
            document.getElementById(`count-${i}`).textContent = count;
        }
    } catch (error) {
        console.error('Failed to load meals:', error);
    }
}

function renderMealSignup(dayIndex, signup, mealId) {
    const types = signup?.types || [];

    return `
        <div class="meal-signup">
            <label><input type="checkbox" ${types.includes('aktiv') ? 'checked' : ''} 
                   onchange="toggleMealType(${dayIndex}, 'aktiv', this.checked)"> Aktiv</label>
            <label><input type="checkbox" ${types.includes('gast') ? 'checked' : ''} 
                   onchange="toggleMealType(${dayIndex}, 'gast', this.checked)"> +Gast</label>
            <label><input type="checkbox" ${types.includes('reste') ? 'checked' : ''} 
                   onchange="toggleMealType(${dayIndex}, 'reste', this.checked)"> +Reste</label>
        </div>
    `;
}

async function toggleMealType(dayIndex, type, checked) {
    const user = getActiveUser();

    try {
        // Get current signup data
        const mealsData = await api(`/meals?year=${currentYear}&week=${currentKW}`);
        const meal = mealsData.find(m => m.day_index === dayIndex);
        const currentSignup = meal?.signups?.find(s => s.member_id === user.id);
        let types = currentSignup?.types || [];

        if (checked) {
            if (!types.includes(type)) types.push(type);
            if ((type === 'gast' || type === 'reste') && !types.includes('aktiv')) {
                types.push('aktiv');
            }
        } else {
            types = types.filter(t => t !== type);
            if (type === 'aktiv') types = [];
        }

        // Calculate amount
        let amount = 0;
        if (types.includes('aktiv')) amount += MEAL_PRICES.aktiv;
        if (types.includes('gast')) amount += MEAL_PRICES.gast;
        if (types.includes('reste')) amount += MEAL_PRICES.reste;

        await api('/meal-signups', {
            method: 'POST',
            body: {
                year: currentYear,
                week: currentKW,
                day_index: dayIndex,
                member_id: user.id,
                types,
                amount
            }
        });

        await renderMealsTable();
    } catch (error) {
        console.error('Failed to update meal signup:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

// Meal editing (Koch only)
async function editMeal(dayIndex) {
    currentMealDay = dayIndex;
    const weekdays = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'];

    try {
        const mealsData = await api(`/meals?year=${currentYear}&week=${currentKW}`);
        const meal = mealsData.find(m => m.day_index === dayIndex) || {};

        document.getElementById('meal-modal-title').textContent = `Essen - ${weekdays[dayIndex]}`;
        document.getElementById('meal-vorspeise').value = meal.vorspeise || '';
        document.getElementById('meal-hauptgericht').value = meal.hauptgericht || '';
        document.getElementById('meal-nachspeise').value = meal.nachspeise || '';
        document.getElementById('meal-kochteam').value = meal.kochteam || '';
        document.getElementById('meal-status').value = meal.status || 'active';
        document.getElementById('meal-modal').classList.remove('hidden');
    } catch (error) {
        console.error('Failed to load meal for editing:', error);
    }
}

function closeMealModal() {
    document.getElementById('meal-modal').classList.add('hidden');
    currentMealDay = null;
}

async function saveMealFromModal() {
    if (currentMealDay === null) return;

    try {
        await api('/meals', {
            method: 'POST',
            body: {
                year: currentYear,
                week: currentKW,
                day_index: currentMealDay,
                vorspeise: document.getElementById('meal-vorspeise').value || null,
                hauptgericht: document.getElementById('meal-hauptgericht').value || null,
                nachspeise: document.getElementById('meal-nachspeise').value || null,
                kochteam: document.getElementById('meal-kochteam').value || null,
                status: document.getElementById('meal-status').value
            }
        });

        showToast('Menü gespeichert!');
        closeMealModal();
        await renderMealsTable();
    } catch (error) {
        console.error('Failed to save meal:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

window.saveMeal = saveMealFromModal;

// KW Navigation
document.getElementById('prev-kw')?.addEventListener('click', () => {
    if (currentKW > 1) currentKW--;
    else { currentKW = 52; currentYear--; }
    loadMeals();
});

document.getElementById('next-kw')?.addEventListener('click', () => {
    if (currentKW < 52) currentKW++;
    else { currentKW = 1; currentYear++; }
    loadMeals();
});

// ============================================
// Announcements System
// ============================================

async function loadAnnouncements() {
    try {
        const announcements = await api('/announcements');
        renderAnnouncements(announcements);
    } catch (error) {
        console.debug('Failed to load announcements:', error);
    }
}

function renderAnnouncements(announcements) {
    const container = document.getElementById('announcements-container');
    if (!container) return;

    if (!announcements || announcements.length === 0) {
        container.classList.add('hidden');
        return;
    }

    container.classList.remove('hidden');
    container.innerHTML = `
        <div class="announcements-header">
            <h3>📢 Mitteilungen</h3>
        </div>
        <div class="announcements-list">
            ${announcements.map(a => `
                <div class="announcement-card ${a.category === 'urgent' ? 'announcement-card--urgent' : ''}">
                    <div class="announcement-title">${a.title}</div>
                    <div class="announcement-content">${a.content}</div>
                    <div class="announcement-meta">${formatDate(a.created_at, true)}</div>
                </div>
            `).join('')}
        </div>
    `;
}

// ============================================
// Members System
// ============================================

async function loadMembers() {
    try {
        members = await api('/members');
        renderMembers();
    } catch (error) {
        console.error('Failed to load members:', error);
    }
}

function renderMembers() {
    const tbody = document.getElementById('members-body');
    if (!tbody) return;

    const showBursche = document.getElementById('filter-bursche')?.checked ?? true;
    const showFux = document.getElementById('filter-fux')?.checked ?? true;
    const showInaktiv = document.getElementById('filter-inaktiv')?.checked ?? false;

    const filtered = members.filter(m => {
        const memberType = m.member_type || 'bursche';
        if (memberType === 'bursche' && showBursche) return true;
        if (memberType === 'fux' && showFux) return true;
        if (memberType === 'inaktiv' && showInaktiv) return true;
        if (memberType === 'employee') return true;
        return false;
    });

    tbody.innerHTML = filtered.map(m => {
        const memberType = m.member_type || 'bursche';
        const typeLabels = { 'fux': 'Fux', 'bursche': 'Bursche', 'inaktiv': 'Inaktiv', 'employee': 'Angestellt' };
        const typeLabel = typeLabels[memberType] || memberType;

        let roleHtml = '-';
        if (m.admin_role) {
            roleHtml = `<span class="admin-role-badge">${ADMIN_ROLES[m.admin_role]?.label || m.admin_role}</span>`;
        }

        const hasPassword = m.password_hash ? '✓' : '✗';
        const fullName = `${m.first_name || ''} ${m.surname || ''}`.trim();

        return `
            <tr>
                <td><strong>${fullName}</strong></td>
                <td><span class="member-type-badge ${memberType}">${typeLabel}</span></td>
                <td>${roleHtml}</td>
                <td class="${m.password_hash ? 'text-success' : 'text-muted'}">${hasPassword}</td>
                <td><button class="btn-edit" onclick="editMember('${m.id}')">Bearbeiten</button></td>
            </tr>
        `;
    }).join('');
}

['filter-bursche', 'filter-fux', 'filter-inaktiv'].forEach(id => {
    document.getElementById(id)?.addEventListener('change', renderMembers);
});

// ============================================
// Expenses System
// ============================================

async function loadExpenses() {
    const tbody = document.getElementById('expenses-body');
    if (!tbody) return;

    try {
        const weeks = parseInt(document.getElementById('expense-period')?.value || '4');
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - weeks * 7);

        const expenses = await api(`/expenses?start_date=${startDate.toISOString().split('T')[0]}`);

        // Group by member
        const byMember = {};
        expenses.forEach(exp => {
            if (!byMember[exp.member_id]) {
                byMember[exp.member_id] = { meals: 0, drinks: 0, other: 0 };
            }
            byMember[exp.member_id][exp.category] += parseFloat(exp.amount);
        });

        let grandTotal = 0;
        const rows = members.map(m => {
            const exp = byMember[m.id] || { meals: 0, drinks: 0, other: 0 };
            const total = exp.meals + exp.drinks + exp.other;
            if (total === 0) return '';
            grandTotal += total;
            const fullName = `${m.first_name || ''} ${m.surname || ''}`.trim() || m.surname;

            return `
                <tr>
                    <td>${fullName}</td>
                    <td>${exp.meals.toFixed(2)}€</td>
                    <td>${exp.drinks.toFixed(2)}€</td>
                    <td>${exp.other.toFixed(2)}€</td>
                    <td><strong>${total.toFixed(2)}€</strong></td>
                </tr>
            `;
        }).filter(Boolean).join('');

        tbody.innerHTML = rows ? rows + `
            <tr class="total-row">
                <td>Gesamt</td>
                <td colspan="3"></td>
                <td><strong>${grandTotal.toFixed(2)}€</strong></td>
            </tr>
        ` : '<tr><td colspan="5" class="empty-state">Keine Ausgaben im Zeitraum</td></tr>';

    } catch (error) {
        console.debug('Failed to load expenses:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="empty-state">Ausgaben werden geladen...</td></tr>';
    }
}

function loadPersonalExpenses() {
    ['my-meals-cost', 'my-drinks-cost', 'my-other-cost', 'my-total-cost'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = '0.00€';
    });
}

document.getElementById('expense-period')?.addEventListener('change', loadExpenses);

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
        const users = await api('/members/login', {
            method: 'POST',
            body: { name }
        });

        if (users.length === 0) {
            showError('Benutzer nicht gefunden. Bitte vollständigen Namen eingeben (z.B. "Theo Reichert")');
            return;
        }

        if (users.length > 1) {
            showError(`Mehrere Benutzer gefunden. Bitte vollständigen Namen eingeben.`);
            return;
        }

        const user = users[0];

        if (!user.password_hash) {
            if (!newPassword) {
                document.getElementById('password-group').classList.add('hidden');
                document.getElementById('new-password-group').classList.remove('hidden');
                document.getElementById('confirm-password-group').classList.remove('hidden');
                document.getElementById('login-btn').textContent = 'Passwort setzen';
                showError('Willkommen! Bitte erstelle ein Passwort.', true);
                return;
            }

            if (newPassword.length < 6) {
                showError('Passwort muss mind. 6 Zeichen haben');
                return;
            }

            if (newPassword !== confirmPassword) {
                showError('Passwörter stimmen nicht überein');
                return;
            }

            const hash = await sha256(newPassword);
            await api(`/members/${user.id}`, {
                method: 'PATCH',
                body: { password_hash: hash }
            });
            user.password_hash = hash;
        } else {
            if (!password) {
                showError('Bitte Passwort eingeben');
                return;
            }

            const hash = await sha256(password);
            if (hash !== user.password_hash) {
                showError('Falsches Passwort');
                return;
            }
        }

        currentUser = user;
        saveSession(user);
        members = await api('/members');
        showDashboard();

    } catch (error) {
        console.error('Login failed:', error);
        showError('Anmeldung fehlgeschlagen: ' + error.message);
    }
}

function handleLogout() {
    clearSession();
    currentUser = null;
    debugUser = null;

    document.getElementById('login-form').reset();
    document.getElementById('password-group').classList.remove('hidden');
    document.getElementById('new-password-group').classList.add('hidden');
    document.getElementById('confirm-password-group').classList.add('hidden');
    document.getElementById('login-btn').textContent = 'Anmelden';

    showLogin();
}

// ============================================
// Member Modal Functions
// ============================================

let currentEditingMember = null;

function openMemberModal(memberId) {
    const member = members.find(m => m.id === memberId);
    if (!member) return;

    currentEditingMember = member;

    document.getElementById('member-id').value = member.id;
    document.getElementById('member-firstname').value = member.first_name || '';
    document.getElementById('member-surname').value = member.surname || '';
    document.getElementById('member-type').value = member.member_type || 'fux';
    document.getElementById('member-admin-role').value = member.admin_role || '';

    const passwordStatus = document.getElementById('member-password-status');
    if (member.password_hash) {
        passwordStatus.className = 'password-status set';
        passwordStatus.textContent = 'Passwort ist gesetzt';
    } else {
        passwordStatus.className = 'password-status not-set';
        passwordStatus.textContent = 'Kein Passwort gesetzt';
    }

    document.getElementById('member-modal-title').textContent = `${member.first_name || ''} ${member.surname || ''} bearbeiten`.trim();
    document.getElementById('delete-member-btn').classList.remove('hidden');
    document.getElementById('member-modal').classList.remove('hidden');
}

function closeMemberModal() {
    document.getElementById('member-modal').classList.add('hidden');
    currentEditingMember = null;
}

async function saveMember() {
    const memberId = document.getElementById('member-id').value;
    const firstName = document.getElementById('member-firstname').value.trim();
    const surname = document.getElementById('member-surname').value.trim();
    const memberType = document.getElementById('member-type').value;
    const adminRole = document.getElementById('member-admin-role').value || null;

    if (!firstName) {
        showToast('Bitte Vorname eingeben', 'error');
        return;
    }

    try {
        if (memberId) {
            await api(`/members/${memberId}`, {
                method: 'PATCH',
                body: { first_name: firstName, surname, member_type: memberType, admin_role: adminRole }
            });
            showToast('Mitglied aktualisiert!');
        } else {
            await api('/members', {
                method: 'POST',
                body: { first_name: firstName, surname, member_type: memberType, admin_role: adminRole }
            });
            showToast('Mitglied erstellt!');
        }

        await loadMembers();
        closeMemberModal();
    } catch (error) {
        console.error('Failed to save member:', error);
        showToast('Fehler beim Speichern', 'error');
    }
}

async function resetMemberPassword() {
    if (!currentEditingMember) return;
    if (!confirm(`Passwort zurücksetzen?`)) return;

    try {
        await api(`/members/${currentEditingMember.id}`, {
            method: 'PATCH',
            body: { password_hash: null }
        });

        const passwordStatus = document.getElementById('member-password-status');
        passwordStatus.className = 'password-status not-set';
        passwordStatus.textContent = 'Passwort zurückgesetzt';
        showToast('Passwort zurückgesetzt');
        await loadMembers();
    } catch (error) {
        showToast('Fehler', 'error');
    }
}

async function confirmDeleteMember() {
    if (!currentEditingMember) return;
    if (!confirm(`Mitglied wirklich löschen?`)) return;

    try {
        await api(`/members/${currentEditingMember.id}`, { method: 'DELETE' });
        showToast('Mitglied gelöscht');
        closeMemberModal();
        await loadMembers();
    } catch (error) {
        showToast('Fehler beim Löschen', 'error');
    }
}

function addNewMember() {
    currentEditingMember = null;
    document.getElementById('member-id').value = '';
    document.getElementById('member-firstname').value = '';
    document.getElementById('member-surname').value = '';
    document.getElementById('member-type').value = 'fux';
    document.getElementById('member-admin-role').value = '';

    const passwordStatus = document.getElementById('member-password-status');
    passwordStatus.className = 'password-status not-set';
    passwordStatus.textContent = 'Neues Mitglied';

    document.getElementById('member-modal-title').textContent = 'Neues Mitglied';
    document.getElementById('delete-member-btn').classList.add('hidden');
    document.getElementById('member-modal').classList.remove('hidden');
}

document.getElementById('add-member-btn')?.addEventListener('click', addNewMember);

// ============================================
// Initialization
// ============================================

async function init() {
    const savedSession = loadSession();

    if (savedSession) {
        try {
            const user = await api(`/members/${savedSession.id}`);
            if (user) {
                currentUser = user;
                members = await api('/members');
                showDashboard();
            } else {
                clearSession();
                showLogin();
            }
        } catch (error) {
            console.error('Session validation failed:', error);
            clearSession();
            showLogin();
        }
    } else {
        showLogin();
    }

    document.getElementById('login-form')?.addEventListener('submit', handleLogin);
    document.getElementById('logout-btn')?.addEventListener('click', handleLogout);
    initTabs();

    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
        backdrop.addEventListener('click', () => backdrop.closest('.modal').classList.add('hidden'));
    });
}

// Global function exports
window.openEventModal = openEventModal;
window.closeEventModal = closeEventModal;
window.scrollToEvents = scrollToEvents;
window.openAddEventModal = openAddEventModal;
window.closeAddEventModal = closeAddEventModal;
window.saveNewEvent = saveNewEvent;
window.deleteCurrentEvent = deleteCurrentEvent;
window.editMeal = editMeal;
window.closeMealModal = closeMealModal;
window.toggleMealType = toggleMealType;
window.editMember = openMemberModal;
window.closeMemberModal = closeMemberModal;
window.saveMember = saveMember;
window.resetMemberPassword = resetMemberPassword;
window.confirmDeleteMember = confirmDeleteMember;
window.addNewMember = addNewMember;

document.addEventListener('DOMContentLoaded', init);
