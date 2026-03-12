import type { Metadata } from 'next';
import { publicPages } from '@/content/public-site';
import { PublicPageTemplate } from '@/components/public/public-page-template';

const content = publicPages.veranstaltungen;

export const metadata: Metadata = {
  title: 'Veranstaltungen & Programm',
  description: content.description,
};

export default function VeranstaltungenPage() {
  return <PublicPageTemplate content={content} />;
}
