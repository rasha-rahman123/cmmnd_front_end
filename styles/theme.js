// example theme.js
export default {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [
      12, 14, 16, 20, 24, 32, 48, 64
    ],
    colors: {
      blue: '#07c',
      lightgray: '#f6f6ff',
      background: '#FFF',
      primary: 'black'
    },
    space: [
      0, 4, 8, 16, 32, 64, 128, 256
    ],
    fonts: {
      body: 'system-ui, sans-serif',
      heading: 'inherit',
      monospace: 'Menlo, monospace',
    },
    fontWeights: {
      body: 400,
      heading: 700,
      bold: 700,
    },
    lineHeights: {
      body: 1.5,
      heading: 1.25,
    },
    shadows: {
      small: '0 0 4px rgba(0, 0, 0, .125)',
      large: '0 0 24px rgba(0, 0, 0, .125)'
    },
    variants: {
    },
    text: {
      color: 'primary'
    },
    buttons: {
      primary: {
        color: 'white',
        bg: 'primary',
        cursor: 'pointer',
        width: 150,
        height: '2rem',
        alignSelf: 'center',
        ":hover": {
          bg: '#00000060'
        }
      },

      secondary: {
        color: 'primary',
        fontStyle: 'italic',
        bg: '#FFFFFF00',
        cursor: 'pointer',
        width: 150,
        height: '2rem',
        alignSelf: 'center',
        borderRadius: 0,
        textDecoration: 'underline',
        ":hover": {
          textDecoration: 'none'
        }
      }


    }
  }
