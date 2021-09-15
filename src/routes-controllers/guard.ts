import { NextFunction, Request, Response } from 'express';
import { Check, guardResponse, isBoolParam, isIntParam, isValidParam } from '../utils/guard';

import logging from '../utils/logging';

const NAMESPACE = 'routes-controllers/guard';

const check = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `sample guard check route called.`, req.params);

    const checks: Check[] = [isIntParam('number', req.params.number), isValidParam('email', req.params.email), isBoolParam('verified', req.params.verified)];
    const onPass = async () => res.status(200).json({ message: 'pong' });

    return guardResponse(res, checks, onPass);
};

export default { check };
