import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useResources } from "./useResources";

/**
 * The example feature: lists the bookable resources.
 *
 * It shows the three states a remote list has — loading, failed, loaded — because the failure case
 * is the one that usually gets forgotten.
 */
export function ResourceTable() {
  const { resources, loading, error, reload } = useResources();

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress aria-label="Ressourcen werden geladen" />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert
        severity="error"
        action={
          <Button color="inherit" size="small" onClick={reload}>
            Erneut versuchen
          </Button>
        }
      >
        {error}
      </Alert>
    );
  }

  return (
    <TableContainer component={Paper} variant="outlined">
      <Table aria-label="Buchbare Ressourcen">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Kategorie</TableCell>
            <TableCell>Standort</TableCell>
            <TableCell align="right">Plätze</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map((resource) => (
            <TableRow key={resource.id} hover>
              <TableCell>{resource.name}</TableCell>
              <TableCell>
                <Chip label={resource.category} size="small" />
              </TableCell>
              <TableCell>{resource.location}</TableCell>
              <TableCell align="right">{resource.capacity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
