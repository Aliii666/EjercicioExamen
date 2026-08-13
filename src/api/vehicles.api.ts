import { http } from "./http";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type Vehicle = {
  id: number;
  plate: string;
  brand: string;
  daily_rate: number | string;
  is_available: boolean;
};

export async function listVehiclesApi() {
  const { data } = await http.get<Paginated<Vehicle>>("/api/vehicle/");
  return data;
}

export async function createVehicleApi(payload: Omit<Vehicle, "id">) {
  const { data } = await http.post<Vehicle>("/api/vehicle/", payload);
  return data;
}

export async function updateVehicleApi(id: number, payload: Partial<Vehicle>) {
  const { data } = await http.patch<Vehicle>(`/api/vehicle/${id}/`, payload);
  return data;
}

export async function deleteVehicleApi(id: number) {
  await http.delete(`/api/vehicle/${id}/`);
}
