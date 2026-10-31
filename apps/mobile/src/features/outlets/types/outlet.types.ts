export interface Outlet {
  id: string;
  name: string;
  contactPerson: string;
  phone: string;
  address: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
