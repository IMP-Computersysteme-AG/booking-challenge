import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: { main: "#1f6feb" },
    background: { default: "#f6f7f9" },
  },
  shape: { borderRadius: 8 },
  typography: {
    h6: { fontWeight: 600 },
  },
});
