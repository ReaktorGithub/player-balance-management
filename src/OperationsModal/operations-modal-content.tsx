import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import { useUnit } from 'effector-react';
import { $selectedPlace, setModalMode, setPlayerByDeviceId, updateDevice } from '../store';
import styles from './operations-modal.module.css';
import { useState } from 'react';
import { devicesApi } from '../api';
import {
  AMOUNT_REGEX,
  AMOUNT_SUBMIT_REGEX,
  convertUsdToKes,
  type ModalMode,
  useAppSnackbar,
} from '../shared';

interface Props {
  modalMode: ModalMode;
}

const OperationsModalContent = ({ modalMode }: Props) => {
  const [selectedPlace, onSetModalMode, onUpdateDevice, onSetPlayerByDeviceId] = useUnit([
    $selectedPlace,
    setModalMode,
    updateDevice,
    setPlayerByDeviceId,
  ]);

  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<boolean>(false);

  const { showSuccess, showError } = useAppSnackbar();

  const handleClose = () => {
    if (!pending) {
      onSetModalMode(null);
    }
  };

  const handleChange = (value: string) => {
    if (value === '') {
      setAmount(value);
      setError(null);
      return;
    }

    /*
    Такая валидация нужна в финансовых операциях по нескольким причинам.
    1. Предотвращение ошибок вычислений. Ограничение точности минимизирует проблемы с плавающей точкой в JavaScript.
    2. Единообразие данных.
    3. Интуитивно понятный ввод без неожиданных преобразований.
     */

    if (!AMOUNT_REGEX.test(value)) {
      setError('Amount must have no more than 2 decimal places');
      return;
    }

    setAmount(value);
    setError(null);
  };

  const updateBalances = async (amount: string) => {
    if (selectedPlace === null) {
      setError('Something went wrong');
      return;
    }

    setPending(true);

    try {
      const kes = convertUsdToKes(amount);
      const { device_id, place, balances } = selectedPlace;

      // Недостаточно денег
      if (modalMode === 'withdraw' && balances < kes) {
        setError('Not enough money on the balance');
        return;
      }

      const delta = modalMode === 'deposit' ? kes : kes * -1;

      await devicesApi.updateBalances({
        deviceId: device_id,
        placeId: place,
        request: {
          delta,
        },
      });

      // refetch
      const newDevice = await devicesApi.getDevice(device_id);
      onUpdateDevice({ id: device_id, device: newDevice });
      onSetPlayerByDeviceId(device_id);

      onSetModalMode(null);
      showSuccess('Success!');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch devices');
      console.error('Error updating balances:', err);
      showError('Error!');
    } finally {
      setPending(false);
    }
  };

  const handleConfirm = () => {
    setError(null);

    if (!amount || amount === '0' || !AMOUNT_SUBMIT_REGEX.test(amount)) {
      setError('Enter a valid amount');
      return;
    }

    void updateBalances(amount);
  };

  const title = modalMode === 'deposit' ? 'Deposit' : 'Withdraw';

  return (
    <Modal show onHide={handleClose}>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className={styles.formContainer}>
            <div className={styles.formInput}>
              <Form.Control
                type="text"
                value={amount}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="0.00"
              />
              <p className={styles.formLabel}>USD</p>
            </div>
            {error ? <p className={styles.formError}>{error}</p> : null}
          </div>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose} disabled={pending}>
            Close
          </Button>
          <Button variant="primary" disabled={!amount || pending} onClick={handleConfirm}>
            {pending ? <Spinner animation="border" role="status" /> : 'Confirm'}
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export { OperationsModalContent };
