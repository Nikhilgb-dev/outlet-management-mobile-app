import { apiClient } from '../../../services/api';
import { Outlet, ApiResponse } from '../types/outlet.types';

export const outletApi = {
  list: async (search?: string) => {
    const res = await apiClient.get<ApiResponse<Outlet[]>>('/outlets', { params: search ? { search } : {} });
    return res.data.data;
  },
  get: async (id: string) => {
    const res = await apiClient.get<ApiResponse<Outlet>>(`/outlets/${id}`);
    return res.data.data;
  },
  create: async (payload: any) => {
    const res = await apiClient.post<ApiResponse<Outlet>>('/outlets', payload);
    return res.data.data;
  },
  update: async (id: string, payload: any) => {
    const res = await apiClient.put<ApiResponse<Outlet>>(`/outlets/${id}`, payload);
    return res.data.data;
  },
  remove: async (id: string) => {
    await apiClient.delete(`/outlets/${id}`);
  },
};
