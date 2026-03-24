import type { Metadata } from 'next';
import { publicPages } from '@/content/public-site';
import { PublicPageTemplate } from '@/components/public/public-page-template';

const content = publicPages.studium;

export const metadata: Metadata = {
  title: 'Studium & Bildung',
  description: content.description,
};

export default function StudiumPage() {
  return <PublicPageTemplate content={content} />;
}
