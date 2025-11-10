'use client';

import { Box, Text, Image, VStack } from '@chakra-ui/react';
import { motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Champion } from '@/app/types/champions';
import { roleIcons, roleTranslations } from '@/app/utils/roles';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';
import { useSoundEnabled } from '@/app/hooks/useSoundEnabled';
import { styles } from './FlipCard.styles';

const MotionBox = motion(Box);

export default function FlipCard({ champ }: { champ: Champion }) {
    // Si el mouse está sobre la tarjeta
    const [hovered, setHovered] = useState(false);
    // Si la tarjeta está volteada por teclado
    const [flipped, setFlipped] = useState(false);
    // Referencia para animación inView
    const ref = useRef<HTMLDivElement>(null);
    // Detecta si la tarjeta está visible en pantalla
    const isInView = useInView(ref, { once: true });
    // Referencia al audio del campeón
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Hook global para sonido
    const { soundEnabled, toggleSound, setSoundEnabled } = useSoundEnabled();

    // Cargar audio del campeón
    useEffect(() => {
        const audio = new Audio('/audios/VoicyLol.mp3');
        audio.preload = 'auto';
        audioRef.current = audio;
    }, []);

    // Forzar que el sonido esté apagado al cargar la tarjeta
    useEffect(() => {
        setSoundEnabled(false);
    }, [setSoundEnabled]);

    // Cuando el mouse entra en la tarjeta
    const handleMouseEnter = () => {
        setHovered(true);
        if (!soundEnabled) return;
        audioRef.current?.play().catch(() => { });
    };

    // Cuando el mouse sale de la tarjeta
    const handleMouseLeave = () => {
        setHovered(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    // Cuando se hace click en la tarjeta
    const handleClick = () => {
        if (!soundEnabled) return;
        audioRef.current?.play().catch(() => { });
    };

    // Manejo de teclado para voltear la tarjeta
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFlipped(prev => !prev);
            if (soundEnabled) audioRef.current?.play().catch(() => { });
        }
    };

    // Renderizado de roles del campeón
    const renderRoles = (roles) => (
        <>
            {roles.map((role) => (
                <Text key={role} fontSize="sm" color="gray.400">
                    {roleIcons[role] || ""} {roleTranslations[role] || ""}
                </Text>
            ))}
        </>
    );

    return (
        <>
            {/* Botón del sonido */}
            <Box sx={styles.soundContainer}
                onClick={toggleSound}
                role="button"
                aria-pressed={soundEnabled}
                aria-label={soundEnabled ? 'Silenciar sonido' : 'Activar sonido'}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggleSound();
                    }
                }}>
                {soundEnabled ? (
                    <LuVolume2 color="#C8AA6E" size={24} />
                ) : (
                    <LuVolumeX color="#A0A0A0" size={24} />
                )}
            </Box>
            {/* Carta */}
            <Box
                sx={styles.cardContainer}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleClick}
                role="button"
                aria-label={`Tarjeta de ${champ.name}. Presiona para reproducir sonido.`}
                tabIndex={0}
                onKeyDown={handleKeyDown}
            >
                <MotionBox
                    animate={{
                        opacity: isInView ? 1 : 0,
                        y: isInView ? 0 : 50,
                        rotateY: hovered || flipped ? 180 : 0,
                    }}
                    transition={{ duration: 0.6 }}
                    initial={{ opacity: 0, y: 50 }}
                    style={{ width: '100%', height: '100%', transformStyle: 'preserve-3d', position: 'relative' }}
                    ref={ref}
                >
                    {/* Cara frontal */}
                    <Box
                        sx={styles.front}
                        style={{ backfaceVisibility: 'hidden', position: 'absolute', width: '100%', height: '100%' }}
                    >
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
                            alt={`${champ.name} (frontal)`}
                            sx={styles.frontImage}
                        />
                        <Image src="/img/card-border.png" alt="Borde" sx={styles.borderImage} />
                        <Box sx={styles.frontOverlay}>
                            <Text as="h1" sx={styles.frontTitle}>
                                {champ.name}
                            </Text>
                        </Box>
                    </Box>
                    {/* Cara posterior */}
                    <Box
                        sx={styles.back}
                        style={{
                            backfaceVisibility: 'hidden',
                            transform: 'rotateY(180deg)',
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                        }}
                    >
                        <Image
                            src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.id}_0.jpg`}
                            alt={`${champ.name} (posterior)`}
                            sx={styles.backImage}
                        />
                        <Image src="/img/card-border.png" alt="Borde de la carta" sx={styles.borderImage} />
                        <Box sx={styles.backContent}>
                            <Text sx={styles.backName}>{champ.name}</Text>
                            <Text sx={styles.backTitle}>
                                {champ.title.charAt(0).toUpperCase() + champ.title.slice(1)}
                            </Text>
                            {renderRoles(champ.tags)}
                        </Box>
                    </Box>
                </MotionBox>
            </Box>
        </>
    );
}