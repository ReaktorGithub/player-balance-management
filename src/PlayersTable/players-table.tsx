import { Table } from 'react-bootstrap';
import styles from './players-table.module.css';
import { PLAYERS_MOCK } from '../mocks';
import { PlayerRow } from './player-row.tsx';

const PlayersTable = () => {
  return (
    <Table striped bordered hover responsive className={styles.table}>
      <tbody>
        <tr>
          <th>Player</th>
          <th>Balance, $</th>
          <th></th>
          <th></th>
        </tr>
        {PLAYERS_MOCK.map((player) => (
          <PlayerRow key={player.id} name={player.name} balance={player.balance} />
        ))}
      </tbody>
    </Table>
  );
};

export { PlayersTable };
