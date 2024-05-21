import {
  Autocomplete,
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle,
  Grid, 
  TextField,
} from "@mui/material";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { RootState, getClients } from "../../../store/reducers/client.reducer";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../../store/reducers/user.reducer";
import MultiChip from "../../custom/MultiChip";
import React from "react";
import { createInstrument } from "../../../store/reducers/instrument.reducer";
import { Instrument } from "../../../types/instrument.interface";
import { createEntry } from "../../../store/reducers/entry.reducer";
import { Entry } from "../../../types/entry.interface";
import { ChipData } from "../../../types/chip.interface";
import { useAlertContext } from "../../../context/AlertContext";
import { getErrorMessage } from "../../../utils/get-context.util";

export function NewEntryDg({ 
  showNewEntryDg, 
  setShowNewEntryDg,
}: { 
  showNewEntryDg: boolean;
  setShowNewEntryDg: Dispatch<SetStateAction<boolean>>;
}): JSX.Element {
  const dispatch = useDispatch();
  const { setAlert } = useAlertContext();
  const [newEntry, setNewEntry] = useState<Entry>({} as Entry);
  const [showChildDg, setShowChildDg] = useState<boolean>(false);
  const [showAddInstrument, setShowAddInstrument] = useState<boolean>(false);
  const [recentEntry, setRecentEntry] = useState<Entry>({} as Entry);
  const { data: clients } = useSelector((state: RootState) => state.clients);
  const { data: entries, error: entryError } = useSelector((state: RootState) => state.entries);
  const { data: instruments } = useSelector((state: RootState) => state.instruments);
  const [chipData, setChipData] = useState<ChipData[]>([]);

  useEffect(() => {
    dispatch(getUsers());
    dispatch(getClients());
  }, [dispatch]);

  useEffect(() => {
    if(entryError) {
      setAlert({
        type: 'error',
        message: getErrorMessage(entryError),
        isOpen: true,
      });
      return;
    }
    setRecentEntry(entries[entries.length - 1]);
  }, [dispatch, entries, entryError, setAlert]);

  useEffect(() => {
    const instrumentChipData = instruments.map((instrument) => {
      return {
        key: instrument.entryId,
        label: instrument.name,
      } as unknown as ChipData;
    })
    setChipData(instrumentChipData)
  }, [instruments])

  const onSaveEntry = async() => {
    dispatch(createEntry(newEntry));
    setShowAddInstrument(true);
  }

  const onFinishEntrySaving = () => {
    setShowAddInstrument(false);
    setShowNewEntryDg(false);
  }

  return (
    <Dialog
      maxWidth='sm'
      open={showNewEntryDg}
      onClose={() => setShowNewEntryDg(false)}
    >
      <DialogTitle>{showAddInstrument ? 'Nuevo Instrumento' : 'Nueva Entrada'}</DialogTitle>
      <DialogContent>
          <Grid container spacing={2} padding={1}>
            <Grid item xs={6}>
              <TextField 
                id="outlined-basic" 
                label="No. Entrada" 
                value={newEntry?.entryNumber}
                variant="outlined" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewEntry({
                  ...newEntry,
                  entryNumber: event.target.value
                })}
                fullWidth
                disabled={showAddInstrument}
              />
            </Grid>
            <Grid item xs={6}>
              <Autocomplete
                id="client-search"
                freeSolo
                options={clients?.map((client) => client._id)}
                renderInput={(params) => <TextField {...params} label="Cliente"/>}
                
                onChange={(_, newValue) => setNewEntry({
                  ...newEntry,
                  clientId: newValue || '',
                })}
                value={newEntry?.clientId}
                fullWidth
                disabled={showAddInstrument}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                id="outlined-basic" 
                label="Descripción" 
                value={newEntry?.description}
                variant="outlined" 
                onChange={(event: ChangeEvent<HTMLInputElement>) => setNewEntry({
                  ...newEntry,
                  description: event.target.value,
                })}
                fullWidth
                disabled={showAddInstrument}
              />
            </Grid>
          </Grid>
          {showAddInstrument && (
            <Grid container spacing={2} padding={1} alignItems="center" justifyContent="center">
              <Grid item xs={12}>
                <MultiChip chipData={chipData} setChipData={setChipData}/>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setShowChildDg(true)}
                  fullWidth
                >
                  Añadir Instrumento
                </Button>
              </Grid>
            </Grid>
          )}
        <ChildModal showChildDg={showChildDg} setShowChildDg={setShowChildDg} entry={recentEntry}/>
      </DialogContent>
      <DialogActions>
        <Button 
          variant='outlined' 
          color="error" 
          onClick={() => showAddInstrument ? setShowAddInstrument(false) : setShowNewEntryDg(false)}
          >
            Cerrar
          </Button>
        <Button 
          variant='outlined' 
          color="primary" 
          onClick={() => showAddInstrument ? onFinishEntrySaving() : onSaveEntry()}
        >
          {showAddInstrument ? "Terminar" : "Guardar"}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

function ChildModal({ 
  showChildDg, 
  setShowChildDg,
  entry
}: { 
  showChildDg: boolean;
  setShowChildDg: Dispatch<SetStateAction<boolean>>;
  entry: Entry
}): JSX.Element {
  const dispatch = useDispatch();
  const [newInstrument, setNewInstrument] = useState<Instrument>({
    name: "",
    description: "",
    type: "",
    entryId: entry?._id,
  } as Instrument);

  const onSaveInstrument = async() => {
    newInstrument.entryId = entry?._id;
    dispatch(createInstrument(newInstrument));
    setShowChildDg(false);
    setNewInstrument({
      name: "",
      description: "",
      type: "",
      entryId: entry?._id,
    } as Instrument);
  }
  return (
    <React.Fragment>
      <Dialog
       
      maxWidth='sm'
      open={showChildDg}
      onClose={() => setShowChildDg(false)}
    >
      <DialogTitle>Nuevo Instrumento</DialogTitle>
      <DialogContent>
        Número de Entrada: {entry?.entryNumber}
        <Grid container spacing={2} padding={1}>
          <Grid item xs={6}>
            <TextField 
              id="outlined-basic" 
              label="Nombre"
              variant="outlined" 
              value={newInstrument?.name}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewInstrument({
                ...newInstrument,
                name: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField 
              id="outlined-basic" 
              label="Tipo" 
              variant="outlined" 
              value={newInstrument?.type}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewInstrument({
                ...newInstrument,
                type: event.target.value
              })}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="outlined-multiline-static"
              label="Descripción"
              multiline
              rows={2}
              fullWidth
              placeholder="Placeholder"
              value={newInstrument.description}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setNewInstrument({
                ...newInstrument,
                description: event.target.value
              })} 
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button 
          variant='outlined'
          color="error"
          onClick={() => setShowChildDg(false)}
        >
          Cerrar
        </Button>
        <Button 
          variant='outlined'
          onClick={onSaveInstrument}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
    </React.Fragment>
  );
}