// app/utils/hoverAudio.ts

// Manejo de audio para hover con desbloqueo basado en interacción del usuario
let audio: HTMLAudioElement | null = null;
let unlocked = false;
let loaded = false;

// Inicializa el audio de hover
export function initHoverAudio(src = '/audios/VoicyLol.mp3') {
  if (typeof window === 'undefined') return;
  if (audio) return;

  audio = new Audio(src);
  audio.preload = 'auto';
  audio.load();

  audio.addEventListener('canplaythrough', () => {
    loaded = true;
    console.log('hoverAudio: canplaythrough');
  });

  // Intento de autoplay silencioso (muted). A veces desbloquea la reproducción.
  audio.muted = true;
  audio.play()
    .then(() => {
      // Si esto tiene éxito, pausamos y marcamos como desbloqueado
      audio!.pause();
      audio!.currentTime = 0;
      audio!.muted = false;
      unlocked = true;
      console.log('hoverAudio: autoplay muted ok — unlocked');
    })
    .catch((err) => {
      // No se pudo: esperar interacción del usuario (fallback).
      audio!.muted = false;
      unlocked = false;
      console.warn('hoverAudio: autoplay muted failed (will wait for user gesture)', err);
    });

  // Añadimos un listener de click único como fallback para intentar desbloquear
  const tryEnableOnClick = async () => {
    try {
      // intenta reproducir una vez (será gesto del usuario)
      await audio!.play();
      audio!.pause();
      audio!.currentTime = 0;
      unlocked = true;
      console.log('hoverAudio: unlocked via user click');
    } catch (e) {
      console.warn('hoverAudio: enable on click failed', e);
    } finally {
      document.removeEventListener('click', tryEnableOnClick);
    }
  };
  document.addEventListener('click', tryEnableOnClick);
}

export function isHoverAudioUnlocked() {
  return unlocked;
}

export function playHoverAudio() {
  if (!audio) return;
  if (!unlocked) {
    // intento seguro: intentar play y atrapar error
    audio.currentTime = 0;
    audio.play().catch((e) => {
      // no desplegamos error en UI: se usará el botón de activar sonido
      // console.warn('hoverAudio play blocked', e);
    });
    return;
  }
  audio.currentTime = 0;
  audio.play().catch((e) => {
    console.warn('hoverAudio play error', e);
  });
}
