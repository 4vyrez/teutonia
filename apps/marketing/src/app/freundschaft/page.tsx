import type { Metadata } from 'next';
import { publicPages } from '@/content/public-site';
import { PublicPageTemplate } from '@/components/public/public-page-template';

const content = publicPages.freundschaft;

export const metadata: Metadata = {
  title: 'Lebensbund & Freundschaft',
  description: content.description,
};

export default function FreundschaftPage() {
  return <PublicPageTemplate content={content} />;
}
