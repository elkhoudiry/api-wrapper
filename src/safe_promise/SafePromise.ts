import { AppError } from '../errors/AppError';

export type SafePromise<T> = Promise<T | AppError>;
