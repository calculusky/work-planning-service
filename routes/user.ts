import { Router } from 'express';
import UserController from '../controllers/user';
import UserMiddleware from '../middlewares/user';


class UserRoute {
    router = Router();
    public userController = new UserController();
    public userMiddleware = new UserMiddleware();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get('/users', this.userController.getUsers);
        this.router.get('/users/:userId', this.userController.getUser);
        this.router.post('/users', this.userMiddleware.validateWorkerInput, this.userController.createUser);
        this.router.delete('/users/:userId', this.userController.deleteUser);
        this.router.patch('/users/:userId', this.userMiddleware.validateUpdateWorkerInput, this.userController.updateUser);
    }
}

module.exports = UserRoute