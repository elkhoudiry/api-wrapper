import { AppError } from '../errors/AppError';
import { AppErrorMessage } from '../errors/Messages';

export class JWTAppError extends AppError {}

function jwtErrorHandler(error: any): AppError {
    if (error.message === 'invalid signature') return JWT_INVALID_ERROR;
    if (error.message === 'jwt expired') return JWT_EXPIRED_ERROR;

    return JWT_UNKONWN_ERROR(error);
}

// AUTH JWT ERROR MESSAGES
export const JWT_UKNOWN_ERR_MESSAGE = new AppErrorMessage('ERROR: Encountered unknown error!');
export const JWT_INVALID_ERR_MESSAGE = new AppErrorMessage('ERROR: Authentication token is invalid!');
export const JWT_EXPIRED_ERR_MESSAGE = new AppErrorMessage('ERROR: Authentication token has expired!');

// JWT ERROR CODES 1000 ~ 1099
export const JWT_UNKNOWN_ERR_CODE = 1000;
export const JWT_INVALID_ERR_CODE = 1001;
export const JWT_EXPIRED_ERR_CODE = 1002;

// JWT PREDEFIED ERRORS
export const JWT_UNKONWN_ERROR = (error: any): JWTAppError => new JWTAppError(JWT_UNKNOWN_ERR_CODE, JWT_UKNOWN_ERR_MESSAGE, error);

export const JWT_INVALID_ERROR: AppError = new JWTAppError(JWT_INVALID_ERR_CODE, JWT_INVALID_ERR_MESSAGE);
export const JWT_EXPIRED_ERROR: AppError = new JWTAppError(JWT_EXPIRED_ERR_CODE, JWT_EXPIRED_ERR_MESSAGE);

export { jwtErrorHandler };
