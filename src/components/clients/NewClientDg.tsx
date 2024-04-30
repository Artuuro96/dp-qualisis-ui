import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import { Client } from "../../types/client.interface"
import { useDispatch } from "react-redux"
import { createClient } from "../../store/reducers/client.reducer"

export default function NewClientDg({
  showNewClientDg,
  setShowNewClientDg,
}: {
  showNewClientDg: boolean,
  setShowNewClientDg: Dispatch<SetStateAction<boolean>>
}): JSX.Element {
  const dispatch = useDispatch();
  const [newClient, setNewClient] = useState<Client>({
    name: "",
  } as Client);

  const onSaveClient = () => {
    dispatch(createClient(newClient));
    setNewClient({
      name: ""
    } as Client);
    setShowNewClientDg(false);
  }

  return (
    <Dialog
      maxWidth='sm'
      open={showNewClientDg}
      onClose={() => setShowNewClientDg(false)}
    >
      <DialogTitle>Nuevo Cliente</DialogTitle>
      <DialogContent>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={12}>
              <TextField 
                id="outlined-basic" 
                label="Nombre del Cliente" 
                value={newClient?.name}
                variant="outlined" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewClient({
                  ...newClient,
                  name: event.target.value
                })}
                fullWidth
              />
            </Grid>
            <Grid item xs={6}>
              
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="outlined-basic" 
                label="Descripción" 
                variant="outlined" 
                multiline
                rows={2}
                fullWidth
              />
            </Grid>
          </Grid>
      </DialogContent>
      <DialogActions>
        <Button 
          variant='outlined' 
          color="error" 
          onClick={() => setShowNewClientDg(false)}
          >
            Cerrar
          </Button>
        <Button 
          variant='outlined' 
          color="primary" 
          onClick={() => onSaveClient()}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  )
} 