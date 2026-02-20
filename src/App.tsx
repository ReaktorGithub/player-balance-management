import { Stack } from 'react-bootstrap';
import styles from './app.module.css';
import { PlayersTable } from './PlayersTable';
import { DevicesList } from './DevicesList';

const App = () => {
  return (
    <div className={styles.container}>
      <Stack gap={4}>
        <h1>Player balance management</h1>
        <h2 className={styles.headingText}>Devices list</h2>
        <DevicesList />
        <h2 className={styles.headingText}>Players</h2>
        <PlayersTable />
      </Stack>
    </div>
  );
};

export default App;
