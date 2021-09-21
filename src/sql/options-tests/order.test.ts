import { OrderBy } from '../options/order';

//Test Orderby statment working worrectly
test('orderby statment ascending should be built correctly', () => {
    const test = 'ORDER BY email ASC';
    const result = OrderBy.build('email').asc().toString();

    expect(result).toStrictEqual(test);
});

//Test Orderby statment working worrectly
test('orderby statment descending should be built correctly', () => {
    const test = 'ORDER BY email DESC';
    const result = OrderBy.build('email').desc().toString();

    expect(result).toStrictEqual(test);
});

//Test Orderby statment working worrectly
test('orderby statment chanined should be built correctly', () => {
    const test = 'ORDER BY email DESC, name ASC, id DESC';
    const result = OrderBy.build('email').desc().order('name').asc().order('id').desc().toString();

    expect(result).toStrictEqual(test);
});
