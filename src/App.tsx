import { useEffect } from 'react';
import { useUnit } from 'effector-react';
import { Spinner, Stack, Col, Container, Row } from 'react-bootstrap';
import styles from './app.module.css';
import { PlayersTable } from './PlayersTable';
import { devicesApi } from './api';
import {
  $devicesLoading,
  $devicesError,
  setDevices,
  setDevicesLoading,
  setDevicesError,
} from './store';
import { DevicesTable } from './DevicesTable';

const App = () => {
  const loading = useUnit($devicesLoading);
  const error = useUnit($devicesError);

  useEffect(() => {
    const fetchDevices = async () => {
      setDevicesLoading(true);
      setDevicesError(null);
      try {
        const data = await devicesApi.getDevices();
        setDevices(data);
        console.log(data);
      } catch (err) {
        setDevicesError(err instanceof Error ? err.message : 'Failed to fetch devices');
        console.error('Error fetching devices:', err);
      } finally {
        setDevicesLoading(false);
      }
    };

    void fetchDevices();
  }, []);

  return (
    <div className={styles.container}>
      <Stack gap={4}>
        <h1>Player balance management</h1>
        {loading && <Spinner animation="border" role="status" />}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}
        {!loading && !error && (
          <Container fluid>
            <Row>
              <Col lg={12} xl={5}>
                <Stack gap={2}>
                  <h2 className={styles.headingText}>Devices list</h2>
                  <DevicesTable />
                </Stack>
              </Col>
              <Col lg={12} xl={7}>
                <Stack gap={2}>
                  <h2 className={styles.headingText}>Players</h2>
                  <PlayersTable />
                </Stack>
              </Col>
            </Row>
          </Container>
        )}
      </Stack>
    </div>
  );
};

export default App;
