import React, { useEffect, useState } from "react";
import { Typography, Button, ListItem, Box, TextField, IconButton, Grid, Tabs, Tab } from "@mui/material";
import { useTitleContext } from "../context/TitleContext";
import DeleteIcon from '@mui/icons-material/Delete';
import ClearAllIcon from '@mui/icons-material/ClearAll';

export default function Tools(): JSX.Element {
  const { setTitle } = useTitleContext();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [tabValue, setTabValue] = useState<number>(0);
  const [isSubmitEnabled, setIsSubmitEnabled] = useState<boolean>(false);

  useEffect(() => {
    setTitle("Herramientas");
  }, [setTitle]);

  useEffect(() => {
    // Habilitar el botón de enviar si se han llenado las fechas y hay al menos 2 archivos seleccionados
    setIsSubmitEnabled(startDate !== '' && endDate !== '' && selectedFiles.length >= 2);
  }, [startDate, endDate, selectedFiles]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setSelectedFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const handleRemoveAllFiles = () => {
    setSelectedFiles([]);
  };

  const handleUpload = () => {
    // Aquí puedes manejar la lógica de subida de archivos
    // Por ejemplo, puedes enviar los archivos al servidor para procesarlos
    console.log("Archivos seleccionados:", selectedFiles);
  };

  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleStartDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStartDate(event.target.value);
    if (event.target.value > endDate) {
      setEndDate('');
    }
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEndDate(event.target.value);
    if (event.target.value < startDate) {
      setStartDate('');
    }
  };

  return (
    <div>
      <Typography variant="h5">Herramientas</Typography>
      <Tabs value={tabValue} onChange={handleChangeTab}>
        <Tab label="Subir archivos de Excel" />
      </Tabs>
      {tabValue === 0 && (
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
          <TextField
              label="Fecha y hora de inicio"
              type="datetime-local"
              value={startDate}
              onChange={handleStartDateChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: "", max: endDate } }}
              fullWidth
              size="small"
              margin="normal"
              style={{ maxWidth: 400 }}
            />
            <br></br>
            <TextField
              label="Fecha y hora de fin"
              type="datetime-local"
              value={endDate}
              onChange={handleEndDateChange}
              InputLabelProps={{ shrink: true }}
              InputProps={{ inputProps: { min: startDate } }}
              fullWidth
              size="small"
              margin="normal"
              style={{ maxWidth: 400 }}
            />
            <Box
              border={1}
              borderColor="primary.main"
              borderRadius={4}
              p={2}
              mt={2}
              mb={4}
              width="auto"
              maxWidth="400px"
              minHeight={ 250 }
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="center"
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => {
                event.preventDefault();
                const files = event.dataTransfer.files;
                setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(files)]);
              }}
            >
              {selectedFiles.length > 0 ? (
                <div>
                  <Typography variant="subtitle1">Archivos seleccionados:</Typography>
                  <ul>
                    {selectedFiles.map((file, index) => (
                      <ListItem key={index}>
                        {file.name}
                        <IconButton onClick={() => handleRemoveFile(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </ListItem>
                    ))}
                  </ul>
                  <Button variant="text" onClick={handleRemoveAllFiles} startIcon={<ClearAllIcon />}>
                    Quitar todos los archivos
                  </Button>
                  <br />
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-excel"
                  />
                  <Grid container justifyContent="center">
                    <label htmlFor="upload-excel">
                      <Button variant="contained" component="span">
                        Agregar archivos
                      </Button>
                    </label>
                  </Grid>
                </div>
              ) : (
                <div>
                  <Typography variant="subtitle1">Arrastra y suelta archivos aquí o selecciona archivos</Typography>
                  <br />
                  <input
                    type="file"
                    accept=".xlsx, .xls"
                    multiple
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                    id="upload-excel"
                  />
                  <Grid container justifyContent="center">
                    <label htmlFor="upload-excel">
                      <Button variant="contained" component="span">
                        Agregar archivos
                      </Button>
                    </label>
                  </Grid>
                </div>
              )}
            </Box>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!isSubmitEnabled}
            >
              Subir archivos
            </Button>
          </Grid>
        </Grid>
      )}
    </div>
  );
}
