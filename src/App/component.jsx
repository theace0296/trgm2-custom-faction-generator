import React, { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import CssBaseline from '@mui/material/CssBaseline';
import GlobalStyles from '@mui/material/GlobalStyles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import darkThemeLogo from '../images/logo-dark.png';
import lightThemeLogo from '../images/logo-light.png';

import { darkTheme, lightTheme, UNIT_DEFS, UNIT_DEFAULTS } from './constants';

import './component.css';

const a11yProps = index => {
  return {
    id             : `page-tab-${index}`,
    'aria-controls': `page-tabpanel-${index}`,
  };
};

const TabPanel = props => {
  const { children, value, index } = props;
  return (
    <Paper
      aria-labelledby={`page-tab-${index}`}
      elevation={2}
      hidden={value !== index}
      id={`page-tabpanel-${index}`}
      role='tabpanel'
      sx={{ width: '80%', height: '100%', overflow: 'auto', padding: '7px' }}>
      {value === index && children}
    </Paper>
  );
};

export const App = () => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState(prefersDarkMode ? darkTheme : lightTheme);
  const [tabIndex, setTabIndex] = useState(0);
  const [copiedToClipboardAnchorEl, setCopiedToClipboardAnchorEl] = useState(null);
  const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);
  const [unitValues, setUnitValues] = useState({});
  const [unitValueErrors, setUnitValueErrors] = useState({});
  const [finalUnitValues, setFinalUnitValues] = useState({});
  const [unitValuesString, setUnitValuesString] = useState('');

  const handleCopyToClipboardOnClick = useCallback(e => {
    setCopiedToClipboardAnchorEl(e.currentTarget);
    navigator.clipboard.writeText(unitValuesString).then(() => {
      setCopiedToClipboardOpen(true);

      setTimeout(() => {
        setCopiedToClipboardOpen(false);
      }, 3000);
    });
  }, [unitValuesString]);

  const handleGenerateOnClick = useCallback(() => {
    setUnitValuesString(
      Object.entries(finalUnitValues).reduce((acc, [key, value]) => {
        if (value) {
          acc = Array.isArray(UNIT_DEFAULTS[key])
            ? `${acc}${acc.length ? '\n' : ''}${key}=[${value
              .split(',')
              .map(val => `"${val.trim()}"`)
              .join(',')}];`
            : `${acc}${acc.length ? '\n' : ''}${key}="${value.trim()}";`;
        }
        return acc;
      }, ''),
    );
    setTabIndex(1);
  }, [finalUnitValues]);

  const handleResetOnClick = useCallback(() => {
    setUnitValues({});
    setUnitValueErrors({});
    setFinalUnitValues({});
  }, []);

  const handleOnChange = useCallback((key, value) => {
    setUnitValues(prevUnitValues => {
      if (!value && value !== '') {
        delete prevUnitValues[key];
        return prevUnitValues;
      }
      return {
        ...prevUnitValues,
        [key]: value,
      };
    });
    if (Array.isArray(UNIT_DEFAULTS[key]) && value && !/[A-z\d_,]+/.test(value)) {
      setUnitValueErrors(prevUnitValueErrors => ({
        ...prevUnitValueErrors,
        [key]: 'Invalid config entry!',
      }));
      return;
    } else if (value && !/[A-z0-9_]+/.test(value)) {
      setUnitValueErrors(prevUnitValueErrors => ({
        ...prevUnitValueErrors,
        [key]: 'Invalid config entry!',
      }));
      return;
    }
    setUnitValueErrors(prevUnitValueErrors => {
      delete prevUnitValueErrors[key];
      return prevUnitValueErrors;
    });
  }, []);

  const handleOnBlur = useCallback(
    key => {
      setFinalUnitValues(prevFinalUnitValues => ({
        ...prevFinalUnitValues,
        [key]: unitValues[key],
      }));
    },
    [unitValues],
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
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
        }} />
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
          alt='TRGM2'
          src={theme === darkTheme ? darkThemeLogo : lightThemeLogo} />
        <Typography
          component='header'
          variant='h3'>
          Custom Loadout Generator
        </Typography>
        <IconButton
          color='inherit'
          sx={{
            ml      : 1,
            position: 'absolute',
            top     : 0,
            right   : 0,
          }}
          onClick={() => setTheme(prevTheme => (prevTheme === darkTheme ? lightTheme : darkTheme))}>
          {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <Divider />
        <Stack
          direction='row'
          spacing={2}
          sx={{ padding: '7px', width: '50%' }}>
          <Button
            size='large'
            sx={{ width: '50%' }}
            variant='contained'
            onClick={handleGenerateOnClick}>
            Generate
          </Button>
          <Button
            size='large'
            sx={{ width: '50%' }}
            variant='contained'
            onClick={handleResetOnClick}>
            Reset
          </Button>
        </Stack>
        <Divider />
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            aria-label='Page'
            value={tabIndex}
            onChange={(e, idx) => setTabIndex(idx)}>
            <Tab
              label='Faction Editor'
              {...a11yProps(0)} />
            <Tab
              label='Output'
              {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel
          index={0}
          value={tabIndex}>
          <Box
            sx={{
              display       : 'flex',
              flexDirection : 'column',
              justifyContent: 'flex-start',
              alignItems    : 'center',
              padding       : '14px',
            }}>
            <Typography
              sx={{ padding: '0px 0px 14px 0px' }}
              variant='h5'>
              Enemy Faction Configuration
            </Typography>
            {Object.entries(UNIT_DEFS).map(([key, value]) =>
              value !== '~' ? (
                <TextField
                  key={key}
                  error={!!unitValueErrors[key]}
                  fullWidth
                  helperText={unitValueErrors[key] ?? `Default: ${UNIT_DEFAULTS[key]}${Array.isArray(UNIT_DEFAULTS[key]) ? ' (mutliples seperated by \',\')' : ''}`}
                  id={key}
                  label={value}
                  sx={{ padding: '7px' }}
                  value={unitValues[key] ?? ''}
                  variant='outlined'
                  onBlur={() => handleOnBlur(key)}
                  onChange={e => handleOnChange(key, e.target.value)} />
              ) : (
                <Divider key={key} />
              ),
            )}
          </Box>
        </TabPanel>
        <TabPanel
          index={1}
          value={tabIndex}>
          <Popper
            anchorEl={copiedToClipboardAnchorEl}
            open={copiedToClipboardOpen}
            placement='left'
            transition>
            {({ TransitionProps }) => (
              <Fade
                {...TransitionProps}
                timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>Copied to clipboard.</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
          <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <IconButton
              color='inherit'
              sx={{
                ml      : 1,
                position: 'relative',
                top     : 0,
                right   : 0,
              }}
              onClick={handleCopyToClipboardOnClick}>
              <ContentCopyIcon />
            </IconButton>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={Object.keys(UNIT_DEFS).length}
            sx={{ padding: '7px' }}
            value={unitValuesString}
            variant='filled' />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default App;
