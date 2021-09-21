import { AppError } from '../errors/AppError';
import { JWT_EXPIRED_ERROR, JWT_MODIFIED_ERROR, UNKNOWN_APP_ERROR } from '../errors/Errors';

function jwtErrorHandler(error: any): AppError {
    if (error.message === 'invalid signature') return JWT_MODIFIED_ERROR;
    if (error.message === 'jwt expired') return JWT_EXPIRED_ERROR;

    return UNKNOWN_APP_ERROR(error);
}

export { jwtErrorHandler };
