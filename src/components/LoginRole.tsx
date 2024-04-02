import { Grid, Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducers/client.reducer';
import { Role } from '../types/role.interface';
import { getErrorMessage, getUserContext } from '../utils/get-context.util';
import { useDispatch } from 'react-redux';
import { loginAs } from '../store/reducers/auth.reducer';
import { useAlertContext } from '../context/AlertContext';

function stringToColor(string: string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

export default function LoginRole() {
  
  const [hoverRole, setHoverRole] = useState<string>('');
  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const { error, data } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAlert } = useAlertContext();

  useEffect(() => {
    const userContext = getUserContext();
    if(userContext)
      setUserRoles(userContext.roles);
    if(error) {
      console.log(error)
      setAlert({
        type: 'error',
        message: getErrorMessage(error),
        isOpen: true,
      });
    }
    if(data.isAuthWithRole) {
      navigate('/documentos');
    } 
  }, [error, navigate, setAlert, data])

  const loginWithRole = (role: Role) => {
    dispatch(loginAs(role));
  }
 
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography color='white' variant='h4'>Elige un rol para inicar sesión</Typography>
        <Stack direction="row" spacing={5} padding={2}>
          {userRoles.map((role) => (
            <Grid container 
              direction="column" 
              alignItems="center" 
              onMouseEnter={() => {setHoverRole(role.id)}} 
              onMouseLeave={() => setHoverRole('')}
              onClick={() => loginWithRole(role)}
              key={role.id}
            >
              <Grid item>
                <Avatar {...stringAvatar(`${role.name} rol`)}
                  className={hoverRole === role.id ? 'active' : ''}
                  sx={{ 
                    transition: '0.5s',
                    width: 100, 
                    height: 100,
                    fontSize: 40, 
                    '&.active': {
                      cursor: 'pointer',
                      transition: '0.5s',
                      width: 120, 
                      height: 120, 
                      fontSize: 60
                    }
                  }} 
                />
              </Grid>
              <Grid item>
                <Typography 
                  align="center" 
                  color='white'
                  sx={{
                    transition: '0.5s',
                    fontSize: 20,
                    '&.active': {
                      transition: '0.5s',
                      fontSize: 25,
                    }
                  }}
                  className={hoverRole === role.id ? 'active' : ''}
                >
                  {role.name}
                </Typography>
              </Grid>
            </Grid>
          ))}
        </Stack>
      </div>
    </>
  );
}
