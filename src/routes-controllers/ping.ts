import { Request, Response, NextFunction } from 'express';
import logging from '../utils/logging';

const NAMESPACE = 'routes-controller/ping';

const ping = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'sample ping check route called.');
    return res.status(200).json({ message: 'pong' });
};

export { ping };
