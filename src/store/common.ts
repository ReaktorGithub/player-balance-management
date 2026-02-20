import { createEvent, createStore } from 'effector';
import type { ModalMode } from '../shared';

// Модалка с операциями
export const $modalMode = createStore<ModalMode | null>(null);
export const setModalMode = createEvent<ModalMode | null>();
$modalMode.on(setModalMode, (_, value) => value);
