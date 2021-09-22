import {
    JWTAppError,
    JWT_EXPIRED_ERROR,
    JWT_EXPIRED_ERR_CODE,
    JWT_EXPIRED_ERR_MESSAGE,
    JWT_INVALID_ERROR,
    JWT_INVALID_ERR_CODE,
    JWT_INVALID_ERR_MESSAGE,
    JWT_UKNOWN_ERR_MESSAGE,
    JWT_UNKNOWN_ERR_CODE,
    JWT_UNKONWN_ERROR
} from './JWTAppError';

test('app error: jwt unknown error', () => {
    const code = JWT_UNKNOWN_ERR_CODE;
    const message = JWT_UKNOWN_ERR_MESSAGE;
    const test = new JWTAppError(code, message, Error('error test'));
    const result = JWT_UNKONWN_ERROR(Error('error test'));

    expect(result).toStrictEqual(test);
});

test('app error: jwt modified', () => {
    const code = JWT_INVALID_ERR_CODE;
    const message = JWT_INVALID_ERR_MESSAGE;
    const test = new JWTAppError(code, message);
    const result = JWT_INVALID_ERROR;

    expect(result).toStrictEqual(test);
});

test('app error: jwt expired', () => {
    const code = JWT_EXPIRED_ERR_CODE;
    const message = JWT_EXPIRED_ERR_MESSAGE;
    const test = new JWTAppError(code, message);

    const result = JWT_EXPIRED_ERROR;

    expect(result).toStrictEqual(test);
});
