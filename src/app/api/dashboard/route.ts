import { NextResponse } from 'next/server';
import { getUpcomingEvents } from '@/lib/services/events';
import { getCurrentWeekMeals } from '@/lib/services/meals';
import { db } from '@/lib/db';
import { announcements } from '@/lib/db/schema';
import { eq, and, or, gte, isNull } from 'drizzle-orm';

export async function GET() {
    try {
        // Get upcoming events
        const upcomingEvents = await getUpcomingEvents();

        // Get current week meals (placeholder stats)
        const mealStats = { thisWeek: 0, amount: 0 };

        // Get active announcements
        const now = new Date();
        const activeAnnouncements = await db
            .select()
            .from(announcements)
            .where(
                and(
                    eq(announcements.isActive, true),
                    or(
                        isNull(announcements.expiresAt),
                        gte(announcements.expiresAt, now)
                    )
                )
            )
            .limit(10);

        return NextResponse.json({
            upcomingEvents: upcomingEvents.slice(0, 10),
            announcements: activeAnnouncements,
            mealStats,
        });
    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json(
            { error: 'Fehler beim Laden der Dashboard-Daten' },
            { status: 500 }
        );
    }
}
