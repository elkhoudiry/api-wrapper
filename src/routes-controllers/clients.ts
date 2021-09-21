import { Request, Response, NextFunction } from 'express';
import { queryAllClients, queryClient, insertClient, deleteClient, isBodyClientValid, isBodyClientExist } from '../repos/clients-repo';
import { response } from '../routes/response';
import { Limit } from '../sql/options/limit';
import { OrderBy } from '../sql/options/order';
import { Where } from '../sql/options/where';
import { DeletePostfix } from '../sql/queries/delete';
import { SelectPostfix } from '../sql/queries/select';
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
    const postfix = { where: Where.build('id').equal(req.params.id) };
    const onPass = async () => response(res, await queryClient(postfix));

    return guardResponse(res, checks, onPass);
};

/** get client by id endpoint */
const getClientByEmail = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `request client by email called.`, req.params);

    const checks: Check[] = [isValidParam('email', req.params.email)];
    const postfix = { where: Where.build('email').equal(req.params.email) };
    const onPass = async () => response(res, await queryClient(postfix));

    return guardResponse(res, checks, onPass);
};

/** add new client to database table */
const addNewClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `add new client called.`, req.body);

    const checks: Check[] = [isBodyClientExist(req), isBodyClientValid(req)];
    const onPass = async () => response(res, await insertClient(req.body.client));

    return guardResponse(res, checks, onPass);
};

/** delete client from database table */
const deleteClientById = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `delete client called.`, req.params);

    const checks: Check[] = [isIntParam('id', req.params.id)];
    const postfix = { where: Where.build('id').equal(req.params.id) };
    const onPass = async () => response(res, await deleteClient(postfix));

    return guardResponse(res, checks, onPass);
};

/** delete latest client from database table */
const deleteLatestClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `delete latest client called.`, req.params);

    const checks: Check[] = [];

    const selectOrder = OrderBy.build('id').desc();
    const selectLimit = Limit.build().count(1);
    const selectPostfix: SelectPostfix = { orderBy: selectOrder, limit: selectLimit };

    const selectResult = await queryClient(selectPostfix);

    const onSelectFail = async () => response(res, Error('cannot perform select'));

    if (selectResult instanceof Error) return guardResponse(res, [], onSelectFail);

    const deletePostfix: DeletePostfix = { where: Where.build('id').equal(selectResult[0].id) };

    const onPass = async () => response(res, await deleteClient(deletePostfix));

    return guardResponse(res, checks, onPass);
};

export default { getAllClients, getClientById, getClientByEmail, addNewClient, deleteClientById, deleteLatestClient };
