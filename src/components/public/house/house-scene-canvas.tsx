'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PresentationControls, useGLTF } from '@react-three/drei';

function HouseModel({ src }: { src: string }) {
  const { scene } = useGLTF(src);

  return <primitive object={scene} scale={1.2} />;
}

export function HouseSceneCanvas({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[radial-gradient(circle_at_top,rgba(113,43,40,0.12),transparent_45%),linear-gradient(180deg,rgba(255,248,240,0.98),rgba(241,232,220,0.95))]">
      <Canvas camera={{ position: [0, 1.4, 4.2], fov: 38 }}>
        <color attach="background" args={['#f7efe4']} />
        <ambientLight intensity={1.2} />
        <directionalLight position={[6, 8, 4]} intensity={1.3} />
        <spotLight position={[-4, 8, 2]} intensity={0.8} angle={0.45} penumbra={0.5} />
        <Suspense fallback={null}>
          <PresentationControls
            global
            rotation={[0.08, -0.4, 0]}
            polar={[-0.2, 0.25]}
            azimuth={[-0.6, 0.6]}
            speed={1.3}
          >
            <HouseModel src={src} />
          </PresentationControls>
          <Environment preset="city" />
        </Suspense>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.4}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
        />
      </Canvas>

      {poster ? (
        <div className="pointer-events-none absolute bottom-4 left-4 rounded-full border border-white/70 bg-white/75 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-primary/70 backdrop-blur">
          Poster: {poster.split('/').pop()}
        </div>
      ) : null}
    </div>
  );
}
