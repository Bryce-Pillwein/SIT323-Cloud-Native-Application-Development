import request from 'supertest';
import app from '../src/app';

describe('Run API Endpoints', () => {
  it('should log a run successfully', async () => {
    const response = await request(app)
      .post('/api/run')
      .send({
        userId: 'testUser',
        startTime: '2025-04-03T10:00:00Z',
        distance: 5000,
        pace: 300,
        route: [{ lat: 0, lng: 0, timestamp: '2025-04-03T10:00:00Z' }],
      });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Run logged successfully');
  });

  it('should fetch runs for a user', async () => {
    // Log a run first to ensure data exists
    await request(app)
      .post('/api/run')
      .send({
        userId: 'testUser',
        startTime: '2025-04-03T10:00:00Z',
        distance: 5000,
        pace: 300,
        route: [{ lat: 0, lng: 0, timestamp: '2025-04-03T10:00:00Z' }],
      });

    const response = await request(app).get('/api/run/testUser');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.runs)).toBe(true);
  });
});
