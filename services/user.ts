import fs from 'fs';
import { User } from 'interfaces/user';
import path from 'path';
import { HttpException } from '../exceptions/httpException';




class UserService {

    private storagePath = path.join(__dirname, '../database/storage.json');


    //find all users service
    public findUsers(): User[] {
        const fileData = fs.readFileSync(this.storagePath, { encoding: 'utf8' })
        const storedUsers: User[] = JSON.parse(fileData);
        return storedUsers;
    }

    //find a single user
    public findUser(userId: number): User {
        const storedUsers: User[] = this.findUsers();
        const user = storedUsers.find(user => user.id == userId);
        if (!user) throw new HttpException(404, 'Worker not found');
        return user;
    }

    //create service
    public createUser(createWorkerInput: User): User {
        const storedUsers: User[] = this.findUsers();

        //does the user to be created exists?
        const doesExist = storedUsers.find(worker => worker.email == createWorkerInput.email);
        if (doesExist) throw new HttpException(409, 'Worker already exists')

        //assign ID and save worker
        const lastWorker = storedUsers[storedUsers.length - 1];
        const id = lastWorker ? lastWorker.id + 1 : 1;
        const newWorker: User = {
            id: id,
            firstName: createWorkerInput.firstName,
            lastName: createWorkerInput.lastName,
            email: createWorkerInput.email,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        storedUsers.push(newWorker);
        const savedData = this.saveData(storedUsers);
        if (!savedData) throw new HttpException(500, 'Internal server error');
        return newWorker;
    }


    //update service
    public updateUser(updateWorkerInput: User, userId: number): User {
        const storedUsers: User[] = this.findUsers();

        //does the user to be updated exists?
        const idx = storedUsers.findIndex(user => user.id == userId);
        if (idx < 0) throw new HttpException(404, 'Worker not found');

        //set new values
        const updateData: User = {
            ...storedUsers[idx],
            firstName: updateWorkerInput.firstName ? updateWorkerInput.firstName : storedUsers[idx].firstName,
            lastName: updateWorkerInput.lastName ? updateWorkerInput.lastName : storedUsers[idx].lastName,
            updatedAt: new Date()
        }
        storedUsers[idx] = updateData;

        //save data
        const savedData = this.saveData(storedUsers);
        if (!savedData) throw new HttpException(500, 'Internal server error');
        return updateData;
    }



    //delete service
    public deleteUser(userId: number): Boolean {
        const storedUsers: User[] = this.findUsers();

        //does the user to be deleted exists?
        const doesExist = storedUsers.find(user => user.id == userId);
        if (!doesExist) throw new HttpException(404, 'Worker not found');

        //delete the worker
        const newStoredUsers = storedUsers.filter(user => user.id != userId);
        const savedData = this.saveData(newStoredUsers);
        if (!savedData) throw new HttpException(500, 'Internal server error');
        return true;
    }


    //save data to the file storage
    private saveData(data: User[]): Boolean {
        let success = true;
        fs.writeFile(this.storagePath, JSON.stringify(data, null, 2), err => {
            if (err) success = false;
        });
        return success;
    }
}


export default UserService