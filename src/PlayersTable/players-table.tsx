import { Table } from 'react-bootstrap';
import styles from './players-table.module.css';
import { PlayerRow } from './player-row.tsx';
import { useUnit } from 'effector-react';
import { $players } from '../store';

const PlayersTable = () => {
  const players = useUnit($players);

  return (
    <Table striped bordered hover responsive className={styles.table}>
      <tbody>
        <tr>
          <th>Player</th>
          <th>Balance</th>
          <th></th>
          <th></th>
        </tr>
        {players.map((player) => (
          <PlayerRow key={player.place} data={player} />
        ))}
      </tbody>
    </Table>
  );
};

export { PlayersTable };
