import { useEffect, useState } from 'react';
import { Spinner, Stack } from 'react-bootstrap';
import styles from './app.module.css';
import { PlayersTable } from './PlayersTable';
import { DevicesList } from './DevicesList';
import { devicesApi } from './api';
import type { Device } from './api';

const App = () => {
  const [devices, setDevices] = useState<Device[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await devicesApi.getDevices();
        setDevices(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch devices');
        console.error('Error fetching devices:', err);
      } finally {
        setLoading(false);
      }
    };

    void fetchDevices();
  }, []);

  console.log(devices);

  return (
    <div className={styles.container}>
      <Stack gap={4}>
        <h1>Player balance management</h1>
        <h2 className={styles.headingText}>Devices list</h2>
        {loading && <Spinner animation="border" role="status" />}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && <p>Devices loaded: {devices.length}</p>}
        <DevicesList />
        <h2 className={styles.headingText}>Players</h2>
        <PlayersTable />
      </Stack>
    </div>
  );
};

export default App;
