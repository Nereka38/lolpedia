import { SystemStyleObject } from '@chakra-ui/react';

export const styles: Record<string, SystemStyleObject> = {
  soundContainer: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    bg: '#00000099', 
    borderRadius: 'full',
    p: 3,
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    _hover: {
      bg: '#FFFFFF26', 
    },
  },

  cardContainer: {
    maxWidth: '308px',
    cursor: 'pointer',
    width: '308px',
    height: '560px',
    perspective: '1000px',
  },

  motionBox: {
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    position: 'relative',
  },

  front: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    borderRadius: 'md',
    overflow: 'hidden',
    sx: { backfaceVisibility: 'hidden' },
    zIndex: 2,
  },

  frontImage: {
    objectFit: 'cover',
    position: 'absolute',
    top: '6%',
    left: '11%',
    width: '78%',
    height: '86%',
    zIndex: 1,
    borderRadius: '58px',
  },

  borderImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 2,
  },

  frontOverlay: {
    position: 'absolute',
    bottom: '8%',
    left: '11%',
    width: '78%',
    height: '30%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    borderBottomRadius: '56px',
    background: 'linear-gradient(to top, #000000CC, #00000000)', 
    zIndex: 1,
  },

  frontTitle: {
    fontSize: 'xl',
    fontWeight: 'bold',
    color: '#F6E05E', 
    textShadow: '3px 3px 6px #000000', 
    mb: '14px',
  },

  back: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    boxSizing: 'border-box',
    borderRadius: 'md',
    overflow: 'hidden',
    sx: {
      backfaceVisibility: 'hidden',
      transform: 'rotateY(180deg)',
    },
    zIndex: 1,
  },

  backImage: {
    objectFit: 'cover',
    position: 'absolute',
    top: '5%',
    left: '11%',
    width: '78%',
    height: '88%',
    zIndex: 1,
    borderRadius: '56px',
    filter: 'brightness(0.4)',
  },

  backContent: {
    position: 'absolute',
    bottom: '200px',
    left: '16px',
    right: '16px',
    p: 9,
    textAlign: 'center',
    zIndex: 3,
  },

  backName: {
    fontSize: '2xl',
    fontWeight: 'bold',
    color: '#F6E05E', 
    mb: 2,
  },

  backTitle: {
    fontSize: 'md',
    color: '#D1D5DB', 
    fontStyle: 'italic',
    mb: 2,
    fontFamily: 'SpiegelSans-5Regular_TRIAL',
  },
};
