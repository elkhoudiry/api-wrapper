import { SqlObject } from '../databases/common';
import { createDummyTable, createTenDummyInserts } from '../databases/dummy';
import { postgre_mem } from '../databases/postgre-mem';
import { Limit } from '../options/limit';
import { OrderBy } from '../options/order';
import { Where } from '../options/where';
import { insert, InsertPostfix } from '../queries/insert';

import { select, SelectPostfix, select_query } from '../queries/select';

// test select query integrity
test('test select query with no postfix', () => {
    const test = 'SELECT email, name FROM dummy_table;';
    const result = select_query('dummy_table', ['email, name']);

    expect(result).toStrictEqual(test);
});

// test select query integrity
test('test select query with all options', () => {
    const test = "SELECT email, name FROM dummy_table WHERE id = 0 and email > 'email@test' ORDER BY email DESC, id ASC LIMIT 5;";
    const postfix: SelectPostfix = {};
    postfix.where = Where.build('id').equal(0).and('email').greater('email@test');
    postfix.orderBy = OrderBy.build('email').desc().order('id').asc();
    postfix.limit = Limit.build().count(5);
    const result = select_query('dummy_table', ['email, name'], postfix);

    expect(result).toStrictEqual(test);
});

// test select all columns
test('select query should success', async () => {
    createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const test = values.map((obj, index) => (obj = { ...obj, id: index + 1 }));
        const insertPostfix: InsertPostfix<SqlObject> = { values };
        await insert(postgre_mem, 'dummy_table', insertPostfix);

        const result = await select(postgre_mem, 'dummy_table', ['*']);

        if (result instanceof Error) fail('select should success not fail');

        expect(result.rowCount).toBe(10);
        expect(result.rows).toStrictEqual(test);
    });
});

// test select only 1 column
test('select only 1 column should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const test = values.map((obj, index) => (obj = { email: obj.email }));
        const insertPostfix: InsertPostfix<SqlObject> = { values };
        await insert(postgre_mem, 'dummy_table', insertPostfix);

        const result = await select(postgre_mem, 'dummy_table', ['email']);

        if (result instanceof Error) fail('select should success not fail');

        expect(result.rowCount).toBe(10);
        expect(result.rows).toStrictEqual(test);
    });
});

// test select only last row
test('select select latest entery should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const test = [{ ...values[values.length - 1], id: 10 }];
        const insertPostfix: InsertPostfix<SqlObject> = { values };
        const selectPostfix: SelectPostfix = { orderBy: OrderBy.build('id').desc(), limit: Limit.build().count(1) };
        await insert(postgre_mem, 'dummy_table', insertPostfix);

        const result = await select(postgre_mem, 'dummy_table', ['*'], selectPostfix);

        if (result instanceof Error) fail('select should success not fail');

        expect(result.rowCount).toBe(1);
        expect(result.rows).toStrictEqual(test);
    });
});
