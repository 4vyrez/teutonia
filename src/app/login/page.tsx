'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { LogIn, Shield } from 'lucide-react';

export default function LoginPage() {
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login fehlgeschlagen');
            }

            toast.success('Erfolgreich eingeloggt!');
            router.push('/dashboard');
        } catch (error) {
            toast.error(error instanceof Error ? error.message : 'Login fehlgeschlagen');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[radial-gradient(circle_at_top_left,rgba(122,47,43,0.28),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(198,168,117,0.18),transparent_38%),linear-gradient(160deg,#1a0f0e,#2c1410_45%,#1e1210)] p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0">
                    <CardHeader className="text-center pb-2">
                        <div className="w-16 h-16 bg-[linear-gradient(135deg,rgba(122,47,43,1),rgba(160,65,58,1))] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-[0_12px_32px_rgba(122,47,43,0.35)]">
                            <Shield className="w-8 h-8 text-white" />
                        </div>
                        <CardTitle className="font-serif text-2xl">
                            <span className="text-primary">KB!</span> Teutonia
                        </CardTitle>
                        <CardDescription className="text-gray-600">
                            Mitgliederbereich
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-6">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Vor- und Nachname"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    autoComplete="name"
                                    className="h-12 focus-visible:ring-primary/40"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading || !name}
                                className="btn-shimmer w-full h-12 bg-[oklch(0.47_0.105_28)] hover:bg-[oklch(0.43_0.11_28)] text-white font-semibold shadow-[0_8px_24px_rgba(122,47,43,0.3)]"
                            >
                                {isLoading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Anmelden...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        <LogIn className="w-4 h-4" />
                                        Anmelden
                                    </span>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link
                                href="/"
                                className="text-sm text-gray-500 hover:text-primary transition-colors"
                            >
                                ← Zurück zur Startseite
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                <p className="text-center text-white/30 text-xs mt-6 font-mono">
                    v{process.env.NEXT_PUBLIC_APP_VERSION || '0.2.78'}
                </p>
            </motion.div>
        </div>
    );
}
