import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RecordPlayerModel from './RecordPlayerModel.jsx';
import RecordStoreEnvironment from './RecordStoreEnvironment.jsx';
import ControlOverlay from './ControlOverlay.jsx';

export default function ThreeDRecordPlayer({
  album,
  onAddToCrate = () => {},
  onGenreSelect = () => {},
  onInfoToggle = () => {},
  className = '',
}) {
  const [playing, setPlaying] = useState(false);
  const [lifted, setLifted] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const togglePlay = () => {
    if (!playing) {
      setLifted(true);
      timerRef.current = setTimeout(() => setPlaying(true), 600);
    } else {
      setPlaying(false);
    }
  };
  const handleView = () => setLifted((v) => !v);

  return (
    <div className={`${className} w-screen h-[80vh]`}>
      <Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
        <RecordStoreEnvironment />
        <RecordPlayerModel
          album={album}
          playing={playing}
          lifted={lifted}
          onGenreSelect={onGenreSelect}
        />
        <ControlOverlay
          playing={playing}
          onPlayPause={togglePlay}
          onView={handleView}
          onInfo={onInfoToggle}
          onAdd={() => onAddToCrate(album)}
        />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
