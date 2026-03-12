import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import { legalPageContent, siteMeta } from '@/content/public-site';
import { PublicShell } from '@/components/public/public-shell';

const content = legalPageContent.privacy;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function DatenschutzPage() {
  return (
    <PublicShell compactHeader>
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-8 md:px-8 lg:pb-28">
        <div className="rounded-[2rem] border border-white/80 bg-white/82 p-8 shadow-[0_36px_120px_rgba(101,73,44,0.1)] backdrop-blur md:p-10">
          <div className="text-xs font-semibold uppercase tracking-[0.28em] text-primary/75">
            Rechtliches
          </div>
          <h1 className="mt-4 font-serif text-5xl text-slate-900 md:text-6xl">{content.title}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">{content.description}</p>

          <div className="mt-10 grid gap-6">
            <section className="rounded-[1.6rem] border border-[#e7dccb] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,238,226,0.9))] p-6">
              <div className="inline-flex rounded-full border border-primary/12 bg-primary/6 p-3 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-slate-900">
                Datenschutzerklärung als PDF
              </h2>
              <p className="mt-3 leading-7 text-slate-700">
                Die ausführliche Datenschutzerklärung steht auf der bisherigen Seite als PDF zur
                Verfügung und bleibt darüber erreichbar.
              </p>
              <a
                href="https://www.kbteutonia.de/datenschutzerklaerung.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5"
              >
                PDF öffnen
              </a>
            </section>

            <section className="rounded-[1.6rem] border border-stone-200 bg-stone-50/75 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Ansprechpartner</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Fragen zum Datenschutz können an{' '}
                <a
                  href={`mailto:${siteMeta.emails.privacy}`}
                  className="text-primary transition-colors hover:text-primary/80"
                >
                  {siteMeta.emails.privacy}
                </a>{' '}
                gerichtet werden.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
