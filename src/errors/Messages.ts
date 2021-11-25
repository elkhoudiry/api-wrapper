// READY ENGLISH ERROR MESSAGES
export class AppErrorMessage {
    constructor(readonly en: string, readonly ar?: string) {}
}

// UTILS
export const UNKNOWN_APP_ERR_MESSAGE = new AppErrorMessage('ERROR: unknown or non handled app error!');

// DATABASE POSTGRE SQL
export const PSQL_SYNTAX_ERR_MESSAGE = (near: string) => new AppErrorMessage(`ERROR PSQL: syntax error near or at "${near}"!`);

export const PSQL_RELATION_NO_EXIST_ERR_MESSAGE = (relation: string) => new AppErrorMessage(`ERROR PSQL: relation "${relation}" does not exist!`);

export const PSQL_COLUMN_NO_EXIST_ERR_MESSAGE = (column: string, relation: string) => new AppErrorMessage(`ERROR PSQL: column "${column}" does not exist in relation: "${relation}"!`);

export const PSQL_CANNOT_INSERT_COLUMN_ERR_MESSAGE = (column: string) => new AppErrorMessage(`ERROR PSQL: cannot insert into column "${column}"!`);

export const PSQL_NOT_NULL_CONSTRAINT_ERR_MESSAGE = (column: string, relation: string) =>
    new AppErrorMessage(`ERROR PSQL: null value in column "${column}" of relation "${relation}" violates non-null constraint!`);

export const PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_MESSAGE = (input: string, type: string) => new AppErrorMessage(`ERROR PSQL: invalid input syntax for type ${type}: "${input}"!`);

export const PSQL_TABLE_NO_EXIST_ERR_MESSAGE = (table: string) => new AppErrorMessage(`ERROR PSQL: table "${table}" does not exist!`);

export const PSQL_RELATION_ALREADY_EXISTS_ERR_MESSAGE = (relation: string) => new AppErrorMessage(`ERROR PSQL: relation "${relation}" does already exists!`);
