import { Request, Response, NextFunction } from 'express';
import SchedulerService from '../services/scheduler';


class Scheduler {
    public scheduleService = new SchedulerService();

    public getWorkersSchedule = (req: Request, res: Response, next: NextFunction) => {
        try {
            const getSchedule = this.scheduleService.generateWorkersShift();
            return res.json({ data: getSchedule })

        } catch (error) {
            next(error);
        }

    }

}

export default Scheduler