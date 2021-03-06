import { QueryResult } from 'pg-mem';
import { createDummyTable } from '../databases/dummy';
import { postgre_mem } from '../databases/postgre-mem';
import { DropTablePostfix, drop_table_sql, drop_table_sql_exist, drop_table_sql_query } from '../queries/drop-table';

// test drop table query integrity: with no properties
test('drop table integrity: no properties', () => {
    const test = 'DROP TABLE dummy_table;';
    const postfix: DropTablePostfix = { cascade: false };
    const result = drop_table_sql_query('dummy_table', postfix);

    expect(result).toBe(test);
});

// test drop table query integrity: with cascade
test('drop table integrity: no properties', () => {
    const test = 'DROP TABLE dummy_table CASCADE;';
    const postfix: DropTablePostfix = { cascade: true };
    const result = drop_table_sql_query('dummy_table', postfix);

    expect(result).toBe(test);
});

// drop exisitng table should success
test('drop exisiting table should success', async () => {
    await createDummyTable(postgre_mem, async () => {
        const postfix: DropTablePostfix = { cascade: false };
        const result = (await drop_table_sql(postgre_mem, 'dummy_table', postfix)) as QueryResult;

        expect(result.command).toBe('DROP');
    });
});

// drop non existing table should fail
test('drop non exisiting table should fail', async () => {
    const postfix: DropTablePostfix = { cascade: false };
    const result = await drop_table_sql(postgre_mem, 'dummy_table', postfix);

    expect(result instanceof Error).toBe(true);
});

// drop exisitng table should success
test('drop table if exists should success', () => {
    createDummyTable(postgre_mem, async () => {
        const postfix: DropTablePostfix = { cascade: false };
        const result = (await drop_table_sql_exist(postgre_mem, 'dummy_table', postfix)) as QueryResult;

        expect(result.command).toBe('DROP');
    });
});
