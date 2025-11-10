'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Ajusta volumen
      audioRef.current.play().catch((err) => {
        // Algunos navegadores bloquean autoplay
        console.log('Autoplay bloqueado, espera interacción del usuario', err);
      });
    }
  }, []);

  return (
    <audio ref={audioRef} loop>
      <source src="/audio/ambient.mp3" type="audio/mp3" />
      Tu navegador no soporta el audio.
    </audio>
  );
}
