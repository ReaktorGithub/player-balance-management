import { createStore, createEvent } from 'effector';
import type { Device } from '../api';

// Store для списка устройств
export const $devices = createStore<Device[]>([]);

// Текущее выбранное устройство
export const $selectedDevice = createStore<number | null>(null);

// Store для состояния загрузки
export const $devicesLoading = createStore<boolean>(false);

// Store для ошибок
export const $devicesError = createStore<string | null>(null);

// Events для обновления devices
export const setDevices = createEvent<Device[]>();
export const setSelectedDevice = createEvent<number | null>();
export const updateDevice = createEvent<{ id: number; device: Device }>();
export const setDevicesLoading = createEvent<boolean>();
export const setDevicesError = createEvent<string | null>();

// Подписки на события
$devices
  .on(setDevices, (_, devices) => devices)
  .on(updateDevice, (devices, { id, device }) => devices.map((d) => (d.id === id ? device : d)));

$devicesLoading.on(setDevicesLoading, (_, loading) => loading);

$devicesError.on(setDevicesError, (_, error) => error);

$selectedDevice.on(setSelectedDevice, (_, deviceId) => deviceId);
