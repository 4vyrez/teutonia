import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import type { UserSession } from '@/lib/types';

export async function GET() {
    try {
        const cookieStore = await cookies();
        const sessionCookie = cookieStore.get('session');

        if (!sessionCookie) {
            return NextResponse.json({ user: null });
        }

        const session: UserSession = JSON.parse(sessionCookie.value);
        return NextResponse.json({ user: session });
    } catch {
        return NextResponse.json({ user: null });
    }
}
