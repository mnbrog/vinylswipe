import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import RecordPlayerModel from './RecordPlayerModel.jsx';
import RecordStoreEnvironment from './RecordStoreEnvironment.jsx';
import ControlOverlay from './ControlOverlay.jsx';

export default function ThreeDRecordPlayer({
  album,
  onAddToCrate = () => {},
  onAddToShelf = () => {},
  onGenreSelect = () => {},
  onInfoToggle = () => {},
  onPlayAudio = () => {},
  playing: playingProp,
  className = '',
}) {
  const [internalPlaying, setInternalPlaying] = useState(false);
  const [lifted, setLifted] = useState(false);
  const timerRef = useRef(null);

  const playing = playingProp !== undefined ? playingProp : internalPlaying;
  const setPlaying = playingProp !== undefined ? () => {} : setInternalPlaying;

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  const togglePlay = () => {
    if (!playing) {
      setLifted(true);
      timerRef.current = setTimeout(() => setPlaying(true), 600);
      onPlayAudio();
    } else {
      setPlaying(false);
      onPlayAudio();
    }
  };
  const handleView = () => setLifted((v) => !v);

  return (
    <div className={`${className} w-screen h-[80vh]`}>
      <Canvas shadows camera={{ position: [0, 5, 8], fov: 50 }}>
        <ambientLight intensity={0.3} color="#ffdda8" />
        <pointLight position={[2, 4, 2]} intensity={0.6} color="#ffcc88" castShadow />
        <directionalLight position={[-5, 8, 5]} intensity={0.4} color="#ffae66" castShadow />
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
          onAddCrate={() => onAddToCrate(album)}
          onAddShelf={() => onAddToShelf(album)}
        />
        <OrbitControls enablePan={false} />
      </Canvas>
    </div>
  );
}
