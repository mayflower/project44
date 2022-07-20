import {
    createTheme,
    experimental_sx as sx,
} from "@mui/material/styles";

const pokerRed = '#d6251d';

export const mayflowerTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: sx({
                    "& .MuiOutlinedInput-root.MuiInputBase-colorPrimary.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: pokerRed
                        },
                    },
                    "& .MuiInputLabel-root.MuiInputBase-colorPrimary.Mui-focused": {
                        color: pokerRed
                    },
                }),
            },
        },
    },
    palette: {
        primary: {
            main: pokerRed,
            light: pokerRed,
            dark: pokerRed,
            contrastText: '#fff',
        },
        secondary: {
            main: '#fff',
            light: '#fff',
            dark: '#fff',
            contrastText: '#fff',
        },
        info: {
            main: '#666',
            light: '#666',
            dark: '#666',
            contrastText: '#fff',
        },
    },
});
