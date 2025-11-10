// theme.ts
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'BeaufortforLOL-Regular, sans-serif',
    body: 'BeaufortforLOL-Regular, sans-serif',
  },
  colors: {
    gold: '#C8AA6E',
    darkBlue: '#0A1428',
    grayText: '#9CA3AF',
  },
  styles: {
    global: {
      body: {
        bg: '#0A1428',
        color: 'white',
      },
      a: {
        color: 'gold',
        _hover: {
          color: '#A2874D',
        },
      },
    },
  },
});

export default theme;