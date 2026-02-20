import { createStore, createEvent, sample } from 'effector';
import type { DevicePlace } from '../api';
import { $devices } from './devices.ts';

// Store для списка игроков
export const $players = createStore<DevicePlace[]>([]);

// Store для состояния загрузки
export const $playersLoading = createStore<boolean>(false);

// Store для ошибок
export const $playersError = createStore<number | null>(null);

// Events для обновления players
export const setPlayers = createEvent<DevicePlace[]>();
export const setPlayerByDeviceId = createEvent<number>();
export const addPlayer = createEvent<DevicePlace>();
export const updatePlayer = createEvent<{ device_id: number; player: DevicePlace }>();
export const removePlayer = createEvent<number>();
export const setPlayersLoading = createEvent<boolean>();
export const setPlayersError = createEvent<number | null>();

// Подписки на события
$players
  .on(setPlayers, (_, players) => players)
  .on(addPlayer, (players, player) => [...players, player])
  .on(updatePlayer, (players, { device_id, player }) =>
    players.map((p) => (p.device_id === device_id ? player : p)),
  )
  .on(removePlayer, (players, device_id) => players.filter((p) => p.device_id !== device_id));

$playersLoading.on(setPlayersLoading, (_, loading) => loading);

$playersError.on(setPlayersError, (_, error) => error);

sample({
  clock: setPlayerByDeviceId,
  source: $devices,
  fn: (devices, device_id) => devices.find((d) => d.id === device_id)?.places || [],
  target: setPlayers,
});
