import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from '/assets/icons/logo.svg';
import { Card, CardContent, InputAdornment } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LockOpenRoundedIcon from '@mui/icons-material/LockOpenRounded';
import { useNavigate } from 'react-router-dom';

export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    navigate('/loginAs');
  };

  return (
    <Container component='main' maxWidth='xs' sx={{padding: 10}}>
      <CssBaseline />
      <Card sx={{ maxWidth: 1000, boxShadow: '0px 0px 8px 0px white' }}>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
            }}
          >
            <img src={Logo} style={{ width: '100%', height: '100%', marginTop: -50, marginBottom: -70 }} />
            <Box component='form' onSubmit={handleSubmit} noValidate>
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Usuario'
                name='email'
                autoComplete='email'
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PermIdentityIcon />
                    </InputAdornment>
                  ),
                }} />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Constraseña'
                type='password'
                id='password'
                autoComplete='current-password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockOpenRoundedIcon />
                    </InputAdornment>
                  ),
                }} />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ mt: 6, mb: 2, height: '4em' }}
              >
                Iniciar Sesión
              </Button>
              <Grid container >
                <Grid item xs textAlign='center'>
                  <Link href='#' variant='body2'>
                    ¿Olvidaste tu contraseña?
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Typography variant='body2' color='text.secondary' align='center' sx={{ mt: 1 }}>
            {'Copyright © '}
            <Link color='inherit' href='https://mui.com/'>
              Qualisis
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}