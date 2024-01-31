import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";

export default function Staff(): JSX.Element {
  const { setTitle } = useTitleContext();
  setTitle('Personal');
  return (
    <Typography variant="h5">
    </Typography>
  )
}