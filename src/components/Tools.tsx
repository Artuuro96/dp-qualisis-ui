import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import { useEffect } from "react";

export default function Tools(): JSX.Element {
  const { setTitle } = useTitleContext();
  
  useEffect(() => {
    setTitle('Herramientas');
  }, [setTitle]);

  return (
    <Typography variant="h5">
    </Typography>
  )
}