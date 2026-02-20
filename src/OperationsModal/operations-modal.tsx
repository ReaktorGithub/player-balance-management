import { useUnit } from 'effector-react';
import { $modalMode } from '../store';
import { OperationsModalContent } from './operations-modal-content.tsx';

const OperationsModal = () => {
  const modalMode = useUnit($modalMode);

  if (!modalMode) return null;

  return <OperationsModalContent modalMode={modalMode} />;
};

export { OperationsModal };
