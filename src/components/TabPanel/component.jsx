import React from 'react';
import Paper from '@mui/material/Paper';

export const TabPanel = props => {
  const { children, value, index } = props;
  return (
    <Paper
      aria-labelledby={`page-tab-${index}`}
      elevation={2}
      hidden={value !== index}
      id={`page-tabpanel-${index}`}
      role="tabpanel"
      sx={{ width: '80%', height: '100%', overflow: 'auto', padding: '7px' }}>
      {value === index && children}
    </Paper>
  );
};

export default TabPanel;
