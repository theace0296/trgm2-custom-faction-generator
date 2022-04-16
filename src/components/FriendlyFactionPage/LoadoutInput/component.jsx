import React, { useCallback, useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';

import { LOADOUT_COMMANDS, LOADOUT_DEFAULTS } from '../constants';
import { parseLoadoutFromArsenal, isStringLoadoutFromArsenal } from './utilities';

export const LoadoutInput = ({
  unit,
  unitValues,
  setUnitValues,
  unitValueErrors,
  setUnitValueErrors,
  setFinalUnitValues,
}) => {
  const [t] = useTranslation();
  const [loadoutContainerRef, setLoadoutContainerRef] = useState();
  const importButtonRef = useRef();
  const [importPopoverOpen, setImportPopoverOpen] = useState(false);
  const importedArsenalLoadout = useRef(false);
  const [importContents, setImportContents] = useState('');
  const [importContentsError, setImportContentsError] = useState(null);

  const handleOnChange = useCallback(
    (key, value) => {
      setUnitValues(prevUnitValues => {
        if (!prevUnitValues[unit.key]) {
          prevUnitValues[unit.key] = {};
        }
        if (!value && value !== '') {
          delete prevUnitValues[unit.key][key];
          if (!Object.keys(prevUnitValues[unit.key]).length) {
            delete prevUnitValues[unit.key];
          }
          return prevUnitValues;
        }
        return {
          ...prevUnitValues,
          [unit.key]: {
            ...prevUnitValues[unit.key],
            [key]: value,
          },
        };
      });

      if (Array.isArray(LOADOUT_DEFAULTS[key]) && value && !/^[a-zA-Z0-9_,]*$/.test(value)) {
        setUnitValueErrors(prevUnitValueErrors => {
          if (!prevUnitValueErrors[unit.key]) {
            prevUnitValueErrors[unit.key] = {};
          }
          return {
            ...prevUnitValueErrors,
            [unit.key]: {
              ...prevUnitValueErrors[unit.key],
              [key]: t('invalidConfigEntry'),
            },
          };
        });
        return;
      } else if (!Array.isArray(LOADOUT_DEFAULTS[key]) && value && !/^[a-zA-Z0-9_]*$/.test(value)) {
        setUnitValueErrors(prevUnitValueErrors => {
          if (!prevUnitValueErrors[unit.key]) {
            prevUnitValueErrors[unit.key] = {};
          }
          return {
            ...prevUnitValueErrors,
            [unit.key]: {
              ...prevUnitValueErrors[unit.key],
              [key]: t('invalidConfigEntry'),
            },
          };
        });
        return;
      }
      setUnitValueErrors(prevUnitValueErrors => {
        if (!prevUnitValueErrors[unit.key]) {
          prevUnitValueErrors[unit.key] = {};
        }
        delete prevUnitValueErrors[unit.key][key];
        if (!Object.keys(prevUnitValueErrors[unit.key]).length) {
          delete prevUnitValueErrors[unit.key];
        }
        return prevUnitValueErrors;
      });
    },
    [setUnitValueErrors, setUnitValues, t, unit.key],
  );

  const handleOnBlur = useCallback(() => {
    setUnitValues(prevUnitValues => {
      Object.keys(prevUnitValues[unit.key] ?? {}).forEach(key => {
        if (!prevUnitValues[unit.key][key]) {
          delete prevUnitValues[unit.key][key];
        } else if (prevUnitValues[unit.key][key].endsWith(',')) {
          prevUnitValues[unit.key][key] = prevUnitValues[unit.key][key].slice(-1);
        }
      });
      return prevUnitValues;
    });
    setFinalUnitValues(prevFinalUnitValues => {
      const unitLoadoutValues = { ...unitValues[unit.key] };
      Object.keys(unitLoadoutValues).forEach(key => {
        if (!unitLoadoutValues[key]) {
          delete unitLoadoutValues[key];
        } else if (unitLoadoutValues[key].endsWith(',')) {
          unitLoadoutValues[key] = unitLoadoutValues[key].slice(-1);
        }
      });
      return {
        ...prevFinalUnitValues,
        [unit.key]: unitLoadoutValues,
      };
    });
  }, [setUnitValues, setFinalUnitValues, unit.key, unitValues]);

  const handleImportPopoverOnChange = useCallback(
    e => {
      if (!e.target.value) {
        setImportContents('');
        setImportContentsError(null);
        return;
      }
      setImportContents(e.target.value);
      if (!isStringLoadoutFromArsenal(e.target.value)) {
        setImportContentsError(t('arsenalInputInvalid'));
      } else {
        setImportContentsError(null);
      }
    },
    [t],
  );

  const handleCloseImportPopover = useCallback(() => {
    setImportPopoverOpen(false);
    if (!importContentsError && importContents) {
      Object.entries(parseLoadoutFromArsenal(importContents)).forEach(([key, value]) => {
        handleOnChange(key, value);
      });
    }
    setImportContents('');
    importedArsenalLoadout.current = true;
  }, [handleOnChange, importContents, importContentsError]);

  useEffect(() => {
    if (importedArsenalLoadout.current) {
      handleOnBlur();
      importedArsenalLoadout.current = false;
    }
  }, [handleOnBlur]);

  return (
    <Paper
      elevation={5}
      sx={{ margin: '7px', width: '100%' }}>
      <Box
        ref={setLoadoutContainerRef}
        sx={{
          display       : 'flex',
          flexDirection : 'column',
          justifyContent: 'flex-start',
          alignItems    : 'center',
          padding       : '14px',
          width         : '100%',
        }}>
        <Box
          sx={{
            display       : 'flex',
            flexDirection : 'row',
            justifyContent: 'center',
            alignItems    : 'center',
            width         : '100%',
            paddingBottom : '14px',
          }}>
          <div style={{ flex: '7 1 auto' }} />
          <Typography
            fontWeight="bold"
            variant="body1">
            {t(`friendlyUnitTypes.${unit.value}`)}
          </Typography>
          <div style={{ flex: '6 1 auto' }} />
          <Tooltip title={t('importFromArsenal')}>
            <Button
              ref={importButtonRef}
              variant="contained"
              onClick={() => setImportPopoverOpen(true)}>
              {t('import')}
            </Button>
          </Tooltip>
          <Popover
            anchorEl={importButtonRef.current}
            anchorOrigin={{
              vertical  : 'bottom',
              horizontal: 'right',
            }}
            open={importPopoverOpen}
            transformOrigin={{
              vertical  : 'top',
              horizontal: 'right',
            }}
            onClose={handleCloseImportPopover}>
            <Box sx={{ padding: '7px', width: `${loadoutContainerRef?.getBoundingClientRect()?.width}px` }}>
              <TextField
                error={!!importContentsError}
                fullWidth
                helperText={importContentsError || t('pasteContentsFromArsenalExport')}
                id={`${unit}-popover`}
                label={t('pasteArsenalExport')}
                maxRows={10}
                minRows={10}
                multiline
                value={importContents}
                onChange={handleImportPopoverOnChange} />
            </Box>
          </Popover>
        </Box>
        <Stack
          spacing={1}
          sx={{ width: '100%' }}>
          {Object.keys(LOADOUT_COMMANDS).map(loadoutCommand => (
            <TextField
              key={loadoutCommand}
              error={!!unitValueErrors[unit.key]?.[loadoutCommand]}
              fullWidth
              helperText={
                unitValueErrors[unit.key]?.[loadoutCommand] ??
                t(
                  Array.isArray(LOADOUT_DEFAULTS[loadoutCommand])
                    ? 'unitValueHelperTextMultiple'
                    : 'unitValueHelperTextSingle',
                  { value: LOADOUT_DEFAULTS[loadoutCommand] },
                )
              }
              id={loadoutCommand}
              label={t(`loadoutCommands.${loadoutCommand}`)}
              sx={{ padding: '7px' }}
              value={unitValues[unit.key]?.[loadoutCommand] ?? ''}
              variant="outlined"
              onBlur={handleOnBlur}
              onChange={e => handleOnChange(loadoutCommand, e.target.value)} />
          ))}
        </Stack>
      </Box>
    </Paper>
  );
};

export default LoadoutInput;
