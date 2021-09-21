import { QueryResult } from 'pg-mem';
import { SqlObject } from '../databases/common';
import { createDummyTable, createTenDummyInserts } from '../databases/dummy';
import { postgre_mem } from '../databases/postgre-mem';
import { Where } from '../options/where';
import { delete_sql, delete_sql_query } from '../queries/delete';
import { insert_sql, InsertPostfix } from '../queries/insert';

// test delete query sentense with no options
test('delete query integrity with no options', async () => {
    const test = 'DELETE FROM dummy_table RETURNING *;';
    const result = delete_sql_query('dummy_table', {});

    expect(result).toStrictEqual(test);
});

// test delete whole table
test('delete whole table should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const testValues = values.map((obj, index) => (obj = { ...obj, id: index + 1 }));
        const insertPostfix: InsertPostfix<SqlObject> = { values };
        await insert_sql(postgre_mem, 'dummy_table', insertPostfix);

        const deleteResult = await delete_sql(postgre_mem, 'dummy_table', {});

        expect((deleteResult as QueryResult).rows).toStrictEqual(testValues);
    });
});

// test delete WHERED values
test('delete selected values with "WHERE" should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const values = createTenDummyInserts();
        const testValues = values.map((obj, index) => (obj = { ...obj, id: index + 1 }));
        const insertPostfix: InsertPostfix<SqlObject> = { values };
        await insert_sql(postgre_mem, 'dummy_table', insertPostfix);

        const deleteResult = await delete_sql(postgre_mem, 'dummy_table', { where: Where.build('id').greater(5) });

        expect((deleteResult as QueryResult).rows).toStrictEqual(testValues.splice(5));
    });
});
