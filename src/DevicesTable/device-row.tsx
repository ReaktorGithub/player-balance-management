import { formatMonthYear } from '../helpers';
import { useUnit } from 'effector-react/compat';
import { setPlayerByDeviceId } from '../store';
import styles from './devices-table.module.css';

interface DeviceData {
  id: number;
  created_at: string;
  updated_at: string;
  name: string;
}

interface Props<V extends DeviceData> {
  data: V;
}

const DeviceRow = <V extends DeviceData>({
  data: { id, created_at, updated_at, name },
}: Props<V>) => {
  const onSetPlayerByDeviceId = useUnit(setPlayerByDeviceId);

  const handleClick = () => {
    onSetPlayerByDeviceId(id);
  };

  return (
    <tr onClick={handleClick} className={styles.row}>
      <td>{name}</td>
      <td>{formatMonthYear(created_at)}</td>
      <td>{formatMonthYear(updated_at)}</td>
    </tr>
  );
};

export { DeviceRow };
