import { Request, Response, NextFunction } from 'express';
import logging from '../utils/logging';

const NAMESPACE = 'routes-controller/time';

/** get time now */
// TODO more info about timezone and offset
const getTimeNow = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'request time called.');
    return res.status(200).json({
        time: new Date().toISOString(),
        todo: 'TODO more info about timezone and offset'
    });
};

export default { getTimeNow };
