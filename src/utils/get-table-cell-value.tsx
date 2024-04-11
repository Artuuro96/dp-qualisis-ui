import { Chip, IconButton, Link } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { formatFullMXDate } from "./date.util";

export interface Column {
  id: string;
  label: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getTableCellValue = (value: any, column: Column) => {
  if(typeof value === 'object') {
    console.log("Es Objectoo siii", value)
  }
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
      console.log("===========================")
      console.log(value)
      return formatFullMXDate(new Date(value).toDateString());
      
    case 'vendor':
      return value.username || '';
    
    default: 
      return value
  }
}