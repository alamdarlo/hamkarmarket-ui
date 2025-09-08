import { createTheme } from '@mui/material/styles';
import { arSD } from "@mui/x-data-grid/locales";
export default function theme() {
  return createTheme({}, arSD, {
    direction: 'rtl', palette: {
      primary: { main: "#1976d2" },
    },
    typography: {
      fontFamily: "iran-sans-font",
      fontSize: 16,
    },

    "& .MuiDataGrid-toolbarContainer": { borderBottom: "1px solid lightgray;" },
    "& .detaile": "position: absolute;height: 200px;width: 100%;margin-top: 52px;padding: 10px"
  })
};

