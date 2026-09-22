'use client';

import { useEffect, useRef, useState } from 'react';

const trackUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

export function WeddingAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.35;
    audio.loop = true;
    audio.play().catch(() => {
      setIsPlaying(false);
    });
  }, []);

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play();
      setIsPlaying(true);
      return;
    }

    audio.pause();
    setIsPlaying(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      <button
        type="button"
        onClick={toggleAudio}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d3b16c] bg-[#fffdf9]/90 text-lg shadow-lg shadow-[#312b28]/10 backdrop-blur-sm transition hover:scale-105"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        {isPlaying ? '♫' : '🔇'}
      </button>
      <audio ref={audioRef} autoPlay loop playsInline preload="auto" src={trackUrl} />
    </div>
  );
}
