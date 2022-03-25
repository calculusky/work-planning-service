import { HttpException } from "../exceptions/httpException";
import { NextFunction, Request, Response } from "express";
import { User } from "../interfaces/user";
import UserService from "../services/user";


class UserController {

    public userService = new UserService();

    //creates a new worker
    public createUser = (req: Request, res: Response, next: NextFunction) => {
        const createWorkerInput: User = req.body;
        try {
            const createdWorker = this.userService.createUser(createWorkerInput);

            res.status(201).json({ data: createdWorker })

        } catch (error) {
            next(error);
        }
    }


    //update a worker details
    public updateUser = (req: Request, res: Response, next: NextFunction) => {
        const updateWorkerInput: User = req.body;
        const { userId } = req.params;
        try {
            const updatedUser = this.userService.updateUser(updateWorkerInput, +userId);
            res.json({ data: updatedUser })

        } catch (error) {
            next(error);
        }
    }


    //deletes a worker
    public deleteUser = (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const deletedUser = this.userService.deleteUser(+userId);
            res.json({ success: 'Worker successfully deleted' })

        } catch (error) {
            next(error);
        }
    }


    //get all users
    public getUsers = (req: Request, res: Response, next: NextFunction) => {
        try {
            const users = this.userService.findUsers();
            const theUsers = users.map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email
            }))
            res.json({ data: theUsers })

        } catch (error) {
            next(error);
        }
    }

    //get a single user
    public getUser = (req: Request, res: Response, next: NextFunction) => {
        const { userId } = req.params;
        try {
            const user = this.userService.findUser(+userId);
            res.json({ data: user })

        } catch (error) {
            next(error);
        }
    }


}


export default UserController;