import { Where } from '../options/where';

//Test where statment working worrectly
test('where statment "equality" should be built correctly', () => {
    const test = 'WHERE id = 2';
    const result = Where.build('id').equal(2).toString();

    expect(result).toStrictEqual(test);
});

//Test where statment working worrectly
test('where statment "greeter" should be built correctly', () => {
    const test = "WHERE name > 'ahmed'";
    const result = Where.build('name').greater('ahmed').toString();

    expect(result).toStrictEqual(test);
});

//Test where statment working worrectly
test('where statment "lesser" should be built correctly', () => {
    const test = "WHERE email < 'test@test'";
    const result = Where.build('email').lesser('test@test').toString();

    expect(result).toStrictEqual(test);
});

//Test where statment working worrectly
test('where statment "and" should be built correctly', () => {
    const test = "WHERE email < 'test@test' and name > 'ahmed'";
    const result = Where.build('email').lesser('test@test').and('name').greater('ahmed').toString();

    expect(result).toStrictEqual(test);
});
