import { Request, Response, NextFunction } from 'express';
import { queryAllClients } from '../database/clients-repo';
import logging from '../utils/logging';

const NAMESPACE = 'routes-controller/database';

/** get all client endpoint */
const getAllClients = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, 'request all clients called.');

    const queryResults = await queryAllClients();

    if (queryResults instanceof Error) {
        return res.status(500).json({
            message: 'There is an error on our side!'
        });
    }

    return res.status(200).json({
        clients: queryResults
    });
};

export default { getAllClients };
