import { Button } from 'react-bootstrap';
import { validateBalance } from './helpers.ts';

interface Props {
  name: string;
  balance: number;
}

const PlayerRow = ({ name, balance }: Props) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{validateBalance(balance)}</td>
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
