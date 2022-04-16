export const a11yProps = index => {
  return {
    id             : `page-tab-${index}`,
    'aria-controls': `page-tabpanel-${index}`,
  };
};
