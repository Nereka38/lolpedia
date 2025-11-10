'use client';

import {
    Flex,
    Input,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    IconButton,
} from "@chakra-ui/react";
import { CloseIcon, SearchIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { roleIcons, roleTranslations } from '@/app/utils/roles';
import { useEffect, useRef } from "react";
import { useSoundEnabled } from "@/app/hooks/useSoundEnabled";
import { styles } from './Header.styles';

// Props que recibe el Header
interface HeaderProps {
    search: string; // valor del input de búsqueda
    setSearch: (value: string) => void; // función para actualizar el input
    tagFilter: string; // rol seleccionado como filtro
    setTagFilter: (value: string) => void; // función para actualizar el rol
    allTags: string[]; // lista de roles disponibles
}

export default function Header({ search, setSearch, tagFilter, setTagFilter, allTags }: HeaderProps) {
    // useDisclosure controla la apertura/cierre del Drawer
    const { isOpen, onOpen, onClose } = useDisclosure();
    // Referencia al audio para reproducir efectos de sonido
    const audioRef = useRef<HTMLAudioElement | null>(null);
    // Hook personalizado para sonido global
    const { soundEnabled } = useSoundEnabled();

    // Cargar audio para efecto al abrir/cerrar Drawer
    if (typeof window !== 'undefined' && !audioRef.current) {
        audioRef.current = new Audio('/audios/filterSound.mp3');
        audioRef.current.preload = 'auto';
    }
    // Reproducir sonido si está habilitado
    const playSound = () => {
        if (!soundEnabled) return;
        audioRef.current?.play().catch(() => { });
    };
    // Manejo de apertura del Drawer con sonido
    const handleOpen = () => { playSound(); onOpen(); };
    // Manejo de cierre del Drawer con sonido
    const handleClose = () => { playSound(); onClose(); };
    // Manejo de selección de rol y cierre del Drawer
    const handleFilterSelect = (tag: string) => { playSound(); setTagFilter(tag); onClose(); };

    return (
        <Flex as="header" sx={styles.header}>
            {/* Logo */}
            <Flex sx={styles.logoContainer}>
                <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }} style={{ width: '100%' }}>
                    <Image src="/img/logo-header.png" alt="LOLpedia logo" width={180} height={60} objectFit="contain" />
                </motion.div>
            </Flex>
            {/* Buscador + Drawer */}
            <Flex sx={styles.searchWrapper}>
                {/* Contenedor del buscador */}
                <Flex sx={styles.searchBox}>
                    <SearchIcon color="gray.400" mr={2} aria-hidden="true" />
                    <Input
                        aria-label="Buscar campeón"
                        type="text"
                        placeholder="Buscar campeón..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        sx={styles.input}
                    />
                    {/* Botón de limpiar búsqueda solo visible si hay texto */}
                    {search && (
                        <IconButton
                            aria-label="Limpiar búsqueda"
                            icon={<CloseIcon />}
                            size="sm"
                            variant="ghost"
                            color="white"
                            onClick={() => setSearch('')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    setSearch('');
                                }
                            }}
                        />
                    )}
                </Flex>
                {/* Botón que abre el Drawer de filtros */}
                <Button
                    onClick={handleOpen}
                    aria-expanded={isOpen}
                    aria-controls="drawer-filters"
                    sx={{ ...styles.filterButton, ...styles.getFilterButtonStyle(!!tagFilter) }}
                >
                    {tagFilter ? `${roleIcons[tagFilter]} ${roleTranslations[tagFilter]}` : 'Filtrar por rol'}
                </Button>
                {/* Drawer que contiene los filtros por rol */}
                <Drawer placement="right"
                    onClose={handleClose}
                    isOpen={isOpen}
                    size="sm" id="drawer-filters"
                    returnFocusOnClose
                    trapFocus>
                    <DrawerOverlay />
                    <DrawerContent sx={styles.drawerContent}>
                        <DrawerCloseButton aria-label="Cerrar filtros" />
                        <DrawerHeader sx={styles.drawerHeader}>Filtros por rol</DrawerHeader>
                        <DrawerBody>
                            <Flex direction="column" gap={3}>
                                {/* Botón "Todos" */}
                                <Button
                                    sx={{ ...styles.drawerButton, ...styles.getDrawerButtonStyle(tagFilter === '') }}
                                    onClick={() => handleFilterSelect('')}
                                    aria-pressed={tagFilter === ''}
                                >
                                    Todos
                                </Button>
                                {/* Botones para cada rol */}
                                {allTags.map((tag) => (
                                    <Button
                                        key={tag}
                                        sx={{ ...styles.drawerButton, ...styles.getDrawerButtonStyle(tagFilter === tag) }}
                                        onClick={() => handleFilterSelect(tag)}
                                        aria-pressed={tagFilter === tag}
                                    >
                                        {roleIcons[tag]} {roleTranslations[tag]}
                                    </Button>
                                ))}
                            </Flex>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Flex>
        </Flex>
    );
}
