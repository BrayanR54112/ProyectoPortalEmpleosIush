import React from 'react';
import { AppBar, Toolbar, Button, Container, IconButton, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Container>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuClick}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                Home
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}>
                Perfil
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/skills" style={{ textDecoration: 'none', color: 'black' }}>
                Intercambio de Habilidades
              </Link>
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <Link to="/contact" style={{ textDecoration: 'none', color: 'black' }}>
                Contacto
              </Link>
            </MenuItem>
          </Menu>
          
          {/* Menú de navegación para pantallas grandes */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', flexGrow: 1 }}>
            <Button color="inherit" component={Link} to="/" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Home
            </Button>
            <Button color="inherit" component={Link} to="/profile" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Perfil
            </Button>
            <Button color="inherit" component={Link} to="/skills" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Intercambio de Habilidades
            </Button>
            <Button color="inherit" component={Link} to="/contact" sx={{ display: { xs: 'none', sm: 'block' } }}>
              Contacto
            </Button>
          </div>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
