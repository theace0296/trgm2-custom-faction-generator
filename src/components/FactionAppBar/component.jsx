import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useTheme from '@mui/material/styles/useTheme';
import AppBar from '@mui/material/AppBar';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';

import { FACTION_TYPES } from '../App';
import { DRAWER_WIDTH } from './constants';

export const FactionAppBar = ({ drawerOpen, setDrawerOpen, selectedFaction, setSelectedFaction }) => {
  const [t] = useTranslation();
  const theme = useTheme();
  const [appBarRef, setAppBarRef] = useState();

  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, [setDrawerOpen]);

  const handleSetSelectedFactionOnClick = useCallback(
    value => {
      setSelectedFaction(value);
      localStorage.setItem('trgm2-selected-faction', value);
    },
    [setSelectedFaction],
  );

  return (
    <Box sx={{ width: '100%', display: 'flex' }}>
      <AppBar
        ref={setAppBarRef}
        position="static"
        sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Tooltip title={t('openMenu')}>
            <IconButton
              aria-label={t('menu')}
              color="inherit"
              edge="start"
              size="large"
              sx={{ mr: 2 }}
              onClick={toggleDrawerOpen}>
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Typography
            component="div"
            sx={{ flexGrow: 1 }}
            variant="h6">
            {t(selectedFaction)}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={drawerOpen}
        PaperProps={{ elevation: 3 }}
        sx={{
          width               : DRAWER_WIDTH,
          flexShrink          : 0,
          '& .MuiDrawer-paper': {
            width    : DRAWER_WIDTH,
            boxSizing: 'border-box',
            top      : appBarRef?.getBoundingClientRect()?.top + appBarRef?.getBoundingClientRect()?.height,
            left     : appBarRef?.getBoundingClientRect()?.left,
          },
        }}
        variant="persistent">
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {Object.entries(FACTION_TYPES).map(([key, value]) => (
              <Tooltip
                key={key}
                placement="right"
                title={t(`${value}FactionPage`)}>
                <ListItem
                  button
                  onClick={() => handleSetSelectedFactionOnClick(value)}>
                  <ListItemText primary={t(value)} />
                </ListItem>
              </Tooltip>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
};

export default FactionAppBar;
