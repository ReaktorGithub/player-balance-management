import { apiClient } from './axios-config';
import type { Device, DevicePlace, ModBalanceRequest } from './types';

export const devicesApi = {
  getDevices: async (): Promise<Device[]> => {
    const response = await apiClient.get<Device[]>('/a/devices/');
    return response.data;
  },

  getDevice: async (deviceId: number): Promise<Device> => {
    const response = await apiClient.get<Device>(`/a/devices/${deviceId}/`);
    return response.data;
  },

  updateBalances: async (options: {
    deviceId: number;
    placeId: number;
    request: ModBalanceRequest;
  }): Promise<DevicePlace> => {
    const { deviceId, placeId, request } = options;
    const response = await apiClient.post<DevicePlace>(
      `/a/devices/${deviceId}/place/${placeId}/update`,
      request,
    );
    return response.data;
  },
};
