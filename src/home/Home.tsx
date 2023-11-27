import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Button, Grid } from '@mui/material';

const Home: React.FC = () => {
  return (
    <Grid
    container
    direction="column"
    justifyContent="center"
    alignItems="center"
    spacing={2}
    sx={{ height: '100vh'  }} // Ajustez la hauteur selon vos besoins
  >
    <Grid item>
      <Typography variant="h2" gutterBottom>
        Accueil
      </Typography>
    </Grid>

    <Grid item>
      <Typography variant="body1" paragraph>
        Bienvenue sur la page d accueil
      </Typography>
    </Grid>

    <Grid item>
      {/* Bouton pour rediriger vers la page de login */}
      <Button component={Link} to="/login" variant="contained">
        Se connecter
      </Button>
    </Grid>
    <Grid item>
      {/* Bouton pour rediriger vers la page de login */}
      <Button component={Link} to="/signup" variant="contained">
        Créer un Compte
      </Button>
    </Grid>
  </Grid>
);
};

export default Home;
