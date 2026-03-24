import { db } from '@/lib/db';
import { events, eventRegistrations, members } from '@/lib/db/schema';
import { eq, desc, gte, and, lt } from 'drizzle-orm';
import type { Event, NewEvent, EventRegistration, NewEventRegistration } from '@/lib/db/schema';

// ============================================
// Events
// ============================================

export async function getAllEvents(): Promise<Event[]> {
    return db.select().from(events).orderBy(desc(events.date));
}

export async function getUpcomingEvents(): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    return db
        .select()
        .from(events)
        .where(gte(events.date, today))
        .orderBy(events.date);
}

export async function getPastEvents(limit = 10): Promise<Event[]> {
    const today = new Date().toISOString().split('T')[0];
    return db
        .select()
        .from(events)
        .where(lt(events.date, today))
        .orderBy(desc(events.date))
        .limit(limit);
}

export async function getEventById(id: string): Promise<Event | null> {
    const result = await db.select().from(events).where(eq(events.id, id)).limit(1);
    return result[0] ?? null;
}

export async function createEvent(data: NewEvent): Promise<Event> {
    const result = await db.insert(events).values(data).returning();
    return result[0];
}

export async function updateEvent(
    id: string,
    data: Partial<NewEvent>
): Promise<Event | null> {
    const result = await db
        .update(events)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(events.id, id))
        .returning();
    return result[0] ?? null;
}

export async function deleteEvent(id: string): Promise<boolean> {
    const result = await db.delete(events).where(eq(events.id, id)).returning();
    return result.length > 0;
}

// ============================================
// Event Registrations
// ============================================

export interface EventRegistrationWithMember extends EventRegistration {
    member: {
        id: string;
        firstName: string | null;
        surname: string | null;
        fullName: string | null;
    };
}

export async function getEventRegistrations(
    eventId: string
): Promise<EventRegistrationWithMember[]> {
    const result = await db
        .select({
            id: eventRegistrations.id,
            eventId: eventRegistrations.eventId,
            memberId: eventRegistrations.memberId,
            status: eventRegistrations.status,
            confirmed: eventRegistrations.confirmed,
            extras: eventRegistrations.extras,
            guestCount: eventRegistrations.guestCount,
            createdAt: eventRegistrations.createdAt,
            updatedAt: eventRegistrations.updatedAt,
            member: {
                id: members.id,
                firstName: members.firstName,
                surname: members.surname,
                fullName: members.fullName,
            },
        })
        .from(eventRegistrations)
        .innerJoin(members, eq(eventRegistrations.memberId, members.id))
        .where(eq(eventRegistrations.eventId, eventId));

    return result;
}

export async function getMemberRegistrations(
    memberId: string
): Promise<EventRegistration[]> {
    return db
        .select()
        .from(eventRegistrations)
        .where(eq(eventRegistrations.memberId, memberId));
}

export async function upsertRegistration(
    data: NewEventRegistration
): Promise<EventRegistration> {
    const existing = await db
        .select()
        .from(eventRegistrations)
        .where(
            and(
                eq(eventRegistrations.eventId, data.eventId),
                eq(eventRegistrations.memberId, data.memberId)
            )
        )
        .limit(1);

    if (existing[0]) {
        const result = await db
            .update(eventRegistrations)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(eventRegistrations.id, existing[0].id))
            .returning();
        return result[0];
    }

    const result = await db.insert(eventRegistrations).values(data).returning();
    return result[0];
}

export async function getUnconfirmedCount(memberId: string): Promise<number> {
    const today = new Date().toISOString().split('T')[0];
    const result = await db
        .select()
        .from(eventRegistrations)
        .innerJoin(events, eq(eventRegistrations.eventId, events.id))
        .where(
            and(
                eq(eventRegistrations.memberId, memberId),
                eq(eventRegistrations.confirmed, false),
                gte(events.date, today)
            )
        );
    return result.length;
}
