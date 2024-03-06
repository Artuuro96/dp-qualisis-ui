import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import { useEffect } from "react";

export default function Clients(): JSX.Element {
  const { setTitle } = useTitleContext();
  useEffect(() => {
    setTitle('Clientes');
  }, [setTitle]);
  
  return (
    <Typography variant="h5">
    </Typography>
  )
}