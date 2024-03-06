import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import Calendar from "./custom/calendar/Calendar";
import { useEffect } from "react";

export default function Assignments(): JSX.Element {
  const { setTitle } = useTitleContext();
  
  useEffect(() => {
    setTitle('Asignaciones');
  }, [setTitle]);

  return (
    <Typography variant="h5">
      <Calendar />
    </Typography>
  )
}