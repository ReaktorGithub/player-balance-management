import { createEvent, createStore } from 'effector';
import type { ModalMode } from '../types.ts';
import { setPlayerByDeviceId } from './players.ts';

// Модалка с операциями
export const $modalMode = createStore<ModalMode | null>(null);
export const setModalMode = createEvent<ModalMode | null>();
$modalMode.on(setModalMode, (_, value) => value);

// Выбранный device_id
export const $selectedDeviceId = createStore<number | null>(null);
export const setSelectedDeviceId = createEvent<number | null>();
$selectedDeviceId
  .on(setSelectedDeviceId, (_, value) => value)
  .on(setPlayerByDeviceId, (_, value) => value);

// Выбранный place
export const $selectedPlace = createStore<number | null>(null);
export const setSelectedPlace = createEvent<number | null>();
$selectedPlace.on(setSelectedPlace, (_, value) => value);
