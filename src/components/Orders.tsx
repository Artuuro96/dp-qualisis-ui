import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';

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
  // createData('EN-009-2024', 'OSM-283-1231', 'Volumen', 'Laboratorios Medico Polanco', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214'),
  // createData('EN-010-2024', 'OSM-374-3412', 'Volumen', 'Instituto Mexicano del Seguro Social', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214'),
  // createData('EN-011-2024', 'OSM-621-5489', 'Volumen', 'Isstituto de Rehabiliticion Pulmonar', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214'),
  // createData('EN-012-2024', 'OSM-341-5432', 'Volumen', 'Instituto de Enfermedades Respiratorias', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214'),
  // createData('EN-013-2024', 'OSM-345-6458', 'Volumen', 'Laboratorios Industriales SA de CV', 'Normal', 'Juan Jose Chavez', 'Alicia Cervantes', '28/12/2023', '03/09/22', '17/05/2025', 'Se recibe el equipo en buen estado', '3214'),
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const headCells = [
  {
    id: 'entryNumber',
    numeric: false,
    disablePadding: true,
    label: 'No. Entrada',
  },
  {
    id: 'number',
    numeric: false,
    disablePadding: false,
    label: 'Orden de Servicio',
  },
  {
    id: 'magnitude',
    numeric: false,
    disablePadding: false,
    label: 'Magnitud',
  },
  {
    id: 'client',
    numeric: false,
    disablePadding: false,
    label: 'Empresa',
  },
  {
    id: 'priority',
    numeric: false,
    disablePadding: false,
    label: 'Prioridad',
  },
  {
    id: 'worker',
    numeric: false,
    disablePadding: false,
    label: 'Metrólogo',
  },
  {
    id: 'createdBy',
    numeric: false,
    disablePadding: false,
    label: 'Registró',
  },
  {
    id: 'createdAt',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de Recepción',
  },
  {
    id: 'assignmentDate',
    numeric: false,
    disablePadding: false,
    label: 'Fecha de Asignación',
  },
  {
    id: 'scheduledDate',
    numeric: false,
    disablePadding: false,
    label: 'Fecha Programada',
  },
  {
    id: 'comments',
    numeric: false,
    disablePadding: false,
    label: 'Observaciones',
  },
  {
    id: 'budgetNumber',
    numeric: false,
    disablePadding: false,
    label: 'No. Cotización',
  },
  {
    id: 'vendor',
    numeric: false,
    disablePadding: false,
    label: 'Vendedor',
  },
  {
    id: 'clientType',
    numeric: false,
    disablePadding: false,
    label: 'Tipo de Cliente',
  },
];


  
  export default function Orders(): JSX.Element {
    return (
      <div>
      <Typography variant='h5' sx={{pb: 3}}>Ordenes de Servicio</Typography>
      <TableContainer component={Paper} >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headCells.map((cell, index) => (
                <TableCell key={index}>{cell.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell align="center">
                  {row.entryNumber}
                </TableCell>
                <TableCell align="center">{row.number}</TableCell>
                <TableCell align="center">{row.magnitude}</TableCell>
                <TableCell align="center">{row.client}</TableCell>
                <TableCell align="center">{row.priority}</TableCell>
                <TableCell align="center">{row.worker}</TableCell>
                <TableCell align="center">{row.createdBy}</TableCell>
                <TableCell align="center">{row.createdAt}</TableCell>
                <TableCell align="center">{row.assignmentDate}</TableCell>
                <TableCell align="center">{row.scheduledDate}</TableCell>
                <TableCell align="center">{row.comments}</TableCell>
                <TableCell align="center">{row.budgetNumber}</TableCell>
                <TableCell align="center">{row.vendor}</TableCell>
                <TableCell align="center">{row.clientType}</TableCell>

            </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>
    );
  }
