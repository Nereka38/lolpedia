import { SystemStyleObject } from '@chakra-ui/react';
import { keyframes } from '@emotion/react';

// Animación del spinner
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;


export const styles: Record<string, SystemStyleObject> = {
  pageBackground: {
    minHeight: '100vh',
    color: 'white',
    fontFamily: "'BeaufortforLOL-Regular', sans-serif",
    backgroundImage: "url('/img/background6.jpg')",
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundBlendMode: 'darken',
    display: 'flex',
    flexDirection: 'column',
  },
  loaderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '60vh',
  },
  noResultsText: {
    fontSize: '18px',
    color: '#9CA3AF',
    textAlign: 'center',
    mt: 8,
  },
  cardsWrapper: {
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 6,
    p: 4,
    width: '100%',
    maxWidth: '1440px',
    mx: 'auto',
  },
  spinnerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    py: 10,
  },
  spinner: {
    width: '60px',
    height: '60px',
    border: '6px solid #C8AA6E',
    borderTop: '6px solid transparent',
    borderRadius: '50%',
    animation: `${spin} 1s linear infinite`,
  },
};