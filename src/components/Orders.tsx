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
import { useTitleContext } from '../context/TitleContext';
import { useEffect, useState } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddBoxIcon from '@mui/icons-material/AddBox';

interface Data {
  entryNumber: string,
  number: string,
  magnitude: string,
  client: string,
  priority: string,
  worker: string,
  createdBy: string,
  createdAt: string,
  assignmentDate: string,
  scheduledDate: string,
  comments: string,
  budgetNumber: string,
  vendor: string,
  status: string,
  clientType: string,
}

function createData(
  entryNumber: string,
  number: string,
  magnitude: string,
  client: string,
  priority: string,
  worker: string,
  createdBy: string,
  createdAt: string,
  assignmentDate: string,
  scheduledDate: string,
  comments: string,
  budgetNumber: string,
  vendor: string,
  status: string,
  clientType: string,
): Data {
  return {
    entryNumber,
    number,
    magnitude,
    client,
    priority,
    worker,
    createdBy,
    createdAt,
    assignmentDate,
    scheduledDate,
    comments,
    budgetNumber,
    vendor,
    status,
    clientType,
  }
}

const rows = [
  createData('EN-001-2024', 'OSM-001-1231', 'Volumen', 'Coca Cola SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-002-2024', 'OSM-783-7731', 'Volumen', 'Coorporativo Mahindra SRL de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-003-2024', 'OSM-283-2315', 'Volumen', 'Google SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-004-2024', 'OSM-090-9826', 'Volumen', 'Deblan LAB SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-005-2024', 'OSM-025-8362', 'Volumen', 'Jonastructores LAB SRL de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-006-2024', 'OSM-236-2733', 'Volumen', 'Hospital Angeles Roma', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-007-2024', 'OSM-100-2674', 'Volumen', 'Hospital Elisur Tlalnepantla', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-008-2024', 'OSM-231-4653', 'Volumen', 'Laboratorios el Chopo', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'asignada', 'externo'),
];

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
    id: 'number',
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
  /*{
    id: 'createdAt',
    label: 'Fecha de Recepción',
  },*/
  {
    id: 'assignmentDate',
    label: 'Fecha de Asignación',
  },
  {
    id: 'scheduledDate',
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
  

  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    setTitle('Ordenes de Servicio');
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setTitle]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  
  const getTableCellValue = (value: string, column: Column) => {
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
        
      default: 
        return (<>{value}</>);
    }
    
  }

  return (
    <Grid>
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
            <Button variant="outlined" size='medium' startIcon={<AddBoxIcon/>}>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role='checkbox' tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id as keyof Data];
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
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  );
}
