import { db } from '@/lib/db';
import { meals, mealSignups, members } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';
import type { Meal, NewMeal, MealSignup, NewMealSignup } from '@/lib/db/schema';

// ============================================
// Helper: Get ISO Week Number
// ============================================

function getISOWeek(date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const dayNum = d.getUTCDay() || 7;
    d.setUTCDate(d.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
}

// ============================================
// Meals
// ============================================

export async function getMealsByWeek(year: number, week: number): Promise<Meal[]> {
    return db
        .select()
        .from(meals)
        .where(and(eq(meals.year, year), eq(meals.week, week)))
        .orderBy(meals.dayIndex);
}

export async function getCurrentWeekMeals(): Promise<Meal[]> {
    const now = new Date();
    const year = now.getFullYear();
    const week = getISOWeek(now);
    return getMealsByWeek(year, week);
}

export async function getMealById(id: string): Promise<Meal | null> {
    const result = await db.select().from(meals).where(eq(meals.id, id)).limit(1);
    return result[0] ?? null;
}

export async function createMeal(data: NewMeal): Promise<Meal> {
    const result = await db.insert(meals).values(data).returning();
    return result[0];
}

export async function updateMeal(
    id: string,
    data: Partial<NewMeal>
): Promise<Meal | null> {
    const result = await db
        .update(meals)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(meals.id, id))
        .returning();
    return result[0] ?? null;
}

export async function upsertMeal(data: NewMeal): Promise<Meal> {
    const existing = await db
        .select()
        .from(meals)
        .where(
            and(
                eq(meals.year, data.year),
                eq(meals.week, data.week),
                eq(meals.dayIndex, data.dayIndex)
            )
        )
        .limit(1);

    if (existing[0]) {
        const result = await db
            .update(meals)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(meals.id, existing[0].id))
            .returning();
        return result[0];
    }

    return createMeal(data);
}

// ============================================
// Meal Signups
// ============================================

export interface MealSignupWithMember extends MealSignup {
    member: {
        id: string;
        firstName: string | null;
        surname: string | null;
        fullName: string | null;
    };
}

export async function getMealSignups(mealId: string): Promise<MealSignupWithMember[]> {
    const result = await db
        .select({
            id: mealSignups.id,
            mealId: mealSignups.mealId,
            memberId: mealSignups.memberId,
            types: mealSignups.types,
            amount: mealSignups.amount,
            createdAt: mealSignups.createdAt,
            updatedAt: mealSignups.updatedAt,
            member: {
                id: members.id,
                firstName: members.firstName,
                surname: members.surname,
                fullName: members.fullName,
            },
        })
        .from(mealSignups)
        .innerJoin(members, eq(mealSignups.memberId, members.id))
        .where(eq(mealSignups.mealId, mealId));

    return result;
}

export async function getMemberMealSignups(memberId: string): Promise<MealSignup[]> {
    return db.select().from(mealSignups).where(eq(mealSignups.memberId, memberId));
}

export async function upsertMealSignup(data: NewMealSignup): Promise<MealSignup> {
    const existing = await db
        .select()
        .from(mealSignups)
        .where(
            and(
                eq(mealSignups.mealId, data.mealId),
                eq(mealSignups.memberId, data.memberId)
            )
        )
        .limit(1);

    if (existing[0]) {
        const result = await db
            .update(mealSignups)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(mealSignups.id, existing[0].id))
            .returning();
        return result[0];
    }

    const result = await db.insert(mealSignups).values(data).returning();
    return result[0];
}

export async function deleteMealSignup(
    mealId: string,
    memberId: string
): Promise<boolean> {
    const result = await db
        .delete(mealSignups)
        .where(
            and(eq(mealSignups.mealId, mealId), eq(mealSignups.memberId, memberId))
        )
        .returning();
    return result.length > 0;
}

// ============================================
// Meal Pricing
// ============================================

export const MEAL_PRICES: Record<string, number> = {
    aktiv: 3,
    spaeter: 6,
    gast: 3,
    reste: 2.5,
};

export function calculateMealAmount(types: string[]): number {
    return types.reduce((sum, type) => sum + (MEAL_PRICES[type] || 0), 0);
}
