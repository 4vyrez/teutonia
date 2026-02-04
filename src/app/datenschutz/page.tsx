import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { FileText } from 'lucide-react';

export default function DatenschutzPage() {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <Header />
            <main className="container mx-auto px-6 py-32 max-w-3xl">
                <h1 className="font-serif text-4xl md:text-5xl font-bold mb-12">Datenschutz</h1>

                <section className="space-y-8 text-gray-400">
                    <p className="text-lg leading-relaxed">
                        Der Schutz Ihrer persönlichen Daten ist uns ein wichtiges Anliegen.
                        Nachfolgend finden Sie unsere ausführliche Datenschutzerklärung als PDF-Dokument.
                    </p>

                    <a
                        href="https://www.kbteutonia.de/datenschutzerklaerung.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 p-6 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/50 hover:bg-white/10 transition-all group"
                    >
                        <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                            <FileText className="w-6 h-6 text-amber-500" />
                        </div>
                        <div>
                            <div className="font-bold text-white text-lg">Datenschutzerklärung herunterladen</div>
                            <div className="text-sm">PDF, ca. 200 KB</div>
                        </div>
                    </a>

                    <div className="pt-12 border-t border-white/5">
                        <h2 className="text-xl font-bold text-white mb-4">Kontakt zum Datenschutzverantwortlichen</h2>
                        <p>
                            Bei Fragen zum Datenschutz wenden Sie sich bitte an:<br />
                            <a href="mailto:admin@kbteutonia.de" className="text-amber-500 hover:underline">admin@kbteutonia.de</a>
                        </p>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}
