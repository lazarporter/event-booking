import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { routes } from '../../constants/routes';
import { SxProps } from '@mui/material';
import { Branding } from './Branding';
import { MenuButton } from './MenuButton';

const styles: { [key: string]: SxProps } = {
  navButton: {
    my: 2,
    color: '#FFF',
    display: 'block',
    '&:hover': {
      color: '#f5c905',
    },
    '&.active': {
      color: '#f5c905',
    },
  },
  appTitle: {
    mr: 2,
    display: { xs: 'none', md: 'flex' },
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  },
};

export const NavBar = () => {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <MenuButton />
          </Box>
          <Branding />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((page) => (
              <Button
                key={page.text}
                component={NavLink}
                to={page.path}
                sx={styles.navButton}
              >
                {page.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 1 }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
