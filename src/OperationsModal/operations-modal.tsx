import { Button, Form, Modal } from 'react-bootstrap';
import { useUnit } from 'effector-react';
import { $modalMode, $selectedDeviceId, $selectedPlace, setModalMode } from '../store';
import styles from './operations-modal.module.css';
import { useState } from 'react';
import { convertUsdToKes } from './helpers.ts';

const AMOUNT_REGEX = /^(?:0|[1-9]\d*)?(?:\.\d{0,2})?$/;
const AMOUNT_SUBMIT_REGEX = /^(0|[1-9]\d*)(\.\d{1,2})?$/;

const OperationsModal = () => {
  const [selectedDeviceId, selectedPlace, modalMode, onSetModalMode] = useUnit([
    $selectedDeviceId,
    $selectedPlace,
    $modalMode,
    setModalMode,
  ]);

  const [amount, setAmount] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    onSetModalMode(null);
  };

  const handleChange = (value: string) => {
    if (value === '') {
      setAmount(value);
      setError(null);
      return;
    }

    if (!AMOUNT_REGEX.test(value)) {
      setError('Amount must have no more than 2 decimal places');
      return;
    }

    setAmount(value);
    setError(null);
  };

  const handleConfirm = () => {
    if (!amount || amount === '0' || !AMOUNT_SUBMIT_REGEX.test(amount)) {
      setError('Enter a valid amount');
      return;
    }

    setError(null);

    const kes = convertUsdToKes(amount);

    console.log(kes);
  };

  const title = modalMode === 'deposit' ? 'Deposit' : 'Withdraw';

  return (
    <Modal show={Boolean(modalMode)} onHide={handleClose}>
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
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" disabled={!amount} onClick={handleConfirm}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
};

export { OperationsModal };
