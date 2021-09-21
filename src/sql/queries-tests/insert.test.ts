import { QueryResult } from 'pg-mem';
import { SqlObject } from '../databases/common';
import { createDummyTable } from '../databases/dummy';
import { postgre_mem } from '../databases/postgre-mem';
import { insert_sql, InsertPostfix, insert_sql_query } from '../queries/insert';

// test inserting query integrity
test('test insert query is built correctly', async () => {
    const test = "INSERT INTO dummy_table (id,name,email) VALUES (3,'name','test@test'),(4,'name','email@test') RETURNING *;";
    const result = insert_sql_query('dummy_table', {
        values: [
            { id: 3, name: 'name', email: 'test@test' },
            { id: 4, name: 'name', email: 'email@test' }
        ]
    });

    expect(result).toStrictEqual(test);
});

// test inserting value in table
test('inserting value in table should success', async () => {
    createDummyTable(postgre_mem, async () => {
        const insertPostfix: InsertPostfix<SqlObject> = { values: [{ name: 'elephant', email: 'email@test' }] };
        const result = (await insert_sql(postgre_mem, 'dummy_table', insertPostfix)) as QueryResult;

        expect(result.rowCount).toBe(1);
        expect(result.rows[0].name).toBe('elephant');
    });
});

// test overriding identity
test('inserting value marked as identity should fail', async () => {
    createDummyTable(postgre_mem, async () => {
        const insertPostfix: InsertPostfix<SqlObject> = { values: [{ id: 5, name: 'elephant', email: 'email@test' }] };
        const result = await insert_sql(postgre_mem, 'dummy_table', insertPostfix);

        expect(result instanceof Error).toBe(true);
    });
});

// test having multiple same unique values
test('inserting multiple values marked as unique should fail', async () => {
    createDummyTable(postgre_mem, async () => {
        const insertPostfix: InsertPostfix<SqlObject> = { values: [{ name: 'elephant', email: 'email@test' }] };
        // insert first time
        await insert_sql(postgre_mem, 'dummy_table', insertPostfix);
        // insert second time
        const result = await insert_sql(postgre_mem, 'dummy_table', insertPostfix);

        expect(result instanceof Error).toBe(true);
    });
});

// test inserting empty values
test('inserting empty values should fail', async () => {
    createDummyTable(postgre_mem, async () => {
        const insertPostfix: InsertPostfix<SqlObject> = { values: [] };
        const result = await insert_sql(postgre_mem, 'dummy_table', insertPostfix);

        if (!(result instanceof Error)) fail('Not an error');

        expect(result.message).toContain('empty values');
    });
});
