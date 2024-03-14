import { Typography } from "@mui/material"
import { useTitleContext } from "../context/TitleContext";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getClients } from "../store/reducers/client.reducer";

export default function Clients(): JSX.Element {
  const { setTitle } = useTitleContext();
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle('Clientes');
    dispatch(getClients(''));
  }, [dispatch, setTitle]);
  
  return (
    <Typography variant="h5">
    </Typography>
  )
}