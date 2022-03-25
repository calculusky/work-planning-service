import UserService from "./user";


class SchedulerService extends UserService {
    constructor() {
        super();
    }

    public generateWorkersShift = () => {
        const storedUsers = this.findUsers().sort(() => 0.5 - Math.random());
        const shifts = [
            {
                type: 'First Shift',
                duration: '8 hours',
                period: '0 - 8hrs',
                workers: []
            },
            {
                type: 'Second Shift',
                duration: '8 hours',
                period: '8 - 16hrs',
                workers: []
            },
            {
                type: 'Third Shift',
                duration: '8 hours',
                period: '16 - 24hrs',
                workers: []
            }
        ]

        //generate the timetable
        let counter = 0;
        for (let i = 0; i < storedUsers.length; i++) {
            //reset counter
            if (counter > 2) counter = 0;

            const storedWorker = {
                firstName: storedUsers[i].firstName,
                lastName: storedUsers[i].lastName,
                email: storedUsers[i].email
            }
            shifts[counter].workers.push(storedWorker);
            counter++;
        }

        return shifts;
    }

}

export default SchedulerService;