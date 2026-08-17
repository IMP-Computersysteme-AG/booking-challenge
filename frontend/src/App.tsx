import EventSeatIcon from "@mui/icons-material/EventSeat";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { ResourceTable } from "./features/resources/ResourceTable";

export default function App() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      <AppBar position="static" elevation={0}>
        <Toolbar>
          <EventSeatIcon sx={{ mr: 1.5 }} />
          <Typography variant="h6" component="h1">
            Ressourcen-Buchung
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Buchbare Ressourcen
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Diese Liste ist das mitgelieferte Beispiel-Feature. Sie zeigt, wie
              Backend und Frontend in diesem Projekt zusammenspielen — und ist
              gleichzeitig der Ausgangspunkt für deine Aufgabe: Diese Ressourcen
              lassen sich noch nicht buchen. Die Aufgabenstellung steht in{" "}
              <Box component="code" sx={{ fontFamily: "monospace" }}>
                AUFGABE.md
              </Box>
              .
            </Typography>
          </Box>

          <ResourceTable />
        </Stack>
      </Container>
    </Box>
  );
}
