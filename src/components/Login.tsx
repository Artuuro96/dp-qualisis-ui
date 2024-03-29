import { useEffect } from 'react';
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
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/reducers/auth.reducer';
import { RootState } from '../store/reducers/client.reducer';
import { useAlertContext } from '../context/AlertContext';
import { useLoaderContext } from '../context/LoaderContext';
import { getUserContext } from '../utils/get-context.util';

export default function Login(): JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAlert } = useAlertContext();
  const { setShowLoader } = useLoaderContext();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { data, loading, error } = useSelector((state: RootState) => state.auth);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  useEffect(() => {
    if(loading) setShowLoader(true) 
    if (data.isAuthenticated) {
      setShowLoader(false);
      const userContext = getUserContext();
      if(!userContext) {
        navigate('/');
        return;
      }

      console.log(userContext.roles.length === 1)
      if(userContext?.roles?.length < 2) {
        navigate('/ordenes')
        return;
      } else {
        navigate('/loginAs');
        return;
      }
    } else if(error) {
      setShowLoader(false); 
      setAlert({
        type: 'error',
        message: 'Usuario y/o contraseña incorrectos',
        isOpen: true,
      });
    }
  }, [
    data, 
    error,
    loading,
    navigate, 
    setAlert, 
    setShowLoader,
  ]);

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
              {/* Username Field */}
              <TextField
                margin='normal'
                required
                fullWidth
                id='email'
                label='Usuario'
                value={username}
                autoComplete='email'
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <PermIdentityIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUsername(event?.target.value)}
              />
              {/* Password Field */}
              <TextField
                margin='normal'
                required
                fullWidth
                label='Constraseña'
                type='password'
                id='password'
                value={password}
                autoComplete='current-password'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <LockOpenRoundedIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event?.target.value)}
              />
              
              <Button
                type='submit'
                fullWidth
                variant='contained'
                color='primary'
                sx={{ mt: 6, mb: 2, height: '4em' }}
                disabled={loading}
              >
                {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              </Button>
              {/* Forgot Password Link */}
              <Grid container>
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
