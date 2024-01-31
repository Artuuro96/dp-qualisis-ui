import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";

export default function Tools(): JSX.Element {
  const { setTitle } = useTitleContext();
  setTitle('Herramientas');
  return (
    <Typography variant="h5">
    </Typography>
  )
}