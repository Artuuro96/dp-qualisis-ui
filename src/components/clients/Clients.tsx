import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Chip, IconButton, Grid, Box, Button} from "@mui/material"
import { useTitleContext } from "../../context/TitleContext";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState, deleteClient, getClients } from "../../store/reducers/client.reducer";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils/date.util";
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import NewClientDg from "./NewClientDg";


export default function Clients(): JSX.Element {
  const { setTitle } = useTitleContext();
  const { data: clients } = useSelector((state: RootState) => state.clients)
  const [showNewClientDg, setShowNewClientDg] = useState<boolean>(false);
  const dispatch = useDispatch();

  const onDeleteClient = (id: string) => {
    dispatch(deleteClient(id));
  }


  useEffect(() => {
    setTitle('Clientes');
    dispatch(getClients());
  }, [dispatch, setTitle]);
  
  return (
    <Grid>
      <Grid container spacing={2}>
          <Grid item xs={6} />
          <Grid item xs={6}>
            <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
              <Button 
                variant="contained" 
                size='medium' 
                startIcon={<AddBoxIcon/>}
                onClick={() => setShowNewClientDg(true)}
              >
                Nuevo Cliente
              </Button>
            </Box>
          </Grid>
      </Grid>
      <NewClientDg
        showNewClientDg={showNewClientDg}
        setShowNewClientDg={setShowNewClientDg}
      />
      <TableContainer component={Paper} sx={{marginTop: 1}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID Cliente</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Creado En</TableCell>
              <TableCell>Creado Por</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clients.map((client) => (
              <TableRow
                key={client._id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {client._id}
                </TableCell>
                <TableCell component="th" scope="row">
                  {client.name}
                </TableCell>
                <TableCell>{client?.createdAt ? formatDate(client.createdAt.toString()) : ""}</TableCell>
                <TableCell>{client?.createdBy}</TableCell>
                <TableCell>
                  {<Chip label={client.deleted ? "Inactivo" : "Activo"}></Chip>}
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" onClick={() => onDeleteClient(client._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}