import { createEvent, createStore } from 'effector';
import type { ModalMode } from '../types.ts';
import type { DevicePlace } from '../api';

// Модалка с операциями
export const $modalMode = createStore<ModalMode | null>(null);
export const setModalMode = createEvent<ModalMode | null>();
$modalMode.on(setModalMode, (_, value) => value);

// Выбранный place
export const $selectedPlace = createStore<DevicePlace | null>(null);
export const setSelectedPlace = createEvent<DevicePlace | null>();
$selectedPlace.on(setSelectedPlace, (_, value) => value);
