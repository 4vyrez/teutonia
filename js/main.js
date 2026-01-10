/**
 * KB! Teutonia - Enhanced JavaScript
 * Handles navigation, timeline interactions, and scroll animations
 */

// DOM Elements
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');
const timelineItems = document.querySelectorAll('.timeline__item');
const timelineProgress = document.getElementById('timeline-progress');

// =============================================
// MOBILE NAVIGATION
// =============================================

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
}

if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    });
});

document.addEventListener('click', (e) => {
    if (navMenu && navMenu.classList.contains('show') &&
        !navMenu.contains(e.target) &&
        !navToggle.contains(e.target)) {
        navMenu.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// =============================================
// HEADER SCROLL EFFECT
// =============================================

let lastScrollY = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScrollY = currentScroll;
}, { passive: true });

// =============================================
// ACTIVE SECTION HIGHLIGHTING
// =============================================

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    const headerHeight = header ? header.offsetHeight : 80;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection, { passive: true });

// =============================================
// INTERACTIVE TIMELINE
// =============================================

// Timeline item click to expand/activate
timelineItems.forEach(item => {
    const header = item.querySelector('.timeline__card-header');

    if (header) {
        header.addEventListener('click', () => {
            // Remove active from all
            timelineItems.forEach(i => i.classList.remove('timeline__item--active'));
            // Add active to clicked
            item.classList.add('timeline__item--active');
        });
    }

    // Also activate on hover for desktop
    item.addEventListener('mouseenter', () => {
        if (window.innerWidth > 700) {
            // Don't remove other actives, just enhance hover state
        }
    });
});

// Timeline progress bar based on scroll
function updateTimelineProgress() {
    if (!timelineProgress) return;

    const timeline = document.querySelector('.timeline-interactive');
    if (!timeline) return;

    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timeline.offsetTop;
    const timelineHeight = timeline.offsetHeight;
    const scrollY = window.pageYOffset;
    const windowHeight = window.innerHeight;

    // Calculate progress through timeline section
    const startOffset = timelineTop - windowHeight * 0.7;
    const endOffset = timelineTop + timelineHeight - windowHeight * 0.3;

    if (scrollY < startOffset) {
        timelineProgress.style.height = '0%';
    } else if (scrollY > endOffset) {
        timelineProgress.style.height = '100%';
    } else {
        const progress = ((scrollY - startOffset) / (endOffset - startOffset)) * 100;
        timelineProgress.style.height = `${Math.min(100, Math.max(0, progress))}%`;
    }
}

window.addEventListener('scroll', updateTimelineProgress, { passive: true });

// =============================================
// SCROLL ANIMATIONS (Intersection Observer)
// =============================================

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

// Observer for timeline items - staggered reveal
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { ...observerOptions, threshold: 0.1 });

timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 0.1}s`;
    timelineObserver.observe(item);
});

// Observer for cards - staggered reveal
const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all cards with stagger
const allCards = document.querySelectorAll('.feature-card, .value-card, .house-feature, .stat-card');
allCards.forEach((card, index) => {
    // Group delay by row (assuming 4 columns max)
    const row = Math.floor(index / 4);
    const col = index % 4;
    card.style.transitionDelay = `${(row * 0.1) + (col * 0.05)}s`;
    card.style.transition = `opacity 0.6s ease ${(row * 0.1) + (col * 0.05)}s, transform 0.6s ease ${(row * 0.1) + (col * 0.05)}s`;
    cardObserver.observe(card);
});

// =============================================
// CONTACT FORM HANDLING
// =============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const btn = contactForm.querySelector('button[type="submit"]');
        const originalHTML = btn.innerHTML;

        // Show loading state
        btn.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin">
                <circle cx="12" cy="12" r="10" stroke-dasharray="31.4" stroke-dashoffset="10"/>
            </svg>
            <span>Wird gesendet...</span>
        `;
        btn.disabled = true;

        try {
            const formData = new FormData(contactForm);

            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Show success message
                btn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    <span>Gesendet!</span>
                `;
                btn.style.background = 'linear-gradient(135deg, #2ecc71, #27ae60)';
                contactForm.reset();

                // Reset after delay
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            // Show error message
            btn.innerHTML = `
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                <span>Fehler - Bitte erneut versuchen</span>
            `;
            btn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';

            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.style.background = '';
                btn.disabled = false;
            }, 3000);
        }
    });
}

// =============================================
// SMOOTH SCROLL (enhanced)
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            const headerHeight = header ? header.offsetHeight : 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// =============================================
// PARALLAX EFFECTS (subtle)
// =============================================

function handleParallax() {
    const hero = document.querySelector('.hero__background');
    if (hero && window.pageYOffset < window.innerHeight) {
        const scroll = window.pageYOffset;
        hero.style.transform = `translateY(${scroll * 0.3}px)`;
    }
}

window.addEventListener('scroll', handleParallax, { passive: true });

// =============================================
// INITIALIZE
// =============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initial checks
    highlightActiveSection();
    updateTimelineProgress();

    // Make timeline items initially visible if in viewport
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            item.classList.add('visible');
        }
    });

    // Make cards initially visible if in viewport
    allCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            card.classList.add('visible');
        }
    });

    console.log('KB! Teutonia website initialized ✓');
});

// =============================================
// PERFORMANCE: Debounce resize
// =============================================

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        highlightActiveSection();
        updateTimelineProgress();
        setTimelineLineHeight();
    }, 150);
});

// =============================================
// TIMELINE LINE HEIGHT (end at last item)
// =============================================

function setTimelineLineHeight() {
    const timeline = document.querySelector('.timeline-interactive');
    const timelineLine = document.querySelector('.timeline__line');
    const items = document.querySelectorAll('.timeline__item');

    if (!timeline || !timelineLine || items.length === 0) return;

    const lastItem = items[items.length - 1];
    const lastMarker = lastItem.querySelector('.timeline__year');

    if (lastMarker) {
        // Use offsetTop for reliable positioning relative to container
        const markerTop = lastItem.offsetTop;
        const markerHeight = lastMarker.offsetHeight;
        // End the line at the center of the last marker
        const lineHeight = markerTop + (markerHeight / 2);
        timelineLine.style.height = `${lineHeight}px`;
    }
}

// Call on load and resize
document.addEventListener('DOMContentLoaded', setTimelineLineHeight);
window.addEventListener('load', setTimelineLineHeight);

// =============================================
// PAGE TRANSITIONS
// =============================================

// Add page load animation
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('page-loaded');
});

// Smooth exit for internal links
document.querySelectorAll('a').forEach(link => {
    const href = link.getAttribute('href');

    // Skip hash links, external links, and anchor-only links
    if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:')) return;

    // Only handle same-origin navigation
    if (href.endsWith('.html') || href.includes('.html#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            document.body.classList.add('page-exiting');

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    }
});

// Handle back button
window.addEventListener('pageshow', (e) => {
    if (e.persisted) {
        document.body.classList.remove('page-exiting');
        document.body.classList.add('page-loaded');
    }
});
