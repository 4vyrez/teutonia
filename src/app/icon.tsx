import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(155deg, #b73a3a 0%, #5e2020 60%, #2a1410 100%)',
          color: '#f1ece1',
          fontFamily: 'Georgia, serif',
          fontStyle: 'italic',
          fontSize: 22,
          fontWeight: 500,
          letterSpacing: '-0.02em',
          border: '1.5px solid #d1a64a',
          borderRadius: 4,
        }}
      >
        T
      </div>
    ),
    { ...size },
  );
}
