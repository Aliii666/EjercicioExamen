import { http } from "./http";

export type Paginated<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type RentalStatus = "RESERVED" | "ACTIVE" | "CLOSED" | "CANCELLED";

export type Rental = {
  id: number;
  vehicle_id: number;
  vehicle_plate?: string;
  customer_name: string;
  total: number | string;
  status: RentalStatus;
  created_at?: string;
};

export async function listRentalsApi() {
  const { data } = await http.get<Paginated<Rental>>("/api/rental/");
  return data;
}

export async function createRentalApi(
  payload: Pick<Rental, "vehicle_id" | "customer_name" | "total">,
) {
  const { data } = await http.post<Rental>("/api/rental/", payload);
  return data;
}

export async function updateRentalApi(id: number, payload: Partial<Rental>) {
  const { data } = await http.patch<Rental>(`/api/rental/${id}/`, payload);
  return data;
}

export async function deleteRentalApi(id: number) {
  await http.delete(`/api/rental/${id}/`);
}

export async function listPublicRentalsApi() {
  return listRentalsApi();
}
