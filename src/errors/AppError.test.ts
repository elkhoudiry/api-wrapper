import * as messages from './Messages';
import * as errors from './Errors';
import { AppError } from './AppError';

test('app error: unknown', () => {
    const code = errors.UNKNOWN_APP_ERR_CODE;
    const message = messages.UNKNOWN_APP_ERR_MESSAGE;
    const test = new AppError(code, message, Error());
    const result = errors.UNKNOWN_APP_ERROR(Error());

    expect(result).toStrictEqual(test);
});

test('app error: psql syntax error', () => {
    const code = errors.PSQL_SYNTAX_ERR_CODE;
    const message = messages.PSQL_SYNTAX_ERR_MESSAGE('name');
    const test = new AppError(code, message);

    const result = errors.PSQL_SYNTAX_ERROR('name');

    expect(result).toStrictEqual(test);
});

test('app error: psql relation does not exist', () => {
    const code = errors.PSQL_RELATION_NO_EXIST_ERR_CODE;
    const message = messages.PSQL_RELATION_NO_EXIST_ERR_MESSAGE('name');
    const test = new AppError(code, message);

    const result = errors.PSQL_RELATION_NO_EXIST_ERROR('name');

    expect(result).toStrictEqual(test);
});

test('app error: psql column does not exist', () => {
    const code = errors.PSQL_COLUMN_NO_EXIST_ERR_CODE;
    const message = messages.PSQL_COLUMN_NO_EXIST_ERR_MESSAGE('name', 'table');
    const test = new AppError(code, message);

    const result = errors.PSQL_COLUMN_NO_EXIST_ERROR('name', 'table');

    expect(result).toStrictEqual(test);
});

test('app error: psql cannot insert into column', () => {
    const code = errors.PSQL_CANNOT_INSERT_COLUMN_ERR_CODE;
    const message = messages.PSQL_CANNOT_INSERT_COLUMN_ERR_MESSAGE('name');
    const test = new AppError(code, message);

    const result = errors.PSQL_CANNOT_INSERT_COLUMN_ERROR('name');

    expect(result).toStrictEqual(test);
});

test('app error: psql null constraint violation', () => {
    const code = errors.PSQL_NOT_NULL_CONSTRAINT_ERR_CODE;
    const message = messages.PSQL_NOT_NULL_CONSTRAINT_ERR_MESSAGE('name', 'table');
    const test = new AppError(code, message);

    const result = errors.PSQL_NOT_NULL_CONSTRAINT_ERROR('name', 'table');

    expect(result).toStrictEqual(test);
});

test('app error: psql invaild input syntax for type', () => {
    const code = errors.PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_CODE;
    const message = messages.PSQL_INVALID_INPUT_SYTNAX_TYPE_ERR_MESSAGE('name', 'boolean');
    const test = new AppError(code, message);

    const result = errors.PSQL_INVALID_INPUT_SYTNAX_TYPE_ERROR('name', 'boolean');

    expect(result).toStrictEqual(test);
});

test('app error: psql table does not exist', () => {
    const code = errors.PSQL_TABLE_NO_EXIST_ERR_CODE;
    const message = messages.PSQL_TABLE_NO_EXIST_ERR_MESSAGE('table');
    const test = new AppError(code, message);

    const result = errors.PSQL_TABLE_NO_EXIST_ERROR('table');

    expect(result).toStrictEqual(test);
});

test('app error: psql relation already exists', () => {
    const code = errors.PSQL_RELATION_ALREADY_EXISTS_ERR_CODE;
    const message = messages.PSQL_RELATION_ALREADY_EXISTS_ERR_MESSAGE('table');
    const test = new AppError(code, message);

    const result = errors.PSQL_RELATION_ALREADY_EXISTS_ERROR('table');

    expect(result).toStrictEqual(test);
});
