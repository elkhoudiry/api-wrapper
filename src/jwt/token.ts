import { readFileSync } from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../errors/errors';
import { SqlObject } from '../sql/databases/common';
import { jwtErrorHandler } from './errors-handler';
import { TokenTime } from './token-time';

const PRIVATE_KEY = readFileSync(`${__dirname}/../../rsa/key`, 'utf-8');
const PUBLIC_KEY = readFileSync(`${__dirname}/../../rsa/key.pub`, 'utf-8');

const sign = (payload: SqlObject, time: TokenTime): string => {
    return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: time.toString() });
};

const verify = async (token: string): Promise<string | JwtPayload | AppError> => {
    try {
        return await jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    } catch (error: any) {
        return jwtErrorHandler(error);
    }
};

export { sign, verify };
