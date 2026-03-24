import { NextResponse } from 'next/server';
import postgres from 'postgres';

export async function GET() {
    const APP_VERSION = process.env.NEXT_PUBLIC_APP_VERSION || '0.2.78';
    const connectionString = process.env.DATABASE_URL;

    interface HealthResult {
        status: 'healthy' | 'degraded' | 'unhealthy';
        version: string;
        timestamp: string;
        components: {
            database: {
                status: 'healthy' | 'unhealthy';
                latencyMs?: number;
                memberCount?: number;
                error?: string;
            };
            calendarSync: {
                status: 'healthy' | 'degraded';
                syncedEvents?: number;
                error?: string;
            };
            api: {
                status: 'healthy';
                environment: 'production' | 'development';
            };
        };
    }

    const healthResult: HealthResult = {
        status: 'healthy',
        version: APP_VERSION,
        timestamp: new Date().toISOString(),
        components: {
            database: { status: 'healthy' },
            calendarSync: { status: 'healthy' },
            api: {
                status: 'healthy',
                environment: process.env.VERCEL ? 'production' : 'development',
            },
        },
    };

    let overallHealthy = true;

    // Database connectivity check
    if (!connectionString) {
        overallHealthy = false;
        healthResult.components.database = {
            status: 'unhealthy',
            error: 'DATABASE_URL not configured',
        };
    } else {
        const sql = postgres(connectionString, { prepare: false });
        try {
            const dbStart = Date.now();
            const result = await sql`SELECT COUNT(*) as count FROM allowed_members`;
            const dbLatency = Date.now() - dbStart;

            healthResult.components.database = {
                status: 'healthy',
                latencyMs: dbLatency,
                memberCount: Number(result[0]?.count) || 0,
            };

            // Check calendar sync (simplified check due to schema version)
            const calResult = await sql`SELECT COUNT(*) as count FROM events`;
            healthResult.components.calendarSync = {
                status: 'healthy',
                syncedEvents: Number(calResult[0]?.count) || 0,
            };

            await sql.end();
        } catch (error) {
            overallHealthy = false;
            healthResult.components.database = {
                status: 'unhealthy',
                error: error instanceof Error ? error.message : 'Unknown error',
            };
            healthResult.components.calendarSync = {
                status: 'degraded',
                error: 'Database connection failed',
            };
        }
    }

    if (!overallHealthy) {
        healthResult.status = 'unhealthy';
    }

    return NextResponse.json(healthResult, {
        status: overallHealthy ? 200 : 500,
    });
}
