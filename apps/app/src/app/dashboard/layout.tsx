'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@teutonia/shared';
import { Avatar, AvatarFallback } from '@teutonia/shared/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@teutonia/shared/components/ui/dropdown-menu';
import { Badge } from '@teutonia/shared/components/ui/badge';
import {
    Calendar,
    Utensils,
    Users,
    CreditCard,
    Settings,
    LogOut,
    Bell,
    Home,
    Menu,
    X,
} from 'lucide-react';
import type { UserSession } from '@/lib/types';

const navItems = [
    { href: '/dashboard', label: 'Übersicht', icon: Home },
    { href: '/dashboard/events', label: 'Veranstaltungen', icon: Calendar },
    { href: '/dashboard/meals', label: 'Mittagessen', icon: Utensils },
    { href: '/dashboard/members', label: 'Mitglieder', icon: Users, adminOnly: true },
    { href: '/dashboard/expenses', label: 'Aktivenkasse', icon: CreditCard, adminOnly: true },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<UserSession | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        async function checkSession() {
            try {
                const res = await fetch('/api/auth/session');
                const data = await res.json();
                if (data.user) {
                    setUser(data.user);
                } else {
                    router.push('/login');
                }
            } catch {
                router.push('/login');
            } finally {
                setIsLoading(false);
            }
        }
        checkSession();
    }, [router]);

    const handleLogout = async () => {
        await fetch('/api/auth/logout', { method: 'POST' });
        router.push('/login');
    };

    const filteredNavItems = navItems.filter(
        (item) => !item.adminOnly || user?.adminRole
    );

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="w-8 h-8 border-3 border-amber-500/30 border-t-amber-500 rounded-full animate-spin" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    const initials = user.firstName && user.surname
        ? `${user.firstName[0]}${user.surname[0]}`
        : user.fullName?.split(' ').map(n => n[0]).join('').slice(0, 2) || '??';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Top Navigation */}
            <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 z-50 flex items-center px-4 lg:px-6">
                {/* Mobile menu button */}
                <button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2"
                >
                    {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Logo */}
                <Link href="/dashboard" className="flex items-center gap-2 font-serif">
                    <span className="text-lg font-bold text-amber-600">KB!</span>
                    <span className="text-lg font-semibold text-gray-900 hidden sm:inline">Teutonia</span>
                </Link>

                <div className="flex-1" />

                {/* Notifications */}
                <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg mr-2 relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-3 p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                            <Avatar className="w-8 h-8">
                                <AvatarFallback className="bg-gradient-to-br from-amber-500 to-amber-400 text-white text-sm font-medium">
                                    {initials}
                                </AvatarFallback>
                            </Avatar>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-900">{user.fullName}</p>
                                <div className="flex items-center gap-1">
                                    <Badge variant="outline" className="text-xs py-0 h-4">
                                        {user.memberType}
                                    </Badge>
                                    {user.adminRole && (
                                        <Badge className="text-xs py-0 h-4 bg-amber-100 text-amber-700 hover:bg-amber-100">
                                            {user.adminRole}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <div className="px-2 py-1.5 text-sm">
                            <p className="font-medium">{user.fullName}</p>
                            <p className="text-gray-500">{user.adminRole || user.memberType}</p>
                        </div>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings" className="flex items-center gap-2">
                                <Settings className="w-4 h-4" />
                                Einstellungen
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600">
                            <LogOut className="w-4 h-4 mr-2" />
                            Abmelden
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>

            {/* Sidebar */}
            <aside
                className={cn(
                    'fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 z-40 transition-transform lg:translate-x-0',
                    isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                )}
            >
                <nav className="p-4 space-y-1">
                    {filteredNavItems.map((item) => {
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsSidebarOpen(false)}
                                className={cn(
                                    'flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all',
                                    isActive
                                        ? 'bg-amber-50 text-amber-700'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                )}
                            >
                                <item.icon className={cn('w-5 h-5', isActive && 'text-amber-600')} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* Version */}
                <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs text-gray-400 font-mono">
                        v{process.env.NEXT_PUBLIC_APP_VERSION || '0.2.78'}
                    </span>
                </div>
            </aside>

            {/* Mobile sidebar overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="pt-16 lg:pl-64">
                <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="p-6"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
