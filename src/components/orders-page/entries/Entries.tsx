import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { ChangeEvent, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getEntries } from '../../../store/reducers/entry.reducer';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducers/client.reducer';
import { Entry } from '../../../types/entry.interface';

interface Column {
  id: string;
  label: string;
}

const columns: Column[] = [
  {
    id: 'name',
    label: 'Número de Orden'
  },
  {
    id: 'clientId', 
    label: 'ID Cliente'},
  {
    id: 'description',
    label: 'Descripcion',
  },
  {
    id: 'createdBy',
    label: 'Creado Por',
  },
  { 
    id: 'createdAt', 
    label: 'Creado en'
  },
  {
    id: 'action',
    label: 'Acción',
  }
];

export function Entries() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [maxHeight, setMaxHeight] = useState<number>(0);
  const { data: entries } = useSelector((state: RootState) => state.entries)

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const handleResize = () => {
      const height = window.innerHeight - 200; // Adjust the offset as needed
      setMaxHeight(height);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    dispatch(getEntries());
  }, [dispatch]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
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
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(entries)
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={entry._id}>
                    {columns.map((column) => {
                      const value = entry[column.id as keyof Entry];
                      return (
                        <TableCell key={column.id} align={'left'}>
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
        count={entries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}