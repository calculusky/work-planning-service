import { Router } from 'express';

import SchedulerController from '../controllers/scheduler';



class TimetableRoute {
    public schedulerController = new SchedulerController();

    router = Router();

    constructor() {
        this.initializeRoute();
    }

    private initializeRoute() {
        this.router.get('/schedule/generate-workers-shift', this.schedulerController.getWorkersSchedule);
    }
}


module.exports = TimetableRoute;    