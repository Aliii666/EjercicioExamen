import { Container, Paper, Typography, Stack } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export default function HomePage() {
  return <Container sx={{ mt: 3 }}><Paper sx={{ p: 3 }}>
    <Stack direction="row" sx={{ mb: 2, justifyContent: "space-between", alignItems: "center" }}><DirectionsCarIcon /><Typography variant="h5">Sistema de alquiler de vehículos</Typography></Stack>
    <Typography variant="body1" sx={{ mb: 2 }}>SPA React + TypeScript + MUI + Router. Consume la API de alquiler de vehículos.</Typography>
    <Typography variant="body2" color="text.secondary">Flujo: alquileres públicos → inicio de sesión → panel administrativo → gestión de vehículos y alquileres.</Typography>
  </Paper></Container>;
}
