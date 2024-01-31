import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from './pallete';
import { BrowserRouter } from 'react-router-dom';
import Router from './routes';
import { AlertContextProvider } from './context/AlertContext';

const theme = createTheme({
  typography: {
    fontFamily: ['Signika', 'sans-serif'].join(','), // Agrega otras fuentes si es necesario
  },
  palette,
});

// Componente principal que envuelve tu aplicación con el tema y CssBaseline
function App(): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <AlertContextProvider>
        <CssBaseline />
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AlertContextProvider>
    </ThemeProvider>
  ); 
}

export default App;