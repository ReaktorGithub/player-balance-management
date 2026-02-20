import { Button } from 'react-bootstrap';
import styles from './devices-list.module.css';

const DevicesList = () => {
  return (
    <div className={styles.container}>
      <Button variant="info">device 1</Button>
      <Button variant="info">device 1</Button>
      <Button variant="info">device 1</Button>
      <Button variant="info">device 1</Button>
    </div>
  );
};

export { DevicesList };
