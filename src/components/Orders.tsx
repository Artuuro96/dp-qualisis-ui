import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Grid, TablePagination } from '@mui/material';
import { useTitleContext } from '../context/TitleContext';
import { useEffect, useState } from 'react';
import { useAlertContext } from '../context/AlertContext';

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

export default function Orders(): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { setTitle } = useTitleContext();
  const { setAlert } = useAlertContext();
  setTitle('Ordenes de Servicio');

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
      <Button variant='contained' onClick={() => setAlert({message: "This is a sucess message", type: 'success', isOpen: true})}>Open Alert</Button>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: maxHeight }}>
          <Table stickyHeader aria-label="sticky table">
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
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
          component="div"
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
