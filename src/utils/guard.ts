import { Response } from 'express';
import logging from './logging';

const NAMESPACE = 'utils/route';

export type Check = {
    code: number;
    valid: Function;
    message: string;
    [key: string]: {};
};

const isFloatParam = (param: string, value: string): Check => ({
    code: 400,
    valid: (): boolean => (value && value.match(/^-?\d+\.?\d*$/) ? true : false),
    message: `Bad request!, required { ${param} } is missing or invalid value for float type`,
    payload: { error_at: value }
});

const isIntParam = (param: string, value: string): Check => ({
    code: 400,
    valid: (): boolean => (value && value.match(/^-?\d+$/) ? true : false),
    message: `Bad request!, required { ${param} } is missing or invalid value for integer type`,
    payload: { error_at: value }
});

const isBoolParam = (param: string, value: string): Check => ({
    code: 400,
    valid: (): boolean => (value && (value === 'true' || value) === 'false' ? true : false),
    message: `Bad request!, required { ${param} } is missing or invalid value for boolean type`,
    payload: { error_at: value }
});

const isValidParam = (param: string, value: string, regex: RegExp = /^\S+$/): Check => ({
    code: 400,
    valid: (): boolean => (value && value.match(regex) ? true : false),
    message: `Bad request!, required { ${param} } is missing or invalid value syntax`,
    payload: { error_at: value }
});

const guard = (res: Response, guards: Check[]): Response | null => {
    for (let i = 0; i < guards.length; i++) {
        const guard = guards[i];

        if (!guard.valid()) {
            return res.status(guard.code).json({ message: guard.message, payload: guard.payload });
        }
    }

    return null;
};

const guardResponse = (res: Response, checks: Check[], onPass: () => Response): Response => {
    const response = guard(res, checks);
    return response ? response : onPass();
};

export { guardResponse, isFloatParam, isBoolParam, isIntParam, isValidParam };
