import { AppError } from './AppError';
import * as messages from './Messages';

////// UTILS 1 ~ 999 //////

export const UNKNOWN_APP_ERR_CODE = 1;
export function UNKNOWN_APP_ERROR(error: any): AppError {
    return new AppError(UNKNOWN_APP_ERR_CODE, messages.UNKNOWN_APP_ERR_MESSAGE, error);
}

////// AUTH 1000 ~ 1999 //////

////// DATABASE 2000 ~ 3999 //////

// POSTGRE SQL 2000 ~ 2199
export const PSQL_SYNTAX_ERR_CODE = 2000;
export const PSQL_SYNTAX_ERROR = (near: string): AppError => new AppError(PSQL_SYNTAX_ERR_CODE, messages.PSQL_SYNTAX_ERR_MESSAGE(near));

export const PSQL_RELATION_NO_EXIST_ERR_CODE = 2001;
export const PSQL_RELATION_NO_EXIST_ERROR = (relation: string): AppError => new AppError(PSQL_RELATION_NO_EXIST_ERR_CODE, messages.PSQL_RELATION_NO_EXIST_ERR_MESSAGE(relation));

export const PSQL_COLUMN_NO_EXIST_ERR_CODE = 2002;
export const PSQL_COLUMN_NO_EXIST_ERROR = (column: string, relation: string): AppError => new AppError(PSQL_COLUMN_NO_EXIST_ERR_CODE, messages.PSQL_COLUMN_NO_EXIST_ERR_MESSAGE(column, relation));

export const PSQL_CANNOT_INSERT_COLUMN_ERR_CODE = 2003;
export const PSQL_CANNOT_INSERT_COLUMN_ERROR = (column: string): AppError => new AppError(PSQL_CANNOT_INSERT_COLUMN_ERR_CODE, messages.PSQL_CANNOT_INSERT_COLUMN_ERR_MESSAGE(column));

export const PSQL_NOT_NULL_CONSTRAINT_ERR_CODE = 2004;
export const PSQL_NOT_NULL_CONSTRAINT_ERROR = (column: string, relation: string): AppError =>
    new AppError(PSQL_NOT_NULL_CONSTRAINT_ERR_CODE, messages.PSQL_NOT_NULL_CONSTRAINT_ERR_MESSAGE(column, relation));

export const PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_CODE = 2005;
export const PSQL_INVALID_INPUT_SYTNAX_TYPE_ERROR = (input: string, type: string): AppError =>
    new AppError(PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_CODE, messages.PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_MESSAGE(input, type));

export const PSQL_TABLE_NO_EXIST_ERR_CODE = 2006;
export const PSQL_TABLE_NO_EXIST_ERROR = (table: string): AppError => new AppError(PSQL_TABLE_NO_EXIST_ERR_CODE, messages.PSQL_TABLE_NO_EXIST_ERR_MESSAGE(table));

export const PSQL_RELATION_ALREADY_EXISTS_ERR_CODE = 2007;
export const PSQL_RELATION_ALREADY_EXISTS_ERROR = (relation: string): AppError => new AppError(PSQL_RELATION_ALREADY_EXISTS_ERR_CODE, messages.PSQL_RELATION_ALREADY_EXISTS_ERR_MESSAGE(relation));
