import { Response } from 'express';

const response = <T>(res: Response, result: T | Error): Response<T> => {
    if (result instanceof Error) return res.status(500).json({ message: 'Internal Server Error!' });
    else return res.status(200).json({ result: result });
};

export { response };
