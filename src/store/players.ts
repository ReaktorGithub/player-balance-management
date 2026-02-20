import { createStore, createEvent, sample } from 'effector';
import type { DevicePlace } from '../api';
import { $devices } from './devices.ts';

// Store для списка игроков
export const $players = createStore<DevicePlace[]>([]);

// Events для обновления players
export const setPlayers = createEvent<DevicePlace[]>();
export const setPlayerByDeviceId = createEvent<number>();

// Подписки на события
$players.on(setPlayers, (_, players) => players);

// Выбранный place
export const $selectedPlace = createStore<DevicePlace | null>(null);
export const setSelectedPlace = createEvent<DevicePlace | null>();
$selectedPlace.on(setSelectedPlace, (_, value) => value);

// Сайд эффекты
sample({
  clock: setPlayerByDeviceId,
  source: $devices,
  fn: (devices, device_id) => devices.find((d) => d.id === device_id)?.places || [],
  target: setPlayers,
});
