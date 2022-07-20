import { AppBar, Toolbar } from "@mui/material";

export default function Footer() {
  return (
    <AppBar position="relative" color="primary" sx={{ top: 'auto', bottom: 0, color: '#fff' }}>
      <Toolbar variant="dense">
        <div className="footerText">
          <p>© OpenMayday 2022 - Project44</p>
        </div>
      </Toolbar>
    </AppBar>
  )
}
