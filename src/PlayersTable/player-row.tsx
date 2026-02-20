import { Button } from 'react-bootstrap';
import { useUnit } from 'effector-react';
import { setModalMode, setSelectedPlace } from '../store';

interface PlayerData {
  place: number;
  balances: number;
}

interface Props<V extends PlayerData> {
  data: V;
}

const PlayerRow = <V extends PlayerData>({ data: { place, balances } }: Props<V>) => {
  const [onSetModalMode, onSetSelectedPlace] = useUnit([setModalMode, setSelectedPlace]);

  const handleDeposit = () => {
    onSetModalMode('deposit');
    onSetSelectedPlace(place);
  };

  const handleWithdraw = () => {
    onSetModalMode('withdraw');
    onSetSelectedPlace(place);
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
