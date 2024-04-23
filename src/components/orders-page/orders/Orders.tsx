import { 
  Button,
  Grid, 
  TablePagination, 
  TextField, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  IconButton,
} from '@mui/material';
import { useTitleContext } from '../../../context/TitleContext';
import { ChangeEvent, useEffect, useState } from 'react';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/client.reducer';
import { getOrders } from '../../../store/reducers/order.reducer';
import { NewOrderDg } from './NewOrderDg';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatDate } from '../../../utils/date.util';
import { Order } from '../../../types/order.interface';

interface Column {
  id: string;
  label: string;
}
const columns: Column[] = [
  {
    id: 'name',
    label: 'Orden de Servicio',
  },
  /*{
    id: 'magnitude',
    label: 'Magnitud',
  },
  {
    id: 'client',
    label: 'Empresa',
  },
  {
    id: 'priority',
    label: 'Prioridad',
  },
  {
    id: 'worker',
    label: 'Metrólogo',
  },*/
  {
    id: 'createdBy',
    label: 'Registró',
  },
  {
    id: 'createdAt',
    label: 'Fecha de Recepción',
  },
  {
    id: 'startDate',
    label: 'Fecha Programada',
  },
  {
    id: 'endDate',
    label: 'Fecha de Finalizacion',
  },
  /*{
    id: 'comments',
    label: 'Observaciones',
  },
  {
    id: 'budgetNumber',
    label: 'No. Cotización',
  },*/
  {
    id: 'vendor',
    label: 'Vendedor',
  },
  /*{
    id: 'clientType',
    label: 'Tipo de Cliente',
  },*/
  {
    id: 'status',
    label: 'Estatus'
  },
  {
    id: 'actions',
    label: 'Acciones'
  }
];

export default function Orders(): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setTitle } = useTitleContext();
  const dispatch = useDispatch();
  const { data: orders } = useSelector((state: RootState) => state.orders);
  const [showNewUserDg, setShowNewUserDg] = useState<boolean>(false);
  const [ordersFiltered, setOrdersFiltered] = useState<Order[]>([]);
  

  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setTitle('Ordenes de Servicio');
    dispatch(getOrders());
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, setTitle]);

  const onFilterOrders = (event: ChangeEvent<HTMLInputElement>) => {
    const filtered = orders.filter(order => order.name.includes(event.target.value));
    setOrdersFiltered(filtered);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid>
      <NewOrderDg showNewOrderDg={showNewUserDg} setShowNewOrderDg={setShowNewUserDg} />
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center">
            <TextField 
              id="outlined-basic" 
              label="No. Orden / Entrada" 
              variant="outlined" 
              size='small' 
              fullWidth 
              onChange={onFilterOrders}
            />
          </Box>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
            <Button 
              variant="contained" 
              color="secondary" 
              onClick={() => setShowNewUserDg(true)} 
              size='medium' 
              startIcon={<AddBoxIcon/>}
            >
              Nueva Orden
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1 }}>
        <TableContainer sx={{ maxHeight: maxHeight }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                  sx={{color: 'white', backgroundColor: (theme) => theme.palette.secondary.main}}
                    key={column.id}
                    align='center'
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersFiltered
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={order.name + index}>
                      <TableCell align='center'>
                        {order.name}
                      </TableCell>
                      <TableCell align='center'>
                        {order.createdBy}
                      </TableCell>
                      <TableCell align='center'>
                        {order.createdAt ? formatDate(order.createdAt) : ''}
                      </TableCell>
                      <TableCell align='center'>
                        {order.startDate ? formatDate(order.startDate) : ''}
                      </TableCell>
                      <TableCell align='center'>
                        {order.endDate ? formatDate(order.endDate) : ''}
                      </TableCell>
                      <TableCell align='center'>
                        {order.vendorId}
                      </TableCell>
                      <TableCell align='center'>
                        {order.status}
                      </TableCell>
                      <TableCell align='center'>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton aria-label="delete">
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
          component='div'
          count={orders.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}
