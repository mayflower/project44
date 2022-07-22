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
import { styled } from '@mui/material/styles';
import { mayflowerTheme } from './style/mayflower-theme';
import Header from './components/Header';
import Footer from "./components/Footer";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";
import GroupIcon from '@mui/icons-material/Group';
import EuroIcon from '@mui/icons-material/Euro';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const bet = {
  title: 'FC Bayern gegen Kickers',
  stickerUrl: 'https://twemoji.maxcdn.com/2/svg/1f47e.svg',
  description: 'Lorem Ipsum Lalala',
  creator: 'Hans Dampf',
  minStake: 5.0,
  isStakeVariable: true,
  options: [
    {
      name: 'FC Bayern',
      amountBet: 99,
      quote: 2.5
    },
    {
      name: 'Kickers',
      amountBet: 1,
      quote: 1.5
    }
  ],
  endTimestamp: new Date(Date.parse('Fri Jul 23 2022 10:37:23 GMT+0200')),
};

function App() {
  const [open, setOpen] = React.useState(true);


  function handleOpen() {
    setOpen(true)
  }
  function handleClose() {
    setOpen(false)
  }
  const calculateTime = () => {
    return bet.endTimestamp.getTime().toString();
  }
  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={mayflowerTheme}>
            <Header />
            <div className='body'>
              <Button onClick={handleOpen}>Open bet detailed view</Button>
              <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                <DialogTitle>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    <img src={bet.stickerUrl} alt="lustiger Sticker" style={{height: "1.5rem"}} />{bet.title}
                  </Typography>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={2} >
                      <Grid item xs={12}>
                      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {bet.description}
                      </Typography>
                      </Grid>
                        <Grid item xs={4}>
                          <Item>
                             <GroupIcon /> {bet.creator}</Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item><EuroIcon /> {bet.minStake}</Item>
                        </Grid>
                        <Grid item xs={4}>
                          <Item><ScheduleIcon />{calculateTime()}</Item>
                        </Grid>
                      <Grid item xs={12}>
                        <TextField id="stake" label="Wetteinsatz" value={bet.minStake} required/>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField id="email" label="E-Mail-Adresse" value="" required/>
                      </Grid>
                      {bet.options.map(opt => {
                        return (<Grid item xs={4}>
                          <Card raised style={{cursor: "pointer"}} onClick={() => console.log('hello')}>
                            <CardHeader sx={{color: "black"}} title={opt.name} />
                            <CardContent>
                              Anzahl Wetten: {opt.amountBet}<br />
                              Quote: {opt.quote}
                            </CardContent>
                          </Card>
                        </Grid>)
                      })}
                    </Grid>
                </DialogContent>
                <DialogActions>
                  <Button variant="contained">Wette abgeben</Button>
                </DialogActions>
              </Dialog>
            </div>
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
    </div >
  );
}

export default App;
