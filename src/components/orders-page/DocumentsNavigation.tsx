import { Box, Tabs, Tab, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTitleContext } from "../../context/TitleContext";

export function DocumentsNavigation(): JSX.Element {
  const [value, setValue] = useState(0);
  const navigate = useNavigate()
  const { setTitle } = useTitleContext();
  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  useEffect(() => {
    setTitle('Documentos');
  }, [setTitle]);

  useEffect(() => {
    navigate("/documentos/entradas")
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Box sx={{ width: '100%' }} marginTop={-5}>
        <Tabs
          onChange={handleChange}
          value={value}
          aria-label="Tabs where selection follows focus"
          selectionFollowsFocus
          sx={{
            borderBottom: `1px solid black`
          }}
        >
          <Tab 
            label="Entradas"
            onClick={() => navigate("/documentos/entradas")} 
          />
          <Tab 
            label="Ordenes" 
            onClick={() => navigate("/documentos/ordenes")}
          />
        </Tabs>
      </Box>
      <Grid marginTop={1.5}>
        <Outlet />
      </Grid>
    </>
  )
}