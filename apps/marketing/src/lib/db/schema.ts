import { pgTable, uuid, varchar, text, date, time, timestamp, integer, decimal, boolean, pgEnum } from 'drizzle-orm/pg-core';
import { relations, type InferSelectModel, type InferInsertModel } from 'drizzle-orm';

// ============================================
// Enums
// ============================================

export const memberTypeEnum = pgEnum('member_type', ['bursche', 'fux', 'inaktiv', 'employee']);
export const adminRoleEnum = pgEnum('admin_role', ['systemadmin', 'va', 'koch', 'aktivenkasse']);
export const eventCategoryEnum = pgEnum('event_category', ['pflicht', 'freiwillig', 'intern']);
export const eventStatusEnum = pgEnum('event_status', ['ja', 'nein', 'vielleicht']);
export const mealStatusEnum = pgEnum('meal_status', ['active', 'canceled', 'sick', 'vacation']);
export const expenseCategoryEnum = pgEnum('expense_category', ['drinks', 'other', 'meals']);
export const announcementCategoryEnum = pgEnum('announcement_category', ['info', 'urgent', 'event']);

// ============================================
// Members Table
// ============================================

export const members = pgTable('allowed_members', {
    id: uuid('id').primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 100 }),
    surname: varchar('surname', { length: 100 }),
    fullName: varchar('full_name', { length: 200 }),
    memberType: varchar('member_type', { length: 50 }).default('bursche'),
    adminRole: varchar('admin_role', { length: 50 }),
    passwordHash: varchar('password_hash', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const membersRelations = relations(members, ({ many }) => ({
    eventRegistrations: many(eventRegistrations),
    mealSignups: many(mealSignups),
    createdEvents: many(events),
    announcements: many(announcements),
    announcementReads: many(announcementReads),
    expenses: many(expenses),
}));

// ============================================
// Events Table
// ============================================

export const events = pgTable('events', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    date: date('date').notNull(),
    endDate: date('end_date'),
    time: time('time'),
    meetingTime: time('meeting_time'),
    location: varchar('location', { length: 255 }).default('Auf dem Haus'),
    description: text('description'),
    category: varchar('category', { length: 50 }).default('intern'),
    source: varchar('source', { length: 50 }),
    confirmationDeadline: date('confirmation_deadline'),
    createdBy: uuid('created_by').references(() => members.id),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const eventsRelations = relations(events, ({ one, many }) => ({
    creator: one(members, {
        fields: [events.createdBy],
        references: [members.id],
    }),
    registrations: many(eventRegistrations),
}));

// ============================================
// Event Registrations Table
// ============================================

export const eventRegistrations = pgTable('event_registrations', {
    id: uuid('id').primaryKey().defaultRandom(),
    eventId: uuid('event_id').references(() => events.id, { onDelete: 'cascade' }).notNull(),
    memberId: uuid('member_id').references(() => members.id, { onDelete: 'cascade' }).notNull(),
    status: varchar('status', { length: 20 }).default('ja').notNull(),
    confirmed: boolean('confirmed').default(false),
    extras: text('extras'),
    guestCount: integer('guest_count').default(0),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const eventRegistrationsRelations = relations(eventRegistrations, ({ one }) => ({
    event: one(events, {
        fields: [eventRegistrations.eventId],
        references: [events.id],
    }),
    member: one(members, {
        fields: [eventRegistrations.memberId],
        references: [members.id],
    }),
}));

// ============================================
// Meals Table
// ============================================

export const meals = pgTable('meals', {
    id: uuid('id').primaryKey().defaultRandom(),
    year: integer('year').notNull(),
    week: integer('week').notNull(),
    dayIndex: integer('day_index').notNull(),
    vorspeise: varchar('vorspeise', { length: 255 }),
    hauptgericht: varchar('hauptgericht', { length: 255 }),
    nachspeise: varchar('nachspeise', { length: 255 }),
    kochteam: varchar('kochteam', { length: 255 }),
    status: varchar('status', { length: 20 }).default('active'),
    signupDeadline: time('signup_deadline').default('10:00'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const mealsRelations = relations(meals, ({ many }) => ({
    signups: many(mealSignups),
}));

// ============================================
// Meal Signups Table
// ============================================

export const mealSignups = pgTable('meal_signups', {
    id: uuid('id').primaryKey().defaultRandom(),
    mealId: uuid('meal_id').references(() => meals.id, { onDelete: 'cascade' }).notNull(),
    memberId: uuid('member_id').references(() => members.id, { onDelete: 'cascade' }).notNull(),
    types: text('types').array().default([]),
    amount: decimal('amount', { precision: 10, scale: 2 }).default('0'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export const mealSignupsRelations = relations(mealSignups, ({ one }) => ({
    meal: one(meals, {
        fields: [mealSignups.mealId],
        references: [meals.id],
    }),
    member: one(members, {
        fields: [mealSignups.memberId],
        references: [members.id],
    }),
}));

// ============================================
// Announcements Table
// ============================================

export const announcements = pgTable('announcements', {
    id: uuid('id').primaryKey().defaultRandom(),
    title: varchar('title', { length: 255 }).notNull(),
    content: text('content').notNull(),
    authorId: uuid('author_id').references(() => members.id),
    category: varchar('category', { length: 50 }).default('info'),
    isActive: boolean('is_active').default(true),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    expiresAt: timestamp('expires_at', { withTimezone: true }),
});

export const announcementsRelations = relations(announcements, ({ one, many }) => ({
    author: one(members, {
        fields: [announcements.authorId],
        references: [members.id],
    }),
    reads: many(announcementReads),
}));

// ============================================
// Announcement Reads Table
// ============================================

export const announcementReads = pgTable('announcement_reads', {
    id: uuid('id').primaryKey().defaultRandom(),
    announcementId: uuid('announcement_id').references(() => announcements.id, { onDelete: 'cascade' }).notNull(),
    memberId: uuid('member_id').references(() => members.id, { onDelete: 'cascade' }).notNull(),
    readAt: timestamp('read_at', { withTimezone: true }).defaultNow(),
});

export const announcementReadsRelations = relations(announcementReads, ({ one }) => ({
    announcement: one(announcements, {
        fields: [announcementReads.announcementId],
        references: [announcements.id],
    }),
    member: one(members, {
        fields: [announcementReads.memberId],
        references: [members.id],
    }),
}));

// ============================================
// Expenses Table
// ============================================

export const expenses = pgTable('expenses', {
    id: uuid('id').primaryKey().defaultRandom(),
    memberId: uuid('member_id').references(() => members.id, { onDelete: 'cascade' }).notNull(),
    category: varchar('category', { length: 50 }).notNull(),
    description: varchar('description', { length: 255 }),
    amount: decimal('amount', { precision: 10, scale: 2 }).notNull(),
    date: date('date').defaultNow(),
    recordedBy: uuid('recorded_by').references(() => members.id),
    isPaid: boolean('is_paid').default(false),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const expensesRelations = relations(expenses, ({ one }) => ({
    member: one(members, {
        fields: [expenses.memberId],
        references: [members.id],
        relationName: 'memberExpenses',
    }),
    recorder: one(members, {
        fields: [expenses.recordedBy],
        references: [members.id],
        relationName: 'recordedExpenses',
    }),
}));

// ============================================
// Type Exports
// ============================================

export type Member = InferSelectModel<typeof members>;
export type NewMember = InferInsertModel<typeof members>;

export type Event = InferSelectModel<typeof events>;
export type NewEvent = InferInsertModel<typeof events>;

export type EventRegistration = InferSelectModel<typeof eventRegistrations>;
export type NewEventRegistration = InferInsertModel<typeof eventRegistrations>;

export type Meal = InferSelectModel<typeof meals>;
export type NewMeal = InferInsertModel<typeof meals>;

export type MealSignup = InferSelectModel<typeof mealSignups>;
export type NewMealSignup = InferInsertModel<typeof mealSignups>;

export type Announcement = InferSelectModel<typeof announcements>;
export type NewAnnouncement = InferInsertModel<typeof announcements>;

export type AnnouncementRead = InferSelectModel<typeof announcementReads>;
export type NewAnnouncementRead = InferInsertModel<typeof announcementReads>;

export type Expense = InferSelectModel<typeof expenses>;
export type NewExpense = InferInsertModel<typeof expenses>;
