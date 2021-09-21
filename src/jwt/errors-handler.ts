import { JsonWebTokenError } from 'jsonwebtoken';
import { AppError, JWT_EXPIRED_ERROR, JWT_MODIFIED_ERROR, UNKNOWN_APP_ERROR } from '../errors/errors';

const jwtErrorHandler = (error: any): AppError => {
    if (error.message === 'invalid signature') return JWT_MODIFIED_ERROR;
    if (error.message === 'jwt expired') return JWT_EXPIRED_ERROR;

    return new UNKNOWN_APP_ERROR(error);
};

export { jwtErrorHandler };
