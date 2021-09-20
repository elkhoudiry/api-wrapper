import { JsonWebTokenError } from 'jsonwebtoken';
import { sign, verify } from './token';

// test signing & verifying token
test('signing token & verifying it, returns no error', async () => {
    const signing = sign({});
    const token = signing.substring(0, 100) + signing[100] + signing.substring(101);
    const result = await verify(token);
    expect(result).toHaveProperty('iat');
});

// test modifing token
test('verifying modified token, returns error', async () => {
    const signing = sign({});
    const checkA = (char: string): string => (char === 'A' ? 'B' : 'A');
    const token = signing.substring(0, 100) + checkA(signing[100]) + signing.substring(101);
    const result = await verify(token);
    expect(result).toBeInstanceOf(JsonWebTokenError);
});
