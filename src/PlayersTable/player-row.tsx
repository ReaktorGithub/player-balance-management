import { Button } from 'react-bootstrap';

interface PlayerData {
  place: number;
  balances: number;
}

interface Props<V extends PlayerData> {
  data: V;
}

const PlayerRow = <V extends PlayerData>({ data: { place, balances } }: Props<V>) => {
  return (
    <tr>
      <td>User {place}</td>
      <td>{balances}</td>
      <td>
        <Button size="sm">Deposit</Button>
      </td>
      <td>
        <Button size="sm" variant="success">
          Withdraw
        </Button>
      </td>
    </tr>
  );
};

export { PlayerRow };
