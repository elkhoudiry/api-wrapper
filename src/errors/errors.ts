export class AppError {
    constructor(readonly code: number, readonly error?: Error) {}
}

////// UTILS 1 ~ 999 //////

export const UNKNOWN_APP_ERR_CODE = 1;
export class UNKNOWN_APP_ERROR extends AppError {
    constructor(readonly error: Error) {
        super(UNKNOWN_APP_ERR_CODE, error);
    }
}

////// AUTH 1000 ~ 1999 //////

// JWT 1000 ~ 1099
export const JWT_MODIFIED_ERR_CODE = 1000;
export const JWT_MODIFIED_ERROR = new AppError(JWT_MODIFIED_ERR_CODE);

export const JWT_EXPIRED_ERR_CODE = 1001;
export const JWT_EXPIRED_ERROR = new AppError(JWT_EXPIRED_ERR_CODE);
