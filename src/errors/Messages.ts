// READY ENGLISH ERROR MESSAGES
export class AppErrorMessage {
    constructor(readonly en: string, readonly ar?: string) {}
}

// UTILS
export const UNKNOWN_APP_ERR_MESSAGE = new AppErrorMessage('ERROR: unknown or non handled app error!');

// AUTH JWT
export const JWT_MODIFIED_ERR_MESSAGE = new AppErrorMessage('ERROR: Authentication token has been modified!');

export const JWT_EXPIRED_ERR_MESSAGE = new AppErrorMessage('ERROR: Authentication token has expired!');
