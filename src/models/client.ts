import { SqlObject } from '../sql/database';

export class LocalClient implements SqlObject {
    readonly id: number;
    readonly email: string;
    readonly code: string;
    readonly verified: boolean;
    [key: string]: any;

    constructor(id: number, email: string, code: string, verified: boolean) {
        this.id = id;
        this.email = email;
        this.code = code;
        this.verified = verified;
    }

    static checkType = (obj: SqlObject): boolean => {
        if (!obj) return false;
        if (!obj.email || typeof obj.email !== 'string') return false;
        if (!obj.code || typeof obj.code !== 'string') return false;
        if (typeof obj.verified !== 'boolean') return false;

        return true;
    };

    static structure = (): string => {
        return 'required properties: email: string, code: string, verified: boolean';
    };
}

export {};
