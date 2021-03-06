import { NextFunction, Request, Response } from 'express';
import { createNewTable, createNewTableIfNotExist, dropDatabaseTable, dropDatabaseTableIfExist } from '../repos/tables-repo';
import { response } from '../routes/response';
import { Check, guardResponse, isBoolParam, isIntParam, isValidParam } from '../utils/guard';

import logging from '../utils/logging';

const NAMESPACE = 'routes-controllers/tables';

const createTable = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `create table called.`, req.params);

    const checks: Check[] = [isValidParam('name', req.params.name)];
    const onPass = async () => response(res, await createNewTable(req.params.name));

    return guardResponse(res, checks, onPass);
};

const dropTable = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `drop table called.`, req.params);

    const checks: Check[] = [isValidParam('name', req.params.name)];
    const onPass = async () => response(res, await dropDatabaseTable(req.params.name));

    return guardResponse(res, checks, onPass);
};

const dropTableIfExist = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `drop table if exist called.`, req.params);

    const checks: Check[] = [isValidParam('name', req.params.name)];
    const onPass = async () => response(res, await dropDatabaseTableIfExist(req.params.name, { cascade: false }));

    return guardResponse(res, checks, onPass);
};

const createTableIfNoExist = (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `create if not exist table called.`, req.params);

    const checks: Check[] = [isValidParam('name', req.params.name)];
    const onPass = async () => response(res, await createNewTableIfNotExist(req.params.name));

    return guardResponse(res, checks, onPass);
};

export default { createTable, createTableIfNoExist, dropTable, dropTableIfExist };
