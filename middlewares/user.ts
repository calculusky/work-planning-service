import { HttpException } from '../exceptions/httpException';
import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { User } from 'interfaces/user';


class UserMiddleware {

    public validateWorkerInput = (req: Request, res: Response, next: NextFunction) => {
        const createWorkerInput: User = req.body;

        try {

            const schema = Joi.object({
                firstName: Joi.string().regex(/^[a-zA-Z]+$/).message('First Name must contain only letters').required(),
                lastName: Joi.string().regex(/^[a-zA-Z]+$/).message('Last Name must contain only letters').required(),
                email: Joi.string().email().message('Email must be a valid email').required()
            });


            const { error } = schema.validate(createWorkerInput);

            if (error) throw new HttpException(400, error.message);

            return next();

        } catch (error) {
            next(error);
        }
    }

    public validateUpdateWorkerInput = (req: Request, res: Response, next: NextFunction) => {
        const updateWorkerInput: User = req.body;

        try {
            const schema = Joi.object({
                firstName: Joi.string().regex(/^[a-zA-Z]+$/).message('First Name must contain only letters'),
                lastName: Joi.string().regex(/^[a-zA-Z]+$/).message('Last Name must contain only letters')
            });

            const { error } = schema.validate(updateWorkerInput);

            if (error) throw new HttpException(400, error.message);

            return next();

        } catch (error) {
            next(error);
        }
    }

}


export default UserMiddleware