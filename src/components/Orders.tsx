import { 
  Button,
  Grid, 
  TablePagination, 
  TextField, 
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Divider,
  InputBase,
  InputAdornment,
  Input,
  InputLabel,
  FormControl,
  OutlinedInput,
  Box,
} from '@mui/material';
import { useTitleContext } from '../context/TitleContext';
import { useEffect, useState } from 'react';
import { useAlertContext } from '../context/AlertContext';
import FilterListIcon from '@mui/icons-material/FilterList';
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
    clientType,
  }
}

const rows = [
  createData('EN-001-2024', 'OSM-001-1231', 'Volumen', 'Coca Cola SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-002-2024', 'OSM-783-7731', 'Volumen', 'Coorporativo Mahindra SRL de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-003-2024', 'OSM-283-2315', 'Volumen', 'Google SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-004-2024', 'OSM-090-9826', 'Volumen', 'Deblan LAB SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-005-2024', 'OSM-025-8362', 'Volumen', 'Jonastructores LAB SRL de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-006-2024', 'OSM-236-2733', 'Volumen', 'Hospital Angeles Roma', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-007-2024', 'OSM-100-2674', 'Volumen', 'Hospital Elisur Tlalnepantla', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-008-2024', 'OSM-231-4653', 'Volumen', 'Laboratorios el Chopo', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
  createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214', 'Javier Hernandez Balcazar', 'externo'),
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
  {
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
  },
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
    id: 'scheduledDate',
    label: 'Fecha Programada',
  },
  {
    id: 'comments',
    label: 'Observaciones',
  },
  {
    id: 'budgetNumber',
    label: 'No. Cotización',
  },
  {
    id: 'vendor',
    label: 'Vendedor',
  },
  {
    id: 'clientType',
    label: 'Tipo de Cliente',
  },
];

const fIcon = (name: string) => (
  <SvgColor src={`assets/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

export default function Orders(): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setTitle } = useTitleContext();
  setTitle('Ordenes de Servicio');
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  const [maxHeight, setMaxHeight] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Box display="flex" alignItems="center" gap={1}>
            <TextField label="# Orden" variant="outlined" size='small' fullWidth/>
            <Button variant="contained" size='medium'>Buscar</Button>
          </Box>
        </Grid>
        <Grid item xs={8}>
          <Box display="flex" alignItems="center" justifyContent='flex-end' gap={1}>
          <Button 
            variant="contained" 
            size='medium' 
            color='info' 
            sx={{color: 'white'}}
            endIcon={<GetAppIcon/>}
          >
            Importar
          </Button>
          <Button variant="contained" size='medium' endIcon={<FileUploadIcon/>}>
            Exportar
          </Button>
          <IconButton aria-label="delete" size="large">
            <FilterListIcon fontSize="inherit" />
          </IconButton>
          </Box>
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: maxHeight }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead sx={{backgroundColor: 'red'}}>
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
                            {value}
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
