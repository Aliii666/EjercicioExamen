import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody, Alert, Select, MenuItem, FormControl, InputLabel, Chip } from "@mui/material";
import { type Rental, type RentalStatus, listRentalsApi, createRentalApi, updateRentalApi } from "../api/rentals.api";
import { type Vehicle, listVehiclesApi } from "../api/vehicles.api";

export default function AdminRentalsPage() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [vehicleId, setVehicleId] = useState<number | null>(null);
  const [total, setTotal] = useState("");
  const [error, setError] = useState("");
  const loadRentals = async () => { try { setError(""); setRentals((await listRentalsApi()).results); } catch { setError("No se pudieron cargar los alquileres. ¿Iniciaste sesión como administrador?"); } };
  const loadVehicles = async () => { try { setVehicles((await listVehiclesApi()).results.filter((vehicle) => vehicle.is_available)); } catch { setError("No se pudieron cargar los vehículos disponibles."); } };
  useEffect(() => { void loadRentals(); void loadVehicles(); }, []);
  const createOrder = async () => {
    if (!customerName.trim() || !vehicleId || !total.trim()) return setError("Cliente, vehículo y total son requeridos.");
    const amount = Number(total); if (!Number.isFinite(amount) || amount < 0) return setError("El total debe ser un número válido.");
    try { setError(""); await createRentalApi({ vehicle_id: vehicleId, customer_name: customerName.trim(), total: amount }); setCustomerName(""); setVehicleId(null); setTotal(""); await loadRentals(); }
    catch { setError("No se pudo crear el alquiler. Verifica tu sesión de administrador."); }
  };
  const updateStatus = async (id: number, status: RentalStatus) => { try { setError(""); await updateRentalApi(id, { status }); await loadRentals(); } catch { setError("No se pudo actualizar el estado."); } };
  const statusColors: Record<RentalStatus, "default" | "primary" | "warning" | "success" | "error"> = { RESERVED: "primary", ACTIVE: "warning", CLOSED: "success", CANCELLED: "error" };
  return <Container sx={{ mt: 3 }}><Paper sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>Administrar alquileres</Typography>{error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    <Stack spacing={2} sx={{ mb: 2 }}><Stack direction={{ xs: "column", md: "row" }} spacing={2}>
      <TextField label="Nombre del cliente" value={customerName} onChange={(e) => setCustomerName(e.target.value)} fullWidth />
      <FormControl fullWidth><InputLabel>Vehículo</InputLabel><Select value={vehicleId ?? ""} onChange={(e) => setVehicleId(Number(e.target.value) || null)} label="Vehículo"><MenuItem value=""><em>Seleccione un vehículo</em></MenuItem>{vehicles.map((vehicle) => <MenuItem key={vehicle.id} value={vehicle.id}>{vehicle.plate} — {vehicle.brand}</MenuItem>)}</Select></FormControl>
      <TextField label="Total" type="number" value={total} onChange={(e) => setTotal(e.target.value)} fullWidth />
    </Stack><Stack direction="row" spacing={2}><Button variant="contained" onClick={() => void createOrder()}>Crear alquiler</Button><Button variant="outlined" onClick={() => void loadRentals()}>Refrescar</Button></Stack></Stack>
    <Table size="small"><TableHead><TableRow><TableCell>ID</TableCell><TableCell>Vehículo</TableCell><TableCell>Cliente</TableCell><TableCell>Total</TableCell><TableCell>Estado</TableCell><TableCell>Fecha</TableCell><TableCell align="right">Cambiar estado</TableCell></TableRow></TableHead><TableBody>{rentals.map((rental) => <TableRow key={rental.id}><TableCell>{rental.id}</TableCell><TableCell>{rental.vehicle_plate ?? rental.vehicle_id}</TableCell><TableCell>{rental.customer_name}</TableCell><TableCell>{rental.total}</TableCell><TableCell><Chip label={rental.status} color={statusColors[rental.status]} size="small" /></TableCell><TableCell>{rental.created_at ? new Date(rental.created_at).toLocaleString() : ""}</TableCell><TableCell align="right"><Stack direction="row" spacing={1} sx={{ justifyContent: "flex-end" }}>{(["RESERVED", "ACTIVE", "CLOSED", "CANCELLED"] as RentalStatus[]).filter((status) => status !== rental.status).map((status) => <Button key={status} size="small" variant="outlined" onClick={() => void updateStatus(rental.id, status)}>{status}</Button>)}</Stack></TableCell></TableRow>)}</TableBody></Table>
  </Paper></Container>;
}
