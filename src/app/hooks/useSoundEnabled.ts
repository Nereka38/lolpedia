'use client';
import { useState, useEffect } from 'react';

export function useSoundEnabled() {
    const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('soundEnabled') === 'true';
        }
        return false;
    });

    useEffect(() => {
        // Escucha cambios en localStorage desde cualquier pestaña o componente
        const syncSound = () => {
            const value = localStorage.getItem('soundEnabled') === 'true';
            setSoundEnabled(value);
        };
        window.addEventListener('storage', syncSound);
        return () => window.removeEventListener('storage', syncSound);
    }, []);

    const toggleSound = () => {
        const newValue = !soundEnabled;
        setSoundEnabled(newValue);
        localStorage.setItem('soundEnabled', String(newValue));
        // fuerza el evento de sync incluso dentro de la misma pestaña
        window.dispatchEvent(new Event('storage'));
    };

    return { soundEnabled, toggleSound, setSoundEnabled };
}