import { Request, Response, NextFunction } from 'express';
import { queryAllClients, queryClient, insertClient, isBodyClientValid, isBodyClientExist } from '../repos/clients-repo';
import { Where } from '../sql/where';
import { response } from '../routes/response';
import { Check, guardResponse, isIntParam, isValidParam } from '../utils/guard';
import logging from '../utils/logging';

const NAMESPACE = 'routes-controller/database';

/** get all clients endpoint */
const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'request all clients called.');

    const checks: Check[] = [];
    const onPass = async () => response(res, await queryAllClients());

    return guardResponse(res, checks, onPass);
};

/** get client by id endpoint */
const getClientById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `request client by id called.`, req.params);

    const checks: Check[] = [isIntParam('id', req.params.id)];
    const onPass = async () => response(res, await queryClient(Where.build('id').equal(req.params.id)));

    return guardResponse(res, checks, onPass);
};

/** get client by id endpoint */
const getClientByEmail = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `request client by email called.`, req.params);

    const checks: Check[] = [isValidParam('email', req.params.email)];
    const onPass = async () => response(res, await queryClient(Where.build('email').equal(req.params.email)));

    return guardResponse(res, checks, onPass);
};

/** add new client to database table */
const addNewClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `add new client called.`, req.body);

    const checks: Check[] = [isBodyClientExist(req), isBodyClientValid(req)];
    const onPass = async () => response(res, await insertClient(req.body.client));

    return guardResponse(res, checks, onPass);
};

export default { getAllClients, getClientById, getClientByEmail, addNewClient };
