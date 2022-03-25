import App from '../app';
import request from 'supertest';
import UserService from '../services/user';
//import UserController from '../controllers/user';


const createWorkerPayload = {
    firstName: "nedu",
    lastName: "nwanxy",
    email: "nedu@gmail.com"
}

const createWorkerResData = {
    id: 1,
    firstName: "nedu",
    lastName: "nwanxy",
    email: "nedu@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date()
}

const dummyWorker = {
    id: 1,
    firstName: "nedu",
    lastName: "nwanxy",
    email: "nedu@gmail.com"
}

const app = new App();

describe('POST /users', () => {
    it('should successfully create a new worker', async () => {
        const createUserMock = jest.spyOn(UserService.prototype, 'createUser').mockReturnValueOnce(createWorkerResData);
        const { statusCode, body } = await request(app.getServer()).post('/api/users').send(createWorkerPayload);
        expect(statusCode).toBe(201);
        expect(createUserMock).toHaveBeenCalledWith(createWorkerPayload);
        expect(body).toMatchObject({
            data: {
                id: expect.any(Number),
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String),
                createdAt: expect.any(String),
                updatedAt: expect.any(String)
            }
        });

    });

    it('should fail to create worker if the input data is incorrect', async () => {
        const createWorkerPayloadMod = { ...createWorkerPayload, firstName: null };
        const { statusCode, body } = await request(app.getServer()).post('/api/users').send(createWorkerPayloadMod);
        expect(statusCode).toBe(400);

    })
});

describe('GET /users', () => {
    it('should fetch all saved workers', async () => {
        const findAllWorkersMock = jest.spyOn(UserService.prototype, 'findUsers').mockReturnValueOnce([dummyWorker]);
        const { statusCode, body } = await request(app.getServer()).get('/api/users');
        expect(statusCode).toBe(200);
        expect(body).toEqual({ data: [dummyWorker] });
        expect(findAllWorkersMock).toHaveBeenCalledTimes(1)
    });

    it('should fetch a single worker', async () => {
        const findWorkerMock = jest.spyOn(UserService.prototype, 'findUser').mockReturnValueOnce(dummyWorker);
        const { statusCode, body } = await request(app.getServer()).get('/api/users/1');
        expect(statusCode).toBe(200);
        expect(body).toEqual({ data: dummyWorker });
        expect(findWorkerMock).toHaveBeenCalledTimes(1)
    });

    it('should fail to find a worker if the worker does not exist', async () => {
        const userService = new UserService();
        const findUsersMock = jest.spyOn(userService, 'findUsers').mockReturnValue([]);
        const { statusCode } = await request(app.getServer()).get('/api/users/1');
        expect(statusCode).toBe(404);
        expect(findUsersMock).toHaveBeenCalledTimes(2);
    });
});

describe('PATCH /users/:userId', () => {
    it('should update worker details', async () => {
        const updateData = {
            firstName: 'chinedum',
            lastName: "teamway"
        }
        const updateUserMock = jest.spyOn(UserService.prototype, 'updateUser').mockReturnValueOnce(dummyWorker);
        const { statusCode, body } = await request(app.getServer()).patch('/api/users/1').send(updateData);
        expect(statusCode).toBe(200);
        expect(body).toEqual({ data: dummyWorker });
        expect(updateUserMock).toHaveBeenCalledTimes(1);
    });

    it('should fail to update worker details given a wrong input', async () => {
        const wrongInput = { firstName: 'hjkh7645', lastName: 'jkbvgcf65' }
        const { statusCode } = await request(app.getServer()).patch('/api/users/1').send(wrongInput);
        expect(statusCode).toBe(400);
    });
});

describe('DELETE /users/:userId', () => {
    it('should delete selected worker', async () => {
        const deleteUserMock = jest.spyOn(UserService.prototype, 'deleteUser').mockReturnValueOnce(true);
        const { statusCode } = await request(app.getServer()).delete('/api/users/1');
        expect(statusCode).toBe(200);
        expect(deleteUserMock).toHaveBeenCalledTimes(1);
    });

    it('should fail to delete worker if ID or worker is not found', async () => {
        const { statusCode } = await request(app.getServer()).delete('/api/users/1a');
        expect(statusCode).toBe(404)
    })
})