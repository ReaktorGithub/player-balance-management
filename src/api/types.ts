// Типы данных с сервера

export interface DevicePlace {
  balances: number;
  currency: string;
  device_id: number;
  place: number;
}

export interface Device {
  created_at: string;
  id: number;
  name: string;
  places: DevicePlace[];
  updated_at: string;
}

export interface WebError {
  data?: unknown;
  err: string;
}

export interface ModBalanceRequest {
  delta: number;
}
