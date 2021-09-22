import { readFileSync } from 'fs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SafePromise } from '../safe_promise/SafePromise';
import { SqlObject } from '../sql/databases/common';
import { JWTAppError, jwtErrorHandler } from './JWTAppError';
import { TokenTime } from './TokenTime';

const PRIVATE_KEY = readFileSync(`${__dirname}/../../rsa/key`, 'utf-8');
const PUBLIC_KEY = readFileSync(`${__dirname}/../../rsa/key.pub`, 'utf-8');

function sign(payload: SqlObject, time: TokenTime): string {
    return jwt.sign(payload, PRIVATE_KEY, { algorithm: 'RS256', expiresIn: time.toString() });
}

async function verify(token: string): SafePromise<string | JwtPayload> {
    try {
        return await jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] });
    } catch (error: any) {
        return jwtErrorHandler(error);
    }
}

export { sign, verify };
