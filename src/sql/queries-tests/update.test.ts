import { QueryResult } from 'pg-mem';
import { createDummyInsertsTest, createDummyTable, createTenDummyInserts } from '../databases/dummy';
import { postgre_mem } from '../databases/postgre-mem';
import { Where } from '../options/where';
import { insert_sql } from '../queries/insert';
import { UpdatePostfix, update_sql, update_sql_query } from '../queries/update';

// test update sentence integrity
test('test update statment is built correctly', () => {
    const test = "UPDATE dummy_table SET id=5,name='elephant' RETURNING *;";
    const result = update_sql_query('dummy_table', { id: 5, name: 'elephant' }, {});

    expect(result).toStrictEqual(test);
});

// test update query
test('update query should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        // @ts-expect-error
        const test = createDummyInsertsTest().map((obj) => (obj = { ...obj, name: 'new name' }));
        await insert_sql(postgre_mem, 'dummy_table', { values });

        const result = await update_sql(postgre_mem, 'dummy_table', { name: 'new name' }, {});

        expect((result as QueryResult).rows).toStrictEqual(test);
    });
});

// test update query
test('update query only where should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const test = createDummyInsertsTest()
            // @ts-expect-error
            .map((obj) => (obj = { ...obj, name: 'new name' }))
            .splice(5);

        const postfix: UpdatePostfix = { where: Where.build('id').greater(5) };
        await insert_sql(postgre_mem, 'dummy_table', { values });

        const result = await update_sql(postgre_mem, 'dummy_table', { name: 'new name' }, postfix);

        expect((result as QueryResult).rows).toStrictEqual(test);
    });
});
