export class TokenTime {
    constructor(private readonly time: number, private readonly unit: 's' | 'h' | 'd') {}

    public toString = (): string => `${this.time}${this.unit}`;
}

export const USER_ACCESS_TOKEN_TIME = new TokenTime(5, 's');
export const USER_REFRESH_TOKEN_TIME = new TokenTime(1, 'd');

export const TEST_ACCESS_TOKEN_TIME = new TokenTime(1, 's');
export const TEST_REFRESH_TOKEN_TIME = new TokenTime(5, 's');

export const EXPIRED_TOKEN_TIME = new TokenTime(0, 's');
