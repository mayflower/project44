import {Box, Button, Modal, ThemeProvider, Typography} from '@mui/material';
import './style/App.css';
import { mayflowerTheme } from './style/mayflower-theme';
import Header from './components/Header';
import Footer from "./components/Footer";
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from "react";

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
  const [open, setOpen] = React.useState(false);

  function handleOpen() {
    console.log('open')
    setOpen(true)
  }
  function handleClose() {
    console.log('close')
    setOpen(false)
  }

  return (
    <div className="App">
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={mayflowerTheme}>
            <Header />
            <div className='body'>
              <Button onClick={handleOpen}>Open modal</Button>
              <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
              >
                <Box>
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                    Text in a modal
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                  </Typography>
                </Box>
              </Modal>
            </div>
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
    </div >
  );
}

export default App;
