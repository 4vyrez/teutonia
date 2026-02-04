// Re-export all types from schema and validations
export * from '../db/schema';
export * from '../validations/schemas';

// ============================================
// API Response Types
// ============================================

export interface ApiResponse<T> {
    data?: T;
    error?: string;
    message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    pageSize: number;
}

// ============================================
// Session Types
// ============================================

export interface UserSession {
    id: string;
    firstName: string | null;
    surname: string | null;
    fullName: string | null;
    memberType: string;
    adminRole: string | null;
}

export interface AuthState {
    user: UserSession | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

// ============================================
// Dashboard Types
// ============================================

export interface DashboardStats {
    upcomingEvents: number;
    unconfirmedEvents: number;
    memberCount: number;
    activeAnnouncements: number;
}

export interface HealthStatus {
    status: 'healthy' | 'degraded' | 'unhealthy';
    version: string;
    timestamp: string;
    components: {
        database: ComponentHealth;
        calendarSync: ComponentHealth;
        api: ComponentHealth;
    };
}

export interface ComponentHealth {
    status: 'healthy' | 'degraded' | 'unhealthy';
    latencyMs?: number;
    memberCount?: number;
    syncedEvents?: number;
    lastSync?: string;
    environment?: string;
    error?: string;
}

// ============================================
// Role & Permission Types
// ============================================

export type MemberRole = 'bursche' | 'fux' | 'inaktiv' | 'employee';
export type AdminRole = 'systemadmin' | 'va' | 'koch' | 'aktivenkasse' | null;

export interface RoleConfig {
    label: string;
    color: string;
    permissions: string[];
}

export const MEMBER_ROLES: Record<MemberRole, RoleConfig> = {
    bursche: {
        label: 'Aktiver Bursche',
        color: '#8B0000',
        permissions: ['view:events', 'register:events', 'view:meals', 'signup:meals'],
    },
    fux: {
        label: 'Fux',
        color: '#3498db',
        permissions: ['view:events', 'register:events', 'view:meals', 'signup:meals'],
    },
    inaktiv: {
        label: 'Inaktiver Bursche',
        color: '#6b6b6b',
        permissions: ['view:events', 'view:meals'],
    },
    employee: {
        label: 'Angestellter',
        color: '#9b59b6',
        permissions: ['view:meals'],
    },
};

export const ADMIN_ROLES: Record<NonNullable<AdminRole>, RoleConfig> = {
    systemadmin: {
        label: 'Systemadmin',
        color: '#D4AF37',
        permissions: ['*'],
    },
    va: {
        label: 'Veranstaltungsleiter',
        color: '#3498db',
        permissions: ['manage:events', 'view:members'],
    },
    koch: {
        label: 'Koch',
        color: '#27ae60',
        permissions: ['manage:meals', 'view:signups'],
    },
    aktivenkasse: {
        label: 'Aktivenkasse',
        color: '#9b59b6',
        permissions: ['manage:expenses', 'view:members'],
    },
};
