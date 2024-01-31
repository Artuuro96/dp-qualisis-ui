import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Header from './header/Header';
import Nav from './nav/Nav';
import { Alert, Snackbar } from '@mui/material';
import { useAlertContext } from '../../context/AlertContext';

const APP_BAR_MOBILE = 54;
const APP_BAR_DESKTOP = 80;

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
});

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100vh',
  paddingTop: APP_BAR_MOBILE + 15,
  backgroundColor: 'white',
  paddingBottom: theme.spacing(0),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 5,
    paddingLeft: theme.spacing(2),
    backgroundColor: 'white',
    paddingRight: theme.spacing(2),
  },
}));

export default function Frame(): JSX.Element {
  const [open, setOpen] = useState(false);
  const { alert } = useAlertContext();
  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)}/>
      <Nav openNav={open} onCloseNav={() => setOpen(false)}/>
      <Snackbar sx={{minWidth: 500}} open={alert.isOpen} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert
          severity={alert.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alert.message}
        </Alert>
      </Snackbar>
      <Main>
        <Outlet />
      </Main>
    </StyledRoot> 
  )
}
