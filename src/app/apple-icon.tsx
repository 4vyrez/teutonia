import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(155deg, #b73a3a 0%, #5e2020 55%, #1a0c0a 100%)',
        color: '#f1ece1',
        fontFamily: 'Georgia, serif',
      }}
    >
      <div
        style={{
          fontStyle: 'italic',
          fontSize: 110,
          lineHeight: 1,
          letterSpacing: '-0.04em',
        }}
      >
        T
      </div>
      <div
        style={{
          marginTop: 8,
          fontSize: 13,
          letterSpacing: '0.3em',
          color: '#d1a64a',
          textTransform: 'uppercase',
        }}
      >
        1843
      </div>
    </div>,
    { ...size },
  );
}
