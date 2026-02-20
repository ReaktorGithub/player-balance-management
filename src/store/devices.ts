import { createStore, createEvent } from 'effector';
import type { Device } from '../api';

// Store для списка устройств
export const $devices = createStore<Device[]>([]);

// Store для состояния загрузки
export const $devicesLoading = createStore<boolean>(false);

// Store для ошибок
export const $devicesError = createStore<string | null>(null);

// Events для обновления devices
export const setDevices = createEvent<Device[]>();
export const addDevice = createEvent<Device>();
export const updateDevice = createEvent<{ id: number; device: Device }>();
export const removeDevice = createEvent<number>();
export const setDevicesLoading = createEvent<boolean>();
export const setDevicesError = createEvent<string | null>();

// Подписки на события
$devices
  .on(setDevices, (_, devices) => devices)
  .on(addDevice, (devices, device) => [...devices, device])
  .on(updateDevice, (devices, { id, device }) => devices.map((d) => (d.id === id ? device : d)))
  .on(removeDevice, (devices, id) => devices.filter((d) => d.id !== id));

$devicesLoading.on(setDevicesLoading, (_, loading) => loading);

$devicesError.on(setDevicesError, (_, error) => error);
