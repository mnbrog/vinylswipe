import React, { useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import RecordPlayerModel from './RecordPlayerModel.jsx';
import RecordStoreEnvironment from './RecordStoreEnvironment.jsx';
import ControlOverlay from './ControlOverlay.jsx';
import FlyingAlbum from './FlyingAlbum.jsx';

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
  const [currentAlbum, setCurrentAlbum] = useState(album);
  const [flying, setFlying] = useState(null);
  const [hiddenIdx, setHiddenIdx] = useState(null);
  const timerRef = useRef(null);

  const playing = playingProp !== undefined ? playingProp : internalPlaying;
  const setPlaying = playingProp !== undefined ? () => {} : setInternalPlaying;

  useEffect(() => {
    return () => timerRef.current && clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    setCurrentAlbum(album);
  }, [album]);

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
  const handleAlbumSelect = (a, pos, idx) => {
    setFlying({ album: a, from: pos });
    setHiddenIdx(idx);
  };

  const handleFlyEnd = () => {
    if (flying) {
      const { title, artist, bio, genre, image } = flying.album;
      setCurrentAlbum({ title, artist, bio, genre, coverUrl: image });
      setFlying(null);
      setHiddenIdx(null);
      setLifted(true);
      timerRef.current = setTimeout(() => setPlaying(true), 600);
      onPlayAudio();
    }
  };

  return (
    <div className={`${className} w-screen h-[80vh]`}>
      <Canvas shadows>
        {/* Replaces default camera: flipped 180° on X */}
        <PerspectiveCamera 
          makeDefault 
          position={[0, .4, 6]} 
          rotation={[0, 0, 0]} 
          fov={50} 
        />

        <ambientLight intensity={0.3} color="#ffdda8" />
        <pointLight position={[2, 4, 2]} intensity={0.6} color="#ffcc88" castShadow />
        <directionalLight position={[-5, 8, 5]} intensity={0.4} color="#ffae66" castShadow />
        
        {/* ADJUSTED: RecordStoreEnvironment positioned to align tan shelf with record player's gray bottom */}
        <group position={[0, 1.0, -3]}>
          <RecordStoreEnvironment onSelectAlbum={handleAlbumSelect} hiddenIndex={hiddenIdx} />
        </group>
        
        {flying && (
          <FlyingAlbum
            album={flying.album}
            from={flying.from}
            to={[0, 1.5, -9.2]}
            onEnd={handleFlyEnd}
          />
        )}
        
        <group position={[0, -0.2, -8.2]}>
          <RecordPlayerModel
            album={currentAlbum}
            playing={playing}
            lifted={lifted}
            onGenreSelect={onGenreSelect}
          />
        </group>
        
        <ControlOverlay
          playing={playing}
          onPlayPause={togglePlay}
          onView={handleView}
          onInfo={onInfoToggle}
          onAddCrate={() => onAddToCrate(currentAlbum)}
          onAddShelf={() => onAddToShelf(currentAlbum)}
        />

        <OrbitControls 
          enablePan={false} 
          makeDefault 
          minPolarAngle={0} 
          maxPolarAngle={Math.PI * 2} 
        />
      </Canvas>
    </div>
  );
}
