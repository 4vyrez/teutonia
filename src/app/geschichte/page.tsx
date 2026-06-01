import type { Metadata } from 'next';
import { GeschichteView } from './geschichte-view';

export const metadata: Metadata = {
  title: 'Geschichte — Seit 10. Oktober 1843',
  description:
    'Die vollständige Chronik der Karlsruher Burschenschaft Teutonia — von der Gründung 1843 über die Revolution 1848 / 49 bis heute.',
};

export default function GeschichtePage() {
  return <GeschichteView />;
}
