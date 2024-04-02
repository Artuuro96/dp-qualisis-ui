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
  Chip,
  Link,
} from '@mui/material';
import { useTitleContext } from '../../../context/TitleContext';
import { ChangeEvent, useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/client.reducer';
import { getOrders } from '../../../store/reducers/order.reducer';
import { Order } from '../../../types/order.interface';
import { formatFullMXDate } from '../../../utils/date.util';
import { NewOrderDg } from './NewOrderDg';


interface Column {
  id: string;
  label: string;
}
const columns: Column[] = [
  {
    id: 'entryNumber',
    label: 'No. Entrada',
  },
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
    id: 'assignmentDate',
    label: 'Fecha de Asignación',
  },
  {
    id: 'startDate',
    label: 'Fecha Programada',
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
  

  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setTitle('Ordenes de Servio');
    dispatch(getOrders())
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch, setTitle]);

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const getTableCellValue = (value: any, column: Column) => {
    switch(column.id) {
      case 'actions':
        return (
          <>
            <IconButton aria-label="edit">
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </>
        );
      
      case 'status':
        return (
          <> <Chip color='primary' label={value} /> </>
        );

      case 'entryNumber':
        return (
          <Link href="#" underline="none">
            {value}
          </Link>
        ) 
      
      case 'startDate':
      case 'createdAt':
        return formatFullMXDate(value);
        
      default: 
        return (<>{value}</>);
    }
    
  }

  return (
    <Grid>
      <NewOrderDg showNewOrderDg={showNewUserDg} setShowNewOrderDg={setShowNewUserDg} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Box display="flex" alignItems="center">
            <TextField id="outlined-basic" label="No. Orden / Entrada" variant="outlined" size='small' fullWidth/>
          </Box>
        </Grid>
        <Grid item xs={3}>
          <Box display="flex" alignItems='flex-start'>
            <Button variant='contained'>Buscar</Button>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
            <Button 
              variant="contained" 
              size='medium' 
              color='info' 
              sx={{color: 'white', borderRadius: 0}}
              startIcon={<GetAppIcon/>}
            >
              Importar
            </Button>
            <Button variant="outlined" size='medium' startIcon={<FileUploadIcon/>}>
              Exportar
            </Button>
            <Button variant="outlined" size='medium' startIcon={<FilterListIcon/>}>
              Filtros
            </Button>
            <Button variant="outlined" onClick={() => setShowNewUserDg(true)} size='medium' startIcon={<AddBoxIcon/>}>
              Nueva Orden
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden', mt: 1 }}>
        <TableContainer sx={{ maxHeight: maxHeight }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead sx={{color: 'red'}}>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align='center'
                    sx={{color: 'white'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {orders
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((order, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = order[column.id as keyof Order];
                        return (
                          <TableCell key={column.id} align='center'>
                            {getTableCellValue(value, column)}
                          </TableCell>
                        );
                      })}
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
