import { Container, ThemeProvider } from "@mui/material";
import "./style/App.css";
import { mayflowerTheme } from "./style/mayflower-theme";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import List from "./components/List/List";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import moment from 'moment';
import "moment/locale/de";
import Axios from 'axios';

const API_URL = 'https://api.project44.mayflower.tech';
export const axiosInstance = Axios.create({baseURL: API_URL})
const queryClient = new QueryClient();

moment.locale("de");
function App() {
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <ThemeProvider theme={mayflowerTheme}>
            <Header />
            <div className="body">
              <Container sx={{ marginTop: "20px" }}>
                <List />
              </Container>
            </div>
            <Footer />
          </ThemeProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
