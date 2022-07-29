import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    background: {
      paper: '#fafafa',
    },
    text: {
      primary: '#173A5E',
      secondary: '#46505A',
    },
    action: {
      active: '#001E3C',
    },
    success: {
      dark: '#009688',
      main: '#00963c',
    },
  },
});
