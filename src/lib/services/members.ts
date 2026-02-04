import { db } from '@/lib/db';
import { members } from '@/lib/db/schema';
import { eq, ilike } from 'drizzle-orm';
import type { Member, NewMember } from '@/lib/db/schema';

export async function getAllMembers(): Promise<Member[]> {
    return db.select().from(members).orderBy(members.surname);
}

export async function getMemberById(id: string): Promise<Member | null> {
    const result = await db.select().from(members).where(eq(members.id, id)).limit(1);
    return result[0] ?? null;
}

export async function getMemberByName(name: string): Promise<Member | null> {
    const result = await db
        .select()
        .from(members)
        .where(ilike(members.fullName, name))
        .limit(1);
    return result[0] ?? null;
}

export async function createMember(data: NewMember): Promise<Member> {
    const fullName = `${data.firstName || ''} ${data.surname || ''}`.trim();
    const result = await db
        .insert(members)
        .values({ ...data, fullName })
        .returning();
    return result[0];
}

export async function updateMember(
    id: string,
    data: Partial<NewMember>
): Promise<Member | null> {
    const result = await db
        .update(members)
        .set(data)
        .where(eq(members.id, id))
        .returning();
    return result[0] ?? null;
}

export async function deleteMember(id: string): Promise<boolean> {
    const result = await db.delete(members).where(eq(members.id, id)).returning();
    return result.length > 0;
}

// ============================================
// Role Helpers (Pure functions - not server actions)
// ============================================

export function isSystemAdmin(member: Member | null): boolean {
    return member?.adminRole === 'systemadmin';
}

export function isVA(member: Member | null): boolean {
    return member?.adminRole === 'va' || isSystemAdmin(member);
}

export function isKoch(member: Member | null): boolean {
    return member?.adminRole === 'koch' || isSystemAdmin(member);
}

export function isAktivenkasse(member: Member | null): boolean {
    return member?.adminRole === 'aktivenkasse' || isSystemAdmin(member);
}

export function hasAdminRole(member: Member | null): boolean {
    return member?.adminRole !== null;
}
