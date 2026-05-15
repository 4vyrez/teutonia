import { ImageResponse } from 'next/og';
import { siteConfig } from '@/lib/site-config';

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 72,
          background:
            'linear-gradient(135deg, #1a1410 0%, #2a1d14 55%, #5a2820 100%)',
          color: '#f1ece1',
          fontFamily: 'Georgia, serif',
        }}
      >
        {/* Backdrop accents */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 600,
            height: 600,
            background:
              'radial-gradient(ellipse at top right, rgba(209, 166, 74, 0.18) 0%, transparent 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 700,
            height: 500,
            background:
              'radial-gradient(ellipse at bottom left, rgba(183, 58, 58, 0.30) 0%, transparent 60%)',
          }}
        />

        {/* Top eyebrow */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 18,
            letterSpacing: '0.32em',
            textTransform: 'uppercase',
            color: '#d1a64a',
          }}
        >
          <div
            style={{
              width: 56,
              height: 1.5,
              background: '#d1a64a',
            }}
          />
          Karlsruher Burschenschaft · seit 1843
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 'auto',
            fontSize: 84,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            maxWidth: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <span>Mehr als ein Zimmer.</span>
          <span style={{ fontStyle: 'italic', color: '#d1a64a' }}>
            Eine Lerngemeinschaft seit 1843.
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            marginTop: 48,
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div
              style={{
                fontSize: 17,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#b4a78f',
              }}
            >
              20 Zimmer · 17 m² · ab 280 € · Parkstraße 1
            </div>
            <div
              style={{
                fontSize: 22,
                fontStyle: 'italic',
                color: '#f1ece1',
              }}
            >
              kbteutonia.de
            </div>
          </div>
          <div
            style={{
              fontSize: 17,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: '#a07c30',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 4,
            }}
          >
            <span>KB! Teutonia</span>
            <span style={{ color: '#7c7264' }}>Karlsruhe</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
