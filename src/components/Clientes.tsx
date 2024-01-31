import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";

export default function Clients(): JSX.Element {
  const { setTitle } = useTitleContext();
  setTitle('Clientes');
  return (
    <Typography variant="h5">
    </Typography>
  )
}