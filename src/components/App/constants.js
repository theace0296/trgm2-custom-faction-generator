import createTheme from '@mui/material/styles/createTheme';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width : '4px',
          height: '4px',
        },
      },
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '*': {
          'scrollbar-width': 'thin',
        },
        '*::-webkit-scrollbar': {
          width : '4px',
          height: '4px',
        },
      },
    },
  },
});

export const getScrollbarStyles = theme => ({
  '::-webkit-scrollbar': {
    width          : '14px',
    backgroundColor: theme.palette.primary.main,
    borderRadius   : `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
  },
  '::-webkit-scrollbar-track': {
    boxShadow      : theme.shadows[12],
    WebkitBoxShadow: theme.shadows[12],
    backgroundColor: theme.palette.grey[700],
    borderRadius   : `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
  },
  '::-webkit-scrollbar-thumb': {
    boxShadow      : theme.shadows[12],
    WebkitBoxShadow: theme.shadows[12],
    backgroundColor: theme.palette.primary.main,
    borderRadius   : `0px ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px 0px`,
  },
});

export const FACTION_TYPES = {
  ENEMY   : 'enemy',
  FRIENDLY: 'friendly',
};
