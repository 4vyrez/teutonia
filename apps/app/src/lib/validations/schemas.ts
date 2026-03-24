import { z } from 'zod';

// ============================================
// Member Schemas
// ============================================

export const memberTypeSchema = z.enum(['bursche', 'fux', 'inaktiv', 'employee']);
export const adminRoleSchema = z.enum(['systemadmin', 'va', 'koch', 'aktivenkasse']).nullable();

export const memberSchema = z.object({
    id: z.string().uuid(),
    firstName: z.string().min(1).max(100).nullable(),
    surname: z.string().min(1).max(100).nullable(),
    fullName: z.string().max(200).nullable(),
    memberType: memberTypeSchema.default('bursche'),
    adminRole: adminRoleSchema,
});

export const createMemberSchema = memberSchema.omit({ id: true });
export const updateMemberSchema = createMemberSchema.partial();

// ============================================
// Event Schemas
// ============================================

export const eventCategorySchema = z.enum(['pflicht', 'freiwillig', 'intern']);

export const eventSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(255),
    date: z.string().or(z.date()),
    endDate: z.string().or(z.date()).nullable(),
    time: z.string().nullable(),
    meetingTime: z.string().nullable(),
    location: z.string().max(255).default('Auf dem Haus'),
    description: z.string().nullable(),
    category: eventCategorySchema.default('intern'),
    confirmationDeadline: z.string().or(z.date()).nullable(),
});

export const createEventSchema = eventSchema.omit({ id: true });
export const updateEventSchema = createEventSchema.partial();

// ============================================
// Event Registration Schemas
// ============================================

export const eventStatusSchema = z.enum(['ja', 'nein', 'vielleicht']);

export const eventRegistrationSchema = z.object({
    eventId: z.string().uuid(),
    memberId: z.string().uuid(),
    status: eventStatusSchema.default('ja'),
    confirmed: z.boolean().default(false),
    extras: z.string().nullable(),
    guestCount: z.number().int().min(0).default(0),
});

export const updateRegistrationSchema = eventRegistrationSchema.partial().required({
    eventId: true,
    memberId: true,
});

// ============================================
// Meal Schemas
// ============================================

export const mealStatusSchema = z.enum(['active', 'canceled', 'sick', 'vacation']);

export const mealSchema = z.object({
    id: z.string().uuid(),
    year: z.number().int().min(2020).max(2100),
    week: z.number().int().min(1).max(53),
    dayIndex: z.number().int().min(0).max(4),
    vorspeise: z.string().max(255).nullable(),
    hauptgericht: z.string().max(255).nullable(),
    nachspeise: z.string().max(255).nullable(),
    kochteam: z.string().max(255).nullable(),
    status: mealStatusSchema.default('active'),
});

export const createMealSchema = mealSchema.omit({ id: true });
export const updateMealSchema = createMealSchema.partial();

// ============================================
// Meal Signup Schemas
// ============================================

export const mealSignupTypeSchema = z.enum(['aktiv', 'spaeter', 'gast', 'reste']);

export const mealSignupSchema = z.object({
    mealId: z.string().uuid(),
    memberId: z.string().uuid(),
    types: z.array(mealSignupTypeSchema).default([]),
});

// ============================================
// Announcement Schemas
// ============================================

export const announcementCategorySchema = z.enum(['info', 'urgent', 'event']);

export const announcementSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(255),
    content: z.string().min(1),
    category: announcementCategorySchema.default('info'),
    isActive: z.boolean().default(true),
    expiresAt: z.string().or(z.date()).nullable(),
});

export const createAnnouncementSchema = announcementSchema.omit({ id: true });
export const updateAnnouncementSchema = createAnnouncementSchema.partial();

// ============================================
// Expense Schemas
// ============================================

export const expenseCategorySchema = z.enum(['drinks', 'other', 'meals']);

export const expenseSchema = z.object({
    id: z.string().uuid(),
    memberId: z.string().uuid(),
    category: expenseCategorySchema,
    description: z.string().max(255).nullable(),
    amount: z.number().positive(),
    date: z.string().or(z.date()),
    isPaid: z.boolean().default(false),
});

export const createExpenseSchema = expenseSchema.omit({ id: true });
export const updateExpenseSchema = createExpenseSchema.partial();

// ============================================
// Login Schema
// ============================================

export const loginSchema = z.object({
    name: z.string().min(1, 'Name ist erforderlich'),
});

// ============================================
// Type Exports
// ============================================

export type MemberType = z.infer<typeof memberTypeSchema>;
export type AdminRole = z.infer<typeof adminRoleSchema>;
export type EventCategory = z.infer<typeof eventCategorySchema>;
export type EventStatus = z.infer<typeof eventStatusSchema>;
export type MealStatus = z.infer<typeof mealStatusSchema>;
export type MealSignupType = z.infer<typeof mealSignupTypeSchema>;
export type AnnouncementCategory = z.infer<typeof announcementCategorySchema>;
export type ExpenseCategory = z.infer<typeof expenseCategorySchema>;

export type MemberInput = z.infer<typeof createMemberSchema>;
export type EventInput = z.infer<typeof createEventSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type MealInput = z.infer<typeof createMealSchema>;
export type MealSignupInput = z.infer<typeof mealSignupSchema>;
export type AnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type ExpenseInput = z.infer<typeof createExpenseSchema>;
