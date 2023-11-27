import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper } from '@mui/material';
import { createUser } from './signUpApi';
import { Account } from '../model/common';
import { CustomError } from "../model/CustomError";
import { useNavigate } from 'react-router-dom';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: '',
  });
  const [error, setError] = useState({} as CustomError);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const account: Account = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    createUser(account, (result: boolean )  => {
        if (result === true) {
            setFormData({ email: '', password: '', confirmPassword: '', username: '' });
            setError(new CustomError(""));
            // Rediriger vers la page de login
            navigate('/login');
          } else {
            // Gérer le cas où la création de l'utilisateur a échoué
            console.error("La création de l'utilisateur a échoué.");
          }
    }, (createAccountError: CustomError) => {
      console.log(createAccountError);
      setError(createAccountError);
    });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: '100vh' }}
    >
      <Grid item>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Typography variant="h4" gutterBottom>
            Créer un compte
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              name="username"
              label="username"
              placeholder="Saisissez votre nom utilisateur"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              name="email"
              label="E-mail"
              type="email"
              placeholder="Entrez votre adresse e-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              name="password"
              label="Mot de passe"
              type="password"
              placeholder="Entrez votre mot de passe"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <TextField
              name="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              placeholder="Confirmez votre mot de passe"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Créer un compte
            </Button>
          </form>
        </Paper>
      </Grid>
      {error.message && <span>{error.message}</span>}
    </Grid>
  );
};

export default SignUpForm;
