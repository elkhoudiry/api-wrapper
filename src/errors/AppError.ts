import { AppErrorMessage } from './Messages';

// MAIN APP ERROR TYPE
export class AppError {
    constructor(readonly code: number, readonly messages: AppErrorMessage, readonly error?: any) {}
}
