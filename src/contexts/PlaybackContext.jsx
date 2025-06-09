import React, { createContext, useContext, useState, useRef } from 'react';

const PlaybackContext = createContext();

export function PlaybackProvider({ children }) {
  const audioRef = useRef(new Audio());
  const [track, setTrack] = useState(null);
  const [isPlaying, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  const playTrack = url => {
    if (!url) return;
    if (audioRef.current.src !== url) {
      audioRef.current.src = url;
    }
    audioRef.current.play();
    setPlaying(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlaying(false);
  };

  const toggle = () => {
    if (isPlaying) pause();
    else if (track) playTrack(track);
  };

  const setTrackUrl = url => {
    setTrack(url);
    playTrack(url);
  };

  const setVol = v => {
    audioRef.current.volume = v;
    setVolume(v);
  };

  return (
    <PlaybackContext.Provider value={{ track, isPlaying, volume, playTrack: setTrackUrl, pause, toggle, setVolume: setVol }}>
      {children}
    </PlaybackContext.Provider>
  );
}

export const usePlayback = () => useContext(PlaybackContext);
