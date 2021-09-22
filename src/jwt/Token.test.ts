import { JWT_EXPIRED_ERROR, JWT_INVALID_ERROR } from '../errors/Errors';
import { sign, verify } from './Token';
import { EXPIRED_TOKEN_TIME, TEST_ACCESS_TOKEN_TIME } from './Times';

// test signing & verifying token
test('signing token & verifying it, returns no error', async () => {
    const signing = sign({ name: 'elephant', admin: true }, TEST_ACCESS_TOKEN_TIME);
    const token = signing.substring(0, 100) + signing[100] + signing.substring(101);
    const result = await verify(token);

    expect(result).toHaveProperty('admin');
});

// test modifing token
test('verifying modified token, returns error', async () => {
    const signing = sign({}, TEST_ACCESS_TOKEN_TIME);
    const checkA = (char: string): string => (char === 'A' ? 'B' : 'A');
    const token = signing.substring(0, 100) + checkA(signing[100]) + signing.substring(101);
    const result = await verify(token);

    expect(result).toStrictEqual(JWT_INVALID_ERROR);
});

// test token expired tokens
test('token expires, returns error', async () => {
    const token = sign({}, EXPIRED_TOKEN_TIME);
    const result = await verify(token);

    expect(result).toStrictEqual(JWT_EXPIRED_ERROR);
});
