import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";

export default function Assignments(): JSX.Element {
  const { setTitle } = useTitleContext();
  setTitle('Asignaciones');

  return (
    <Typography variant="h5">
      
    </Typography>
  )
}