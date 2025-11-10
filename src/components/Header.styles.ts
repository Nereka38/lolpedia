import { SystemStyleObject } from '@chakra-ui/react';

export const styles: Record<string, SystemStyleObject> = {
  header: {
    bg: 'rgba(24, 38, 31, 0.6)',
    backdropFilter: 'blur(10px)',
    width: '100%',
    py: 4,
    px: 4,
    boxShadow: 'md',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: { base: 'column', md: 'row' },
    gap: 4,
  },
  logoContainer: {
    direction: 'column',
    alignItems: 'center',
    maxW: '140px',
  },
  searchWrapper: {
    alignItems: 'center',
    gap: 2,
    flex: 1,
    justifyContent: 'flex-end',
  },
  searchBox: {
    alignItems: 'center',
    bg: '#1e1e1e',
    borderRadius: 'xl',
    border: '1px solid #C8AA6E',
    px: 2,
    height: '44px',
  },
  input: {
    border: 'none',
    bg: 'transparent',
    color: 'white',
    _placeholder: { color: 'gray.500', fontFamily: 'inherit' },
    _focus: { boxShadow: 'none' },
  },
  filterButton: {
    h: '44px',
    borderRadius: 'xl',
    ml: 2,
    _hover: { bg: '#2a2a2a', color: 'white' },
  },
  drawerContent: {
    bg: '#1e1e1e',
    color: 'white',
  },
  drawerHeader: {
    borderBottom: '1px solid #C8AA6E',
  },
  drawerButton: {
    w: '100%',
    borderRadius: 'xl',
    _hover: { bg: '#A2874D', color: 'black' },
  },
  getFilterButtonStyle: (active: boolean): SystemStyleObject => ({
    bg: active ? '#C8AA6E' : '#1e1e1e',
    color: active ? 'black' : 'white',
    border: active ? '1px solid #1e1e1e' : '1px solid #C8AA6E',
  }),
  getDrawerButtonStyle: (active: boolean): SystemStyleObject => ({
    bg: active ? '#C8AA6E' : '#2a2a2a',
    color: active ? 'black' : 'white',
  }),
};
