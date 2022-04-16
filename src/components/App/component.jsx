import React, { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

import darkThemeLogo from '../../images/logo-dark.png';
import lightThemeLogo from '../../images/logo-light.png';
import FactionAppBar, { DRAWER_WIDTH } from '../FactionAppBar';
import EnemyFactionPage from '../EnemyFactionPage';
import FriendlyFactionPage from '../FriendlyFactionPage';

import { darkTheme, lightTheme, getScrollbarStyles, FACTION_TYPES } from './constants';

export const App = () => {
  const [t] = useTranslation();
  const [selectedFaction, setSelectedFaction] = useState(
    localStorage.getItem('trgm2-selected-faction') || FACTION_TYPES.ENEMY,
  );
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const themedLogo = useMemo(() => {
    if (theme.palette.mode === 'dark') {
      return darkThemeLogo;
    }
    return lightThemeLogo;
  }, [theme]);

  const toggleThemeIcon = useMemo(
    () => (theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />),
    [theme],
  );

  const toggleTheme = useCallback(
    () => setTheme(prevTheme => (prevTheme.palette.mode === 'dark' ? lightTheme : darkTheme)),
    [],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles styles={getScrollbarStyles(theme)} />
      <Box
        sx={{
          display       : 'flex',
          flexDirection : 'column',
          justifyContent: 'flex-start',
          alignItems    : 'center',
          bgcolor       : 'background.default',
          color         : 'text.primary',
          width         : '100%',
          height        : '100%',
          padding       : '14px',
        }}>
        <img
          alt="TRGM2"
          src={themedLogo} />
        <Typography
          component="header"
          variant="h3">
          {t('customLoadoutGenerator')}
        </Typography>
        <Tooltip title={t('toggleTheme')}>
          <IconButton
            color="inherit"
            sx={{
              ml      : 1,
              position: 'absolute',
              top     : 0,
              right   : 0,
            }}
            onClick={toggleTheme}>
            {toggleThemeIcon}
          </IconButton>
        </Tooltip>
        <Divider />
        <FactionAppBar
          drawerOpen={drawerOpen}
          selectedFaction={selectedFaction}
          setDrawerOpen={setDrawerOpen}
          setSelectedFaction={setSelectedFaction} />
        <Paper
          square
          sx={{
            width     : '100%',
            height    : '80%',
            flexGrow  : 1,
            padding   : theme.spacing(3),
            transition: theme.transitions.create(['margin', 'width'], {
              easing  : theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: 0,
            ...(drawerOpen && {
              width     : `calc(100% - ${DRAWER_WIDTH}px)`,
              transition: theme.transitions.create(['margin', 'width'], {
                easing  : theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
              }),
              marginLeft: `${DRAWER_WIDTH}px`,
            }),
          }}
          variant="outlined">
          {selectedFaction === FACTION_TYPES.ENEMY && <EnemyFactionPage />}
          {selectedFaction === FACTION_TYPES.FRIENDLY && <FriendlyFactionPage />}
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default App;
