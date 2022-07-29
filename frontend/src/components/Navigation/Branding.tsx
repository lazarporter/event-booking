import React from 'react';
import Typography from '@mui/material/Typography/Typography';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import { SxProps } from '@mui/material';

const styles: { [key: string]: SxProps } = {
  appTitle: {
    mr: 2,
    display: 'flex',
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
};

export const Branding = () => (
  <>
    <ChildCareIcon sx={{ display: 'flex', mr: 1 }} />
    <Typography variant="h6" noWrap component="a" href="/" sx={styles.appTitle}>
      Event.ly
    </Typography>
  </>
);
