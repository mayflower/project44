import {
  Box,
  Button,
  Card,
  CardHeader,
  CardContent, CardActions,
  Container,
  Grid,
  Modal,
  Paper,
  TextField,
  ThemeProvider, Radio,
  Typography, Dialog, DialogActions, DialogContent, DialogTitle
} from '@mui/material';
import './style/App.css';
import { mayflowerTheme } from './style/mayflower-theme';
import Header from './components/Header';
import Footer from "./components/Footer";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import DetailView from "./components/DetailView";


function App() {
  const [open, setOpen] = React.useState(true);

  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={mayflowerTheme}>
            <Header />
            <div className='body'>
              <Button onClick={handleOpen}>Open bet detailed view</Button>
              <DetailView open={open} betId={"1"} handleClose={handleClose}/>
            </div>
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
    </div >
  );
}

export default App;
