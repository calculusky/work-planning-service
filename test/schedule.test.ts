import App from '../app';
import request from 'supertest';


const app = new App();

describe('GET /schedule/generate-workers-shift', () => {
    it('should generate the workers schedule', async () => {
        const { statusCode, body } = await request(app.getServer()).get('/api/schedule/generate-workers-shift');
        expect(statusCode).toBe(200);
        expect(body).toMatchObject({ data: expect.any(Array) })
    })
})