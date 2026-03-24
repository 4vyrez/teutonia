import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getMemberByName } from '@/lib/services/members';

export async function POST(request: NextRequest) {
    try {
        const { name } = await request.json();

        if (!name || typeof name !== 'string') {
            return NextResponse.json(
                { error: 'Name ist erforderlich' },
                { status: 400 }
            );
        }

        // Find member by name
        const member = await getMemberByName(name.trim());

        if (!member) {
            return NextResponse.json(
                { error: 'Mitglied nicht gefunden. Bitte überprüfe deinen Namen.' },
                { status: 401 }
            );
        }

        // Create session data
        const sessionData = {
            id: member.id,
            firstName: member.firstName,
            surname: member.surname,
            fullName: member.fullName,
            memberType: member.memberType,
            adminRole: member.adminRole,
        };

        // Set session cookie (simple approach - production should use proper session management)
        const cookieStore = await cookies();
        cookieStore.set('session', JSON.stringify(sessionData), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        return NextResponse.json({
            success: true,
            user: sessionData,
        });
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Anmeldung fehlgeschlagen. Bitte versuche es später erneut.' },
            { status: 500 }
        );
    }
}
