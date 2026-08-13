import { useEffect, useState } from "react";
import { Container, Paper, Typography, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { type Rental, listPublicRentalsApi } from "../api/rentals.api";

export default function PublicRentalsPage() {
  const [items, setItems] = useState<Rental[]>([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const data = await listPublicRentalsApi();
      setItems(data.results);
    } catch {
      setError("No se pudo cargar la lista de alquileres. ¿El backend está encendido?");
    }
  };

  useEffect(() => { void load(); }, []);

  return (
    <Container sx={{ mt: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h5">Alquileres</Typography>
          <Button variant="outlined" onClick={() => void load()}>Refrescar</Button>
        </Stack>
        {error && <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>}
        <Table size="small">
          <TableHead><TableRow><TableCell>ID</TableCell><TableCell>Vehículo</TableCell><TableCell>Cliente</TableCell><TableCell>Total</TableCell><TableCell>Estado</TableCell><TableCell>Fecha</TableCell></TableRow></TableHead>
          <TableBody>{items.map((rental) => (
            <TableRow key={rental.id}><TableCell>{rental.id}</TableCell><TableCell>{rental.vehicle_plate ?? rental.vehicle_id}</TableCell><TableCell>{rental.customer_name}</TableCell><TableCell>{rental.total}</TableCell><TableCell>{rental.status}</TableCell><TableCell>{rental.created_at ? new Date(rental.created_at).toLocaleString() : ""}</TableCell></TableRow>
          ))}</TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
