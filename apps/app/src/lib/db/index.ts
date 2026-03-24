import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Lazy database connection - only connect when first accessed
let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;
let _client: ReturnType<typeof postgres> | null = null;

function getConnectionString(): string {
    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL environment variable is not set');
    }
    return connectionString;
}

export function getDb() {
    if (!_db) {
        _client = postgres(getConnectionString(), {
            prepare: false, // Disable prefetch for Vercel/Edge compatibility
        });
        _db = drizzle(_client, { schema });
    }
    return _db;
}

// Export db as a getter for backwards compatibility
export const db = new Proxy({} as ReturnType<typeof drizzle<typeof schema>>, {
    get(_, prop) {
        const database = getDb();
        const value = (database as unknown as Record<string | symbol, unknown>)[prop];
        if (typeof value === 'function') {
            return value.bind(database);
        }
        return value;
    },
});

// Export types
export type Database = ReturnType<typeof getDb>;
