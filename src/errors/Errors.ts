import { AppError } from './AppError';
import * as messages from './Messages';

////// UTILS 1 ~ 999 //////

export const UNKNOWN_APP_ERR_CODE = 1;
export function UNKNOWN_APP_ERROR(error: any): AppError {
    return new AppError(UNKNOWN_APP_ERR_CODE, messages.UNKNOWN_APP_ERR_MESSAGE, error);
}

////// AUTH 1000 ~ 1999 //////

// JWT 1000 ~ 1099
export const JWT_INVALID_ERR_CODE = 1000;
export const JWT_INVALID_ERROR: AppError = new AppError(JWT_INVALID_ERR_CODE, messages.JWT_INVALID_ERR_MESSAGE);

export const JWT_EXPIRED_ERR_CODE = 1001;
export const JWT_EXPIRED_ERROR: AppError = new AppError(JWT_EXPIRED_ERR_CODE, messages.JWT_EXPIRED_ERR_MESSAGE);
