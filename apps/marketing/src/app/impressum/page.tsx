import type { Metadata } from 'next';
import { legalPageContent, siteMeta } from '@/content/public-site';
import { PublicShell } from '@/components/public/public-shell';

const content = legalPageContent.impressum;

export const metadata: Metadata = {
  title: content.title,
  description: content.description,
};

export default function ImpressumPage() {
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
            <section className="rounded-[1.6rem] border border-stone-200 bg-stone-50/75 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Angaben gemäß § 5 TMG</h2>
              <div className="mt-4 space-y-1 leading-7 text-slate-700">
                {siteMeta.address.map((line) => (
                  <div key={line}>{line}</div>
                ))}
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-stone-200 bg-stone-50/75 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Kontakt</h2>
              <div className="mt-4 space-y-2 leading-7 text-slate-700">
                <div>
                  Telefon:{' '}
                  <a href="tel:+4972166777348" className="text-primary transition-colors hover:text-primary/80">
                    {siteMeta.phone}
                  </a>
                </div>
                <div>
                  E-Mail:{' '}
                  <a
                    href={`mailto:${siteMeta.emails.general}`}
                    className="text-primary transition-colors hover:text-primary/80"
                  >
                    {siteMeta.emails.general}
                  </a>
                </div>
              </div>
            </section>

            <section className="rounded-[1.6rem] border border-stone-200 bg-stone-50/75 p-6">
              <h2 className="text-xl font-semibold text-slate-900">Vertretung</h2>
              <p className="mt-4 leading-7 text-slate-700">
                Die Aktivitas der Karlsruher Burschenschaft Teutonia. Verantwortlich für den
                Inhalt nach § 55 Abs. 2 RStV ist die jeweilige Aktivitas des Bundes.
              </p>
            </section>
          </div>
        </div>
      </section>
    </PublicShell>
  );
}
