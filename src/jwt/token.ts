import { readFileSync } from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SqlObject } from '../sql/database';

const PRIVATE_KEY = readFileSync(`${__dirname}/../../rsa/key`, 'utf-8');
const PUBLIC_KEY = readFileSync(`${__dirname}/../../rsa/key.pub`, 'utf-8');

const sign = (payload: SqlObject): string => {
    return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256' });
};

const verify = async (token: string): Promise<string | JwtPayload | Error> => {
    try {
        return await jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    } catch (error: any) {
        return error;
    }
};

export { sign, verify };
