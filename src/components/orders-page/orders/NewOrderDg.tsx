import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState } from "../../../store/reducers/client.reducer";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Order } from "../../../types/order.interface";
import { createOrder } from "../../../store/reducers/order.reducer";
import { getUsers } from "../../../store/reducers/user.reducer";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MultipleSelectChip from "../../custom/MultipleSelectChip";

export function NewOrderDg({ 
  showNewOrderDg, 
  setShowNewOrderDg,
}: { 
  showNewOrderDg: boolean;
  setShowNewOrderDg: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();
  const [newOrder, setNewOrder] = useState<Order>({} as Order);
  const { data: users } = useSelector((state: RootState) => state.users);

  const onSaveOrder = async() => {
    dispatch(createOrder(newOrder));
    setShowNewOrderDg(false);
  }

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch])

  return (
    <Dialog
      fullWidth
      maxWidth='md'
      open={showNewOrderDg}
      onClose={() => setShowNewOrderDg(false)}
    >
      <DialogTitle>Nueva Orden</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} padding={1}>
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="No. Entrada" 
              value={newOrder?.name}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewOrder({
                ...newOrder,
                name: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Vendedor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              
                label="Vendedor"
              >
                {users.map(user => (
                  <MenuItem value={user.name} key={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid> 
          <Grid item xs={4} />
          <Grid item xs={4}>
            <TextField 
              id="outlined-basic" 
              label="Orden" 
              value={newOrder?.name}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewOrder({
                ...newOrder,
                name: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{marginTop: -1}}>
                <DatePicker label="Fecha Programada"/>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{marginTop: -1}}>
                <DatePicker label="Fecha de Finalización"/>
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={8}>
            <TextField 
              id="outlined-basic" 
              label="Descripción" 
              value={newOrder?.description}
              variant="outlined" 
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewOrder({
                ...newOrder,
                description: event.target.value,
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Asignado a</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
              
                label="Asignado a"
              >
                {users.map(user => (
                  <MenuItem value={user.name} key={user.id}>{user.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <MultipleSelectChip />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Comentarios"
              multiline
              rows={4}
              fullWidth
              placeholder="Placeholder"
            />
          </Grid>
          
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button variant='outlined' color="error" onClick={() => setShowNewOrderDg(false)}>Cerrar</Button>
        <Button variant='outlined' onClick={onSaveOrder}>Guardar</Button>
      </DialogActions>
    </Dialog>
  )
}