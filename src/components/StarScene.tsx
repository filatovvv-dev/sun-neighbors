import { useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { StarData, stars, raDecToCartesian } from '../data/starsData';
import { Language } from '../i18n/translations';

interface StarMeshProps {
  star: StarData;
  onClick: (star: StarData, position: [number, number, number]) => void;
  isSelected: boolean;
  lang: Language;
}

// Calculate visual size based on radius (logarithmic scale for visibility)
function getVisualSize(radiusSolar: number): number {
  if (radiusSolar >= 1.5) return 0.35; // Giants/subgiants
  if (radiusSolar >= 1.0) return 0.28; // Sun-like
  if (radiusSolar >= 0.5) return 0.22;
  if (radiusSolar >= 0.3) return 0.18;
  if (radiusSolar >= 0.15) return 0.14;
  return 0.10; // Small dwarfs
}

function StarMesh({ star, onClick, isSelected, lang }: StarMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const position = useMemo(() => {
    if (star.id === 'sun') return [0, 0, 0] as [number, number, number];
    return raDecToCartesian(star.ra, star.dec, star.distanceLy);
  }, [star]);

  const size = getVisualSize(star.radiusSolar);

  useFrame(() => {
    if (meshRef.current) {
      // Subtle pulsing for selected star
      if (isSelected) {
        const scale = 1 + Math.sin(Date.now() * 0.003) * 0.1;
        meshRef.current.scale.setScalar(scale);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const handleClick = useCallback((e: any) => {
    e.stopPropagation();
    onClick(star, position);
  }, [star, onClick, position]);

  const handlePointerOver = useCallback((e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  }, []);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    document.body.style.cursor = 'auto';
  }, []);

  const color = new THREE.Color(star.colorHex);

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={hovered ? 1 : 0.9}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <sphereGeometry args={[size * 1.5, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.15}
        />
      </mesh>
      {/* Label on hover */}
      {hovered && !isSelected && (
        <Html
          center
          distanceFactor={15}
          style={{
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          <div className="bg-gray-900/90 text-white px-2 py-1 rounded text-xs border border-gray-600 backdrop-blur-sm">
            {lang === 'ru' && star.nameRu ? star.nameRu : star.name}
          </div>
        </Html>
      )}
    </group>
  );
}

// Distance sphere wireframe
function DistanceSphere() {
  return (
    <group>
      {/* Outer sphere at 15 ly */}
      <mesh>
        <sphereGeometry args={[15, 32, 32]} />
        <meshBasicMaterial
          color="#334155"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
      {/* 10 ly ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[9.95, 10.05, 64]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
      {/* 5 ly ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[4.95, 5.05, 64]} />
        <meshBasicMaterial color="#475569" transparent opacity={0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Axis lines
function AxisLines() {
  const xGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([-15, 0, 0, 15, 0, 0], 3));
    return geo;
  }, []);
  const yGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, -15, 0, 0, 15, 0], 3));
    return geo;
  }, []);
  const zGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, -15, 0, 0, 15], 3));
    return geo;
  }, []);

  return (
    <group>
      <lineSegments geometry={xGeo}>
        <lineBasicMaterial color="#475569" transparent opacity={0.3} />
      </lineSegments>
      <lineSegments geometry={yGeo}>
        <lineBasicMaterial color="#475569" transparent opacity={0.3} />
      </lineSegments>
      <lineSegments geometry={zGeo}>
        <lineBasicMaterial color="#475569" transparent opacity={0.3} />
      </lineSegments>
    </group>
  );
}

// Background stars (very distant, just for ambiance)
function BackgroundStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(3000);
    for (let i = 0; i < 3000; i += 3) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 40 + Math.random() * 20;
      positions[i] = r * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = r * Math.cos(phi);
    }
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial color="#ffffff" size={0.05} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

// Sun marker with label
function SunMarker({ lang, onSunClick }: { lang: Language; onSunClick: () => void }) {
  return (
    <group position={[0, 0, 0]}>
      <mesh
        onClick={(e) => { e.stopPropagation(); onSunClick(); }}
        onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; }}
      >
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#fff4ea" transparent opacity={0.95} />
      </mesh>
      {/* Sun glow */}
      <mesh>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial color="#fff4ea" transparent opacity={0.2} />
      </mesh>
      {/* Sun label - always visible */}
      <Html center distanceFactor={12} style={{ pointerEvents: 'none' }}>
        <div className="bg-yellow-900/70 text-yellow-200 px-2 py-0.5 rounded text-[10px] font-bold border border-yellow-700/50 backdrop-blur-sm whitespace-nowrap">
          {lang === 'ru' ? '☀ Солнце' : '☀ Sun'}
        </div>
      </Html>
    </group>
  );
}

interface SceneProps {
  lang: Language;
  onStarClick: (star: StarData | null) => void;
  selectedStar: StarData | null;
}

function Scene({ lang, onStarClick, selectedStar }: SceneProps) {
  const handleStarClick = useCallback((star: StarData, _position: [number, number, number]) => {
    onStarClick(star);
  }, [onStarClick]);

  const handleSunClick = useCallback(() => {
    const sun = stars.find(s => s.id === 'sun');
    if (sun) onStarClick(sun);
  }, [onStarClick]);

  // Filter out the sun (rendered separately)
  const nonSunStars = useMemo(() => stars.filter(s => s.id !== 'sun'), []);

  return (
    <>
      <ambientLight intensity={0.5} />
      <BackgroundStars />
      <DistanceSphere />
      <AxisLines />
      <SunMarker lang={lang} onSunClick={handleSunClick} />
      {nonSunStars.map((star) => (
        <StarMesh
          key={star.id}
          star={star}
          onClick={handleStarClick}
          isSelected={selectedStar?.id === star.id}
          lang={lang}
        />
      ))}
      <OrbitControls
        enableDamping
        dampingFactor={0.1}
        minDistance={2}
        maxDistance={40}
        enablePan
      />
    </>
  );
}

interface StarSceneProps {
  lang: Language;
  onStarClick: (star: StarData | null) => void;
  selectedStar: StarData | null;
}

export default function StarScene({ lang, onStarClick, selectedStar }: StarSceneProps) {
  return (
    <Canvas
      camera={{ position: [10, 8, 15], fov: 60, near: 0.1, far: 200 }}
      style={{ background: '#0a0a1a' }}
      onPointerMissed={() => onStarClick(null)}
    >
      <Scene lang={lang} onStarClick={onStarClick} selectedStar={selectedStar} />
    </Canvas>
  );
}
