import * as messages from './Messages';
import * as errors from './Errors';
import { AppError } from './AppError';

test('app error: unknown', () => {
    const test = new AppError(errors.UNKNOWN_APP_ERR_CODE, messages.UNKNOWN_APP_ERR_MESSAGE, Error());
    const result = errors.UNKNOWN_APP_ERROR(Error());

    expect(result).toStrictEqual(test);
});

test('app error: jwt modified', () => {
    const test = new AppError(errors.JWT_MODIFIED_ERR_CODE, messages.JWT_MODIFIED_ERR_MESSAGE);
    const result = errors.JWT_MODIFIED_ERROR;

    expect(result).toStrictEqual(test);
});

test('app error: jwt expired', () => {
    const test = new AppError(errors.JWT_EXPIRED_ERR_CODE, messages.JWT_EXPIRED_ERR_MESSAGE);
    const result = errors.JWT_EXPIRED_ERROR;

    expect(result).toStrictEqual(test);
});
