import React, { useState, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
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
import Tooltip from '@mui/material/Tooltip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

import TabPanel from '../TabPanel';
import { a11yProps } from '../../utilities';

import { UNIT_DEFS, UNIT_DEFAULTS, FRIENDLY_UNIT_TYPES, OTHER_OBJECTS, LOADOUT_DEFAULTS } from './constants';
import LoadoutInput from './LoadoutInput';

export const FriendlyFactionPage = () => {
  const [t] = useTranslation();

  const [tabIndex, setTabIndex] = useState(0);
  const [copiedToClipboardAnchorEl, setCopiedToClipboardAnchorEl] = useState(null);
  const [copiedToClipboardOpen, setCopiedToClipboardOpen] = useState(false);
  const [unitValues, setUnitValues] = useState(
    localStorage.getItem('trgm2-enemy-loadout-values')
      ? JSON.parse(localStorage.getItem('trgm2-enemy-loadout-values'))
      : {},
  );
  const [unitValueErrors, setUnitValueErrors] = useState(
    localStorage.getItem('trgm2-enemy-loadout-errors')
      ? JSON.parse(localStorage.getItem('trgm2-enemy-loadout-errors'))
      : {},
  );
  const [finalUnitValues, setFinalUnitValues] = useState(
    localStorage.getItem('trgm2-enemy-loadout-final')
      ? JSON.parse(localStorage.getItem('trgm2-enemy-loadout-final'))
      : {},
  );
  const [unitValuesString, setUnitValuesString] = useState(localStorage.getItem('trgm2-enemy-loadout-string') || '');

  useEffect(() => {
    localStorage.setItem('trgm2-enemy-loadout-values', JSON.stringify(unitValues));
    localStorage.setItem('trgm2-enemy-loadout-errors', JSON.stringify(unitValueErrors));
    localStorage.setItem('trgm2-enemy-loadout-final', JSON.stringify(finalUnitValues));
    localStorage.setItem('trgm2-enemy-loadout-string', unitValuesString);
  }, [finalUnitValues, unitValueErrors, unitValues, unitValuesString]);

  const handleCopyToClipboardOnClick = useCallback(
    e => {
      setCopiedToClipboardAnchorEl(e.currentTarget);
      navigator.clipboard.writeText(unitValuesString).then(() => {
        setCopiedToClipboardOpen(true);

        setTimeout(() => {
          setCopiedToClipboardOpen(false);
        }, 3000);
      });
    },
    [unitValuesString],
  );

  const handleGenerateOnClick = useCallback(() => {
    setUnitValuesString(
      Object.entries(finalUnitValues).reduce((acc, [key, value]) => {
        if (value && OTHER_OBJECTS.includes(key) && !unitValueErrors[key]) {
          if (!/^OtherObjects:\n/gm.test(acc)) {
            acc = `${acc}${acc.length ? '\n' : ''}#\nOtherObjects:`;
          }
          acc = Array.isArray(UNIT_DEFAULTS[key])
            ? `${acc}${acc.length ? '\n' : ''}${key}=[${value
              .split(',')
              .map(val => `""${val.trim()}""`)
              .join(',')}];`
            : `${acc}${acc.length ? '\n' : ''}${key}=${value.trim()};`;
        } else if (value && typeof value === 'object' && Object.keys(value).length && !unitValueErrors[key]) {
          if (!RegExp(`^${key}:\n`, 'gm').test(acc)) {
            acc = `${acc}${acc.length ? '\n' : ''}#\n${key}:`;
          }
          Object.entries(value).forEach(([loadoutKey, loadoutValue]) => {
            if (Array.isArray(LOADOUT_DEFAULTS[loadoutKey])) {
              loadoutValue.split(',').forEach(loadoutVal => {
                acc = `${acc}${acc.length ? '\n' : ''}${loadoutKey}=${loadoutVal.trim()};`;
              });
            } else {
              acc = `${acc}${acc.length ? '\n' : ''}${loadoutKey}=${loadoutValue.trim()};`;
            }
          });
        }
        return acc;
      }, ''),
    );
    setTabIndex(1);
  }, [finalUnitValues, unitValueErrors]);

  const handleResetOnClick = useCallback(() => {
    setUnitValues({});
    setUnitValueErrors({});
    setFinalUnitValues({});
  }, []);

  const handleOnChange = useCallback(
    (key, value) => {
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

      if (Array.isArray(UNIT_DEFAULTS[key]) && value && !/^[a-zA-Z0-9_]*$/.test(value)) {
        setUnitValueErrors(prevUnitValueErrors => ({
          ...prevUnitValueErrors,
          [key]: t('invalidConfigEntry'),
        }));
        return;
      } else if (!Array.isArray(UNIT_DEFAULTS[key]) && value && !/^[a-zA-Z0-9_]*$/.test(value)) {
        setUnitValueErrors(prevUnitValueErrors => ({
          ...prevUnitValueErrors,
          [key]: t('invalidConfigEntry'),
        }));
        return;
      }
      setUnitValueErrors(prevUnitValueErrors => {
        delete prevUnitValueErrors[key];
        return prevUnitValueErrors;
      });
    },
    [t],
  );

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
    <Box
      sx={{
        width         : '100%',
        height        : '98%',
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        flexDirection : 'column',
      }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          aria-label={t('tab')}
          value={tabIndex}
          onChange={(e, idx) => setTabIndex(idx)}>
          <Tab
            label={t('factionEditor')}
            {...a11yProps(0)} />
          <Tab
            label={t('output')}
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
          <Box
            sx={{
              display       : 'flex',
              flexDirection : 'row',
              justifyContent: 'center',
              alignItems    : 'center',
              width         : '100%',
            }}>
            <Typography variant="h5">{t('friendlyFactionConfiguration')}</Typography>
            <div style={{ flex: '1 1 auto' }} />
            <Stack
              direction="row"
              spacing={2}
              sx={{ padding: '7px' }}>
              <Tooltip title={t('generateFactionLoadout')}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleGenerateOnClick}>
                  {t('generate')}
                </Button>
              </Tooltip>
              <Tooltip title={t('resetFactionLoadout')}>
                <Button
                  size="large"
                  variant="contained"
                  onClick={handleResetOnClick}>
                  {t('reset')}
                </Button>
              </Tooltip>
            </Stack>
          </Box>
          {Object.entries(UNIT_DEFS).map(([key, value]) =>
            !key.includes('~') && !FRIENDLY_UNIT_TYPES.includes(key) ? (
              <TextField
                key={key}
                error={!!unitValueErrors[key]}
                fullWidth
                helperText={
                  unitValueErrors[key] ??
                  t(Array.isArray(UNIT_DEFAULTS[key]) ? 'unitValueHelperTextMultiple' : 'unitValueHelperTextSingle', {
                    value: UNIT_DEFAULTS[key],
                  })
                }
                id={key}
                label={t(`friendlyUnitTypes.${key}`)}
                sx={{ padding: '7px' }}
                value={unitValues[key] ?? ''}
                variant="outlined"
                onBlur={() => handleOnBlur(key)}
                onChange={e => handleOnChange(key, e.target.value)} />
            ) : !key.includes('~') ? (
              <LoadoutInput
                key={key}
                setFinalUnitValues={setFinalUnitValues}
                setUnitValueErrors={setUnitValueErrors}
                setUnitValues={setUnitValues}
                unit={{ key, value }}
                unitValueErrors={unitValueErrors}
                unitValues={unitValues} />
            ) : (
              <Divider key={key}>
                <Typography
                  fontWeight="bold"
                  variant="body1">
                  {t(`friendlyUnitTypes.${value}`)}
                </Typography>
              </Divider>
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
          placement="left"
          transition>
          {({ TransitionProps }) => (
            <Fade
              {...TransitionProps}
              timeout={350}>
              <Paper>
                <Typography sx={{ p: 2 }}>{t('copiedToClipboard')}</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
        <Box
          sx={{
            display       : 'flex',
            flexDirection : 'column',
            justifyContent: 'flex-start',
            alignItems    : 'center',
            padding       : '14px',
          }}>
          <Box
            sx={{
              display       : 'flex',
              flexDirection : 'row',
              justifyContent: 'center',
              alignItems    : 'center',
              width         : '100%',
            }}>
            <Typography variant="h5">{t('output')}</Typography>
            <div style={{ flex: '1 1 auto' }} />
            <Tooltip
              placement="left"
              title={t('copyToClipboard')}>
              <IconButton
                color="inherit"
                onClick={handleCopyToClipboardOnClick}>
                <ContentCopyIcon />
              </IconButton>
            </Tooltip>
          </Box>
          <TextField
            fullWidth
            multiline
            rows={unitValuesString.split('\n').length}
            sx={{ padding: '7px' }}
            value={unitValuesString}
            variant="filled" />
        </Box>
      </TabPanel>
    </Box>
  );
};

export default FriendlyFactionPage;
