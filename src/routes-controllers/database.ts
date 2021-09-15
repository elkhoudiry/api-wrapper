import { Request, Response, NextFunction } from 'express';
import { queryAllClients, queryClientById, queryClientByEmail } from '../database/clients-repo';
import logging from '../utils/logging';

const NAMESPACE = 'routes-controller/database';

/** get all clients endpoint */
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

/** get client by id endpoint */
const getClientById = async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    logging.info(NAMESPACE, `request client id: ${id} called.`);

    const queryResults = await queryClientById(id);

    if (queryResults instanceof Error) {
        return res.status(500).json({
            message: 'There is an error on our side!'
        });
    }

    return res.status(200).json({
        clients: queryResults
    });
};

/** get client by id endpoint */
const getClientByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.params.email;
    logging.info(NAMESPACE, `request client email: ${email}, called.`);

    const queryResults = await queryClientByEmail(email);

    if (queryResults instanceof Error) {
        return res.status(500).json({
            message: 'There is an error on our side!'
        });
    }

    return res.status(200).json({
        clients: queryResults
    });
};

export default { getAllClients, getClientById, getClientByEmail };
