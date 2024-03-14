import { Alert, Snackbar } from "@mui/material";
import { useAlertContext } from "../../context/AlertContext";

export default function SnackbarAlert(): JSX.Element {
  const { alert, setAlert } = useAlertContext();
  return (
    <Snackbar 
      sx={{minWidth: 400}} 
      open={alert.isOpen} 
      autoHideDuration={4000} 
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      onClose={() => setAlert({ ...alert, isOpen: false }) }
    >
      <Alert
        severity={alert.type}
        variant='filled'
        sx={{ width: '100%' }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}