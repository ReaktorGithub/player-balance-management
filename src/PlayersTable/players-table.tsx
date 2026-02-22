import { Table } from 'react-bootstrap';
import styles from './players-table.module.css';
import { PlayerRow } from './player-row';
import { useUnit } from 'effector-react';
import { $players } from '../store';

const PlayersTable = () => {
  const players = useUnit($players);

  const isEmpty = players.length === 0;

  return (
    <>
      <Table striped bordered hover responsive className={styles.table}>
        <tbody>
          <tr>
            <th>Player</th>
            <th>Balance</th>
            <th></th>
            <th></th>
          </tr>
          {!isEmpty && players.map((player) => <PlayerRow key={player.place} data={player} />)}
        </tbody>
      </Table>
      {isEmpty && <p className={styles.emptyText}>Please select a device</p>}
    </>
  );
};

export { PlayersTable };
