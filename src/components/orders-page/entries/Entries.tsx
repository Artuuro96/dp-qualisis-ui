import { 
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Box,
  TextField,
  Button,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { ChangeEvent, useState, useEffect, forwardRef, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEntry, getEntries } from '../../../store/reducers/entry.reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/client.reducer';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { NewEntryDg } from '../entries/NewEntryDg';
import { Column } from '../../../utils/get-table-cell-value';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../../utils/date.util';
import { Entry } from '../../../types/entry.interface';
import { useAlertContext } from '../../../context/AlertContext';
import { useLoaderContext } from '../../../context/LoaderContext';
import { useNavigate } from 'react-router-dom';
import { getErrorMessage } from '../../../utils/get-context.util';

const columns: Column[] = [
  {
    id: 'entryNumber',
    label: 'No. de Entrada'
  },
  {
    id: 'clientId', 
    label: 'Cliente'},
  {
    id: 'description',
    label: 'Descripcion',
  },
  {
    id: 'createdBy',
    label: 'Recibido Por',
  },
  { 
    id: 'createdAt', 
    label: 'Creado en'
  },
  {
    id: 'actions',
    label: 'Acciones',
  }
];

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function Entries() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const { setAlert } = useAlertContext();
  const { setShowLoader } = useLoaderContext();
  const navigate = useNavigate();
  const { data: entries, error, loading } = useSelector((state: RootState) => state.entries);
  const [showNewEntryDg, setShowNewEntryDg] = useState<boolean>(false);
  const [openConfirmDg, setOpenConfirmDg] = useState<boolean>(false);
  const [entrySelected, setEntrySelected] = useState<Entry>({} as Entry);
  const [entriesFiltered, setEntriesFiltered] = useState<Entry[]>([]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const onDeleteEntry = (entry: Entry) => {
    setEntrySelected(entry);
    setOpenConfirmDg(true);
  }

  const onConfirmEntryDeletion = () => {
    dispatch(deleteEntry(entrySelected._id));
    setOpenConfirmDg(false);
    setEntrySelected({} as Entry);
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onFilterEntries = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(entries)
    const filtered = entries.filter(entry => entry.entryNumber?.includes(event.target.value));
    setEntriesFiltered(filtered);
  };

  useEffect(() => {
    dispatch(getEntries());
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // setShowLoader(true)
    // if(!loading) {
    //   setShowLoader(false);
    // }
    if(error) {
      if(error.code === 401) {
        setAlert({
          message: 'Su sesión ha expirado por inactividad',
          type: 'error',
          isOpen: true,
        })
        setTimeout(() => navigate('/'), 3000)
        return;
      }
      setAlert({
        message: getErrorMessage(error),
        type: 'error',
        isOpen: true,
      })
    }
    setEntriesFiltered(entries);
  }, [dispatch, loading, setShowLoader, error, entries, setAlert, navigate]);
  
  return (
    <Grid>
      <Dialog
        open={openConfirmDg}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Espera un momento</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            ¿Estas seguro que deseas eliminar este registro?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmDg(false)} color="error">Descartar</Button>
          <Button onClick={onConfirmEntryDeletion}>Continuar</Button>
        </DialogActions>
      </Dialog>
      <NewEntryDg showNewEntryDg={showNewEntryDg} setShowNewEntryDg={setShowNewEntryDg} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <TextField 
              id="outlined-basic" 
              label="No. Orden / Entrada" 
              variant="outlined" 
              onChange={onFilterEntries}
              size='small' 
              fullWidth 
            />
          </Box>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
            <Button 
              variant="contained" 
              size='medium' 
              startIcon={<AddBoxIcon/>}
              onClick={() => setShowNewEntryDg(true)}
            >
              Nueva Entrada
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1  }}>
        <TableContainer sx={{ maxHeight }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    sx={{color: 'white', backgroundColor: (theme) => theme.palette.primary.main}}
                    key={column.id}
                    align={'left'}
                  >
                    {column?.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {(entriesFiltered)
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((entry) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={entry._id}>
                      <TableCell>
                        <Link>{entry.entryNumber}</Link>
                      </TableCell>
                      <TableCell>
                        {entry.client.name}
                      </TableCell>
                      <TableCell>
                        {entry.description}
                      </TableCell>
                      <TableCell>
                        {entry.createdBy.username}
                      </TableCell>
                      <TableCell>
                        {formatDate(entry.createdAt)}
                      </TableCell>
                      <TableCell>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete" onClick={() => onDeleteEntry(entry)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={entries.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}