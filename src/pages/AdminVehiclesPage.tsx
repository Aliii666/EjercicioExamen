import { useEffect, useState } from "react";
import { Container, Paper, Typography, TextField, Button, Stack, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Alert, Checkbox, FormControlLabel } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { type Vehicle, listVehiclesApi, createVehicleApi, updateVehicleApi, deleteVehicleApi } from "../api/vehicles.api";

export default function AdminVehiclesPage() {
  const [items, setItems] = useState<Vehicle[]>([]);
  const [plate, setPlate] = useState("");
  const [brand, setBrand] = useState("");
  const [dailyRate, setDailyRate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    try { setError(""); setItems((await listVehiclesApi()).results); }
    catch { setError("No se pudieron cargar los vehículos. ¿Iniciaste sesión como administrador?"); }
  };
  useEffect(() => { void load(); }, []);

  const clearForm = () => { setPlate(""); setBrand(""); setDailyRate(""); setIsAvailable(true); setEditId(null); };
  const save = async () => {
    if (!plate.trim() || !brand.trim() || !dailyRate.trim()) return setError("Placa, marca y tarifa diaria son requeridos.");
    const rate = Number(dailyRate);
    if (!Number.isFinite(rate) || rate < 0) return setError("La tarifa diaria debe ser un número válido.");
    try {
      setError("");
      const payload = { plate: plate.trim(), brand: brand.trim(), daily_rate: rate, is_available: isAvailable };
      if (editId) await updateVehicleApi(editId, payload); else await createVehicleApi(payload);
      clearForm(); await load();
    } catch { setError("No se pudo guardar el vehículo. Verifica que la placa no esté repetida y que tu usuario sea administrador."); }
  };
  const startEdit = (item: Vehicle) => { setEditId(item.id); setPlate(item.plate); setBrand(item.brand); setDailyRate(String(item.daily_rate)); setIsAvailable(item.is_available); };
  const remove = async (id: number) => { try { setError(""); await deleteVehicleApi(id); await load(); } catch { setError("No se pudo eliminar el vehículo. Puede tener alquileres asociados."); } };

  return <Container sx={{ mt: 3 }}><Paper sx={{ p: 3 }}>
    <Typography variant="h5" sx={{ mb: 2 }}>Administrar vehículos</Typography>
    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
    <Stack spacing={2} sx={{ mb: 2 }}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <TextField label="Placa" value={plate} onChange={(e) => setPlate(e.target.value)} fullWidth />
        <TextField label="Marca" value={brand} onChange={(e) => setBrand(e.target.value)} fullWidth />
        <TextField label="Tarifa diaria" type="number" value={dailyRate} onChange={(e) => setDailyRate(e.target.value)} fullWidth />
      </Stack>
      <FormControlLabel control={<Checkbox checked={isAvailable} onChange={(e) => setIsAvailable(e.target.checked)} />} label="Disponible" />
      <Stack direction="row" spacing={2}><Button variant="contained" onClick={() => void save()}>{editId ? "Actualizar" : "Crear"}</Button><Button variant="outlined" onClick={clearForm}>Limpiar</Button><Button variant="outlined" onClick={() => void load()}>Refrescar</Button></Stack>
    </Stack>
    <Table size="small"><TableHead><TableRow><TableCell>ID</TableCell><TableCell>Placa</TableCell><TableCell>Marca</TableCell><TableCell>Tarifa diaria</TableCell><TableCell>Disponible</TableCell><TableCell align="right">Acciones</TableCell></TableRow></TableHead>
      <TableBody>{items.map((item) => <TableRow key={item.id}><TableCell>{item.id}</TableCell><TableCell>{item.plate}</TableCell><TableCell>{item.brand}</TableCell><TableCell>{item.daily_rate}</TableCell><TableCell>{item.is_available ? "Sí" : "No"}</TableCell><TableCell align="right"><IconButton onClick={() => startEdit(item)}><EditIcon /></IconButton><IconButton onClick={() => void remove(item.id)}><DeleteIcon /></IconButton></TableCell></TableRow>)}</TableBody>
    </Table>
  </Paper></Container>;
}
