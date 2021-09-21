import { TokenTime } from './TokenTime';

export const USER_ACCESS_TOKEN_TIME = new TokenTime(5, 's');
export const USER_REFRESH_TOKEN_TIME = new TokenTime(1, 'd');

export const TEST_ACCESS_TOKEN_TIME = new TokenTime(1, 's');
export const TEST_REFRESH_TOKEN_TIME = new TokenTime(5, 's');

export const EXPIRED_TOKEN_TIME = new TokenTime(0, 's');
