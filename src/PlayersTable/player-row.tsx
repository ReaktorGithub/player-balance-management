import { Button } from 'react-bootstrap';
import { useUnit } from 'effector-react';
import { setModalMode, setSelectedPlace } from '../store';
import type { DevicePlace } from '../api';

interface Props {
  data: DevicePlace;
}

const PlayerRow = ({ data }: Props) => {
  const [onSetModalMode, onSetSelectedPlace] = useUnit([setModalMode, setSelectedPlace]);
  const { place, balances } = data;

  const handleDeposit = () => {
    onSetModalMode('deposit');
    onSetSelectedPlace(data);
  };

  const handleWithdraw = () => {
    onSetModalMode('withdraw');
    onSetSelectedPlace(data);
  };

  return (
    <tr>
      <td>User {place}</td>
      <td>{balances}</td>
      <td>
        <Button size="sm" onClick={handleDeposit}>
          Deposit
        </Button>
      </td>
      <td>
        <Button size="sm" variant="success" onClick={handleWithdraw}>
          Withdraw
        </Button>
      </td>
    </tr>
  );
};

export { PlayerRow };
