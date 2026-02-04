import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

export default function ImpressumPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Header />
            <main className="container mx-auto px-6 py-32 max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12">Impressum</h1>

                <section className="space-y-8 text-gray-400">
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Angaben gemäß § 5 TMG</h2>
                        <p>
                            Karlsruher Burschenschaft Teutonia<br />
                            Parkstraße 1<br />
                            76131 Karlsruhe
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Kontakt</h2>
                        <p>
                            Telefon: 0721 - 66 777 348<br />
                            E-Mail: <a href="mailto:chargen@kbteutonia.de" className="text-amber-500 hover:underline">chargen@kbteutonia.de</a>
                        </p>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Vertreten durch</h2>
                        <p>
                            Die Aktivitas der Karlsruher Burschenschaft Teutonia.<br />
                            Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV.
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
