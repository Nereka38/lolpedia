'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Champion } from '@/app/types/champions';
import { getAllChampions } from './lib/api';
import './styles/fonts.css';
import { Box, Flex, Text } from '@chakra-ui/react';
import FlipCard from '@/components/FlipCard';
import { styles } from './styles/Home.styles';
import Header from '@/components/Header';

export default function Home() {
  // Estado del componente
  const [champions, setChampions] = useState<Champion[]>([]);
  // Cantidad de campeones visibles
  const [visibleCount, setVisibleCount] = useState(20);
  // Búsqueda por nombre
  const [search, setSearch] = useState('');
  // Filtro por rol
  const [tagFilter, setTagFilter] = useState('');
  // Estado de carga inicial
  const [loading, setLoading] = useState(true);
  // Estado de carga adicional
  const [loadingMore, setLoadingMore] = useState(false);
  // Estado para detectar si es escritorio
  const [, setIsDesktop] = useState(false);
  // Estado para montar el componente
  const [mounted, setMounted] = useState(false);
  // Referencia al loader para infinite scroll
  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Cargar campeones al montar el componente 
  useEffect(() => {
    async function fetchChampions() {
      setLoading(true);
      const fetchedChampions = await getAllChampions();
      setChampions(fetchedChampions);
      setLoading(false);
    }
    fetchChampions();
  }, []);

  // Detectar tamaño de pantalla
  useEffect(() => {
    setMounted(true);
    function handleResize() {
      setIsDesktop(window.innerWidth > 768);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtrar campeones según búsqueda y rol
  const filteredChampions = champions.filter((champ) =>
    champ.name.toLowerCase().includes(search.toLowerCase()) &&
    (tagFilter === '' || champ.tags.includes(tagFilter))
  );

  // Cargar más campeones al hacer scroll
  const loadMore = useCallback(() => {
    if (loadingMore) return;
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 20, filteredChampions.length));
      setLoadingMore(false);
    }, 500);
  }, [filteredChampions.length, loadingMore]);

  // Observador de intersección para infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    );

    const currentRef = loaderRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [loadMore]);

  // Obtener todos los roles disponibles
  const allTags = Array.from(new Set(champions.flatMap(champ => champ.tags)));

  // Evitar renderizado en servidor
  if (!mounted) return null;

  return (
    <Box sx={styles.pageBackground}>
      {/* Cabecera */}
      {mounted && (
        <Header
          search={search}
          setSearch={setSearch}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
          allTags={allTags}
        />
      )}
      {/* Carga */}
      {loading ? (
        <Flex sx={styles.loaderContainer}>
          <Box sx={styles.spinner} aria-label="Loading" />
        </Flex>
      ) : filteredChampions.length === 0 ? (
        <Text sx={styles.noResultsText}>
          No se encontraron campeones con esos filtros.
        </Text>
      ) : (
        <>
          {/* Contenedor de las tarjetas */}
          <Flex sx={styles.cardsWrapper}>
            {filteredChampions.slice(0, visibleCount).map((champ) => (
              <FlipCard key={champ.id} champ={champ} />
            ))}
          </Flex>
          {/* Carga */}
          {visibleCount < filteredChampions.length && (
            <Flex ref={loaderRef} sx={styles.spinnerContainer}>
              {loadingMore && <Box sx={styles.spinner} />}
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}
