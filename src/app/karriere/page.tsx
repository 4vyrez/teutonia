import type { Metadata } from 'next';
import { publicPages } from '@/content/public-site';
import { PublicPageTemplate } from '@/components/public/public-page-template';

const content = publicPages.karriere;

export const metadata: Metadata = {
  title: 'Netzwerk & Karriere',
  description: content.description,
};

export default function KarrierePage() {
  return <PublicPageTemplate content={content} />;
}
