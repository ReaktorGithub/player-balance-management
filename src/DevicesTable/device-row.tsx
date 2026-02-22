import { useUnit } from 'effector-react/compat';
import { $selectedDevice, setPlayerByDeviceId, setSelectedDevice } from '../store';
import styles from './devices-table.module.css';
import { formatMonthYear } from '../shared';
import clsx from 'clsx';

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
  const [selectedDevice, onSetSelectedDevice, onSetPlayerByDeviceId] = useUnit([
    $selectedDevice,
    setSelectedDevice,
    setPlayerByDeviceId,
  ]);

  const handleClick = () => {
    onSetPlayerByDeviceId(id);
    onSetSelectedDevice(id);
  };

  const selected = selectedDevice === id;

  return (
    <tr
      onClick={handleClick}
      className={clsx({ [styles.clickableRow]: !selected, [styles.selected]: selected })}
    >
      <td>{name}</td>
      <td>{formatMonthYear(created_at)}</td>
      <td>{formatMonthYear(updated_at)}</td>
    </tr>
  );
};

export { DeviceRow };
