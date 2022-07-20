import {
  AppBar,
  Box,
  Container,
  Toolbar,
} from "@mui/material";
import React from "react";
import mayflowerLogo from "../assets/projekt44-logo.png";

export default function Header() {
  return (
    <header className="App-header">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Box component="div"
                   sx={{
                     flexGrow: 1,
                     mt: 1
                   }}>
                <Box component="div"
                     sx={{
                       width: {
                         xxs: "100px",
                         xs: "100px",
                         sm: "170px",
                         md: "300px",
                         lg: "300px",
                         xl: "300px"
                       }
                     }}>
                  <img src={mayflowerLogo} alt="Mayflower GmbH" className="pokerLogo" />
                </Box>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </header>
  )
}
