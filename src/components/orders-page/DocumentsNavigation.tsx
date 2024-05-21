import { Box, Tabs, Tab, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useTitleContext } from "../../context/TitleContext";
import GetAppIcon from '@mui/icons-material/GetApp';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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
         <Grid container justifyContent="flex-end" marginTop={2} marginBottom={0.5} >
            
          </Grid>
        </Tabs>
      </Box>
      <Grid marginTop={1.5}>
        <Outlet />
      </Grid>
    </>
  )
}