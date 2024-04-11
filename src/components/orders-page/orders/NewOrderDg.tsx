import { 
  Autocomplete, 
  Box, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  FormControl, 
  Grid, 
  InputLabel, 
  MenuItem, 
  Select, 
  TextField,
  OutlinedInput,
  Chip,
  SelectChangeEvent,
} from "@mui/material";
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
import { getEntries } from "../../../store/reducers/entry.reducer";
import { getInstrumentsByEntryId } from "../../../store/reducers/instrument.reducer";
import { Instrument } from "../../../types/instrument.interface";
import dayjs, { Dayjs } from "dayjs";
import { OrderStatus } from "../../../enum/order-status.enum";

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
  const { data: entries } = useSelector((state: RootState) => state.entries);
  const { data: instruments } = useSelector((state: RootState) => state.instruments);

  const onSaveOrder = async() => {
    console.log(newOrder)
    dispatch(createOrder(newOrder));
    setShowNewOrderDg(false);
  }

  const onAutocompleteVendorSelection = (username: string | null) => {
    const user = users.find(user => user.username === username);
    setNewOrder({
      ...newOrder,
      workerId: user?.id || '',
    });
  }

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const onAutocompletWorkerSelection = (username: string | null) => {
    const user = users.find(user => user.username === username);
    setNewOrder({
      ...newOrder,
      vendorId: user?.id || '',
    });
  }
  
  const onSelectInstrument = (event: SelectChangeEvent<string[]>) => {
    console.log(event.target.value, instruments)
    const instrumentIds = event.target.value as string[];
    const instrumentsIdsAssigned: Instrument[] = [];
    instrumentIds.forEach(instrumentId => {
      instruments.forEach(instrument => {
        if(instrument._id === instrumentId) 
          instrumentsIdsAssigned.push(instrument)
      })
    });
    setNewOrder({
      ...newOrder,
      instruments: instrumentsIdsAssigned,
    });
  }

  const handlStartDateChange = (value: Dayjs | null) => {
    setNewOrder({
      ...newOrder,
      startDate: value?.toISOString() || new Date().toISOString()
    });
  };

  const handleEndDateChange = (value: Dayjs | null) => {
    setNewOrder({
      ...newOrder,
      endDate: value?.toISOString() || new Date().toISOString()
    });
  };
  
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getEntries());
    dispatch(getInstrumentsByEntryId())
  }, [dispatch]);

  return (
    <Dialog
       
      maxWidth='md'
      open={showNewOrderDg}
      onClose={() => setShowNewOrderDg(false)}
    >
      <DialogTitle>Nueva Orden</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} padding={1}>
          <Grid item xs={4}>
            <Autocomplete
              id="client-search"
              freeSolo
              options={entries?.map((entry) => entry.entryNumber)}
              renderInput={(params) => <TextField {...params} label="No. Entrada"/>}
              fullWidth
            />
          </Grid>
          <Grid item xs={4} />
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
            <Autocomplete
              id="client-search"
              freeSolo
              options={users?.map((user) => user.username) || []}
              renderInput={(params) => <TextField {...params} label="Vendedor"/>}
              onChange={(_, newValue) => onAutocompleteVendorSelection(newValue)}
              value={newOrder?.workerId}
              fullWidth
            />
          </Grid> 
          <Grid item xs={4}>
            <Autocomplete
              id="client-search"
              freeSolo
              options={users?.map((user) => user.username) || []}
              renderInput={(params) => <TextField {...params} label="Asignado a"/>}
              onChange={(_, newValue) => onAutocompletWorkerSelection(newValue)}
              value={newOrder?.workerId}
              fullWidth
            />
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{marginTop: -1}}>
                <DatePicker 
                  label="Fecha Programada"
                  sx={{ width: "100%"}} 
                  onChange={handlStartDateChange}
                  value={dayjs(new Date(newOrder.startDate))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']} sx={{marginTop: -1}}>
                <DatePicker 
                  label="Fecha de Finalización" 
                  sx={{ width: "100%"}} 
                  onChange={handleEndDateChange}
                  value={dayjs(new Date(newOrder.endDate))}
                />
              </DemoContainer>
            </LocalizationProvider>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Estatus</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newOrder?.status}
                label="Age"
                onChange={(event: SelectChangeEvent<string>) => setNewOrder({
                  ...newOrder,
                  status: event.target.value as OrderStatus
                })}
              >
                <MenuItem value={"COMPLETED"}>COMPLETADO</MenuItem>
                <MenuItem value={"ASSIGNED"}>ASIGNADA</MenuItem>
                <MenuItem value={"FINISHED"}>FINALIZADA</MenuItem>
                <MenuItem value={"IN_PROGRESS"}>EN PROGRESO</MenuItem>
                <MenuItem value={"CREATED"}>CREADO</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
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
          <Grid item xs={12}>
            <FormControl sx={{width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Intrumentos</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                value={newOrder?.instruments?.map(instrument => instrument._id) || []}
                onChange={onSelectInstrument}
                input={<OutlinedInput id="select-multiple-chip" label="Instrumetos" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {instruments.map((instrument, index) => (
                  <MenuItem
                    key={instrument.name + index}
                    value={instrument._id}
                  >
                    {instrument.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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