import { Request, Response, NextFunction } from 'express';
import { queryAllClients, queryClient, insertNewClient } from '../database/clients-repo';
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

    if (!id) {
        return res.status(400).json({
            message: 'Bad Request! make sure the request is correct'
        });
    }

    const queryResults = await queryClient({ id });

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

    const queryResults = await queryClient({ email });

    if (queryResults instanceof Error) {
        return res.status(500).json({
            message: 'There is an error on our side!'
        });
    }

    return res.status(200).json({
        clients: queryResults
    });
};

/** add new client to database table */
const addNewClient = async (req: Request, res: Response, next: NextFunction) => {
    logging.info(NAMESPACE, `add new client called.`);

    const client = req.body.client;
    const insertResult = await insertNewClient(client);

    if (insertResult instanceof Error) {
        return res.status(500).json({
            message: 'There is an error on our side!'
        });
    }

    return res.status(200).json({
        client: insertResult
    });
};

export default { getAllClients, getClientById, getClientByEmail, addNewClient };
