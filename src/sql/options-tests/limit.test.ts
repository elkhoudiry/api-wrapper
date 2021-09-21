import { Limit } from '../options/limit';

//Test limit statment working worrectly
test('limit statment should be built correctly', () => {
    const test = 'LIMIT 60';
    const result = Limit.build().count(60).toString();

    expect(result).toStrictEqual(test);
});
