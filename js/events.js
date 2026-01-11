/**
 * KB! Teutonia - Events Integration
 * Fetches events from the backend proxy (Google Calendar) and renders them.
 */

document.addEventListener('DOMContentLoaded', () => {
    const eventsContainer = document.getElementById('calendar-events-container');
    if (!eventsContainer) return; // Only run if container exists

    fetchEvents(eventsContainer);
});

async function fetchEvents(container) {
    try {
        // Show loading state
        container.innerHTML = `
            <div class="events-loading">
                <div class="spinner"></div>
                <p>Lade Termine...</p>
            </div>
        `;

        // Use the Flask API endpoint
        const response = await fetch('http://localhost:5001/api/calendar-events');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const events = await response.json();
        renderEvents(events, container);

    } catch (error) {
        console.error('Error fetching events:', error);
        container.innerHTML = `
            <div class="events-error">
                <p>Termine konnten nicht geladen werden.</p>
                <button onclick="location.reload()" class="btn btn--sm btn--outline">Erneut versuchen</button>
            </div>
        `;
    }
}

function renderEvents(events, container) {
    if (!events || events.length === 0) {
        container.innerHTML = '<p class="no-events">Aktuell stehen keine öffentlichen Termine an.</p>';
        return;
    }

    // Create grid container
    const grid = document.createElement('div');
    grid.className = 'events-grid';

    // Limit to next 6 events for cleaner display, or user can scroll
    const displayEvents = events.slice(0, 6);

    displayEvents.forEach(event => {
        const card = document.createElement('div');
        card.className = 'event-card';

        const startDate = new Date(event.start);
        const endDate = event.end ? new Date(event.end) : null;

        // Format date and time
        const dateStr = startDate.toLocaleDateString('de-DE', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });

        const timeStr = startDate.toLocaleTimeString('de-DE', {
            hour: '2-digit',
            minute: '2-digit'
        });

        card.innerHTML = `
            <div class="event-card__date">
                <span class="event-card__day">${startDate.getDate()}</span>
                <span class="event-card__month">${startDate.toLocaleDateString('de-DE', { month: 'short' }).toUpperCase()}</span>
            </div>
            <div class="event-card__content">
                <h3 class="event-card__title">${event.summary}</h3>
                <div class="event-card__meta">
                    <div class="event-card__time">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <polyline points="12 6 12 12 16 14"></polyline>
                        </svg>
                        ${timeStr} Uhr
                    </div>
                    ${event.location ? `
                    <div class="event-card__location">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        ${event.location}
                    </div>
                    ` : ''}
                </div>
                ${event.description ? `<p class="event-card__desc">${truncateText(event.description, 80)}</p>` : ''}
            </div>
        `;

        grid.appendChild(card);
    });

    container.innerHTML = '';
    container.appendChild(grid);
}

function truncateText(text, maxLength) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
}
