import { Table } from 'react-bootstrap';
import styles from './devices-table.module.css';
import { DeviceRow } from './device-row';
import { useUnit } from 'effector-react';
import { $devices } from '../store';

const DevicesTable = () => {
  const devices = useUnit($devices);

  return (
    <Table striped bordered hover responsive className={styles.table}>
      <tbody>
        <tr>
          <th>Device name</th>
          <th>Created at</th>
          <th>Updated at</th>
        </tr>
        {devices.map((device) => (
          <DeviceRow key={device.id} data={device} />
        ))}
      </tbody>
    </Table>
  );
};

export { DevicesTable };
