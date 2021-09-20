import { QueryResult } from 'pg-mem';
import { postgre_mem } from '../databases/postgre-mem';
import { CreateTablePostfix, create_table, create_table_no_exist, create_table_query, SqlColumn } from '../queries/create-table';

// test create table query with only 1 column name & type
test('query builder integrity: no properties', async () => {
    let test = 'CREATE TABLE test (id INTEGER);';
    let test_column: SqlColumn = { name: 'id', type: 'INTEGER', notNull: false, primary: false, unique: false, autoGenerate: false };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);
    expect(result).toBe(test);
});

// test create table query with only 1 column name & type & not null
test('query builder integrity: not null', async () => {
    let test = 'CREATE TABLE test (name TEXT NOT NULL);';
    let test_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: true, primary: false, unique: false, autoGenerate: false };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);

    expect(result).toBe(test);
});

// test create table query with only 1 column name & type & primary
test('query builder integrity: primary key', async () => {
    let test = 'CREATE TABLE test (name TEXT PRIMARY KEY);';
    let test_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: false, primary: true, unique: false, autoGenerate: false };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);

    expect(result).toBe(test);
});

// test create table query with only 1 column name & type & unique
test('query builder integrity: unique', async () => {
    let test = 'CREATE TABLE test (name TEXT UNIQUE);';
    let test_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: false, primary: false, unique: true, autoGenerate: false };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);

    expect(result).toBe(test);
});

// test create table query with only 1 column name & type & auto generate as identity
test('query builder integrity: auto generate as identity', async () => {
    let test = 'CREATE TABLE test (name TEXT GENERATED ALWAYS AS IDENTITY);';
    let test_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: false, primary: false, unique: false, autoGenerate: true };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);

    expect(result).toBe(test);
});

// test create table query with only 1 column name & type & default value
test('query builder integrity: default value', async () => {
    let test = "CREATE TABLE test (name TEXT DEFAULT 'ahmed');";
    let test_column: SqlColumn = { name: 'name', type: 'TEXT', notNull: false, primary: false, unique: false, autoGenerate: false, default: 'ahmed' };
    let postfix: CreateTablePostfix = { columns: [test_column] };

    let result = create_table_query('test', postfix);

    expect(result).toBe(test);
});

//test creating table with no columns should fail
test('create new table with no columns should fail', async () => {
    const postfix: CreateTablePostfix = { columns: [] };

    const result = (await create_table(postgre_mem, 'test', postfix).response) as QueryResult;

    expect(result).toBeInstanceOf(Error);
});

//test creating table should success
test('create new table with 1 column at least should success', async () => {
    const id_column: SqlColumn = { name: 'id', type: 'INTEGER', notNull: false, primary: true, unique: false, autoGenerate: true };
    const postfix: CreateTablePostfix = { columns: [id_column] };

    const result = (await create_table(postgre_mem, 'test', postfix).response) as QueryResult;

    expect(result.command).toBe('CREATE');
});

//test creating table if already exists should not fail
test('create table if already exists should success', async () => {
    const id_column: SqlColumn = { name: 'id', type: 'INTEGER', notNull: false, primary: true, unique: false, autoGenerate: true };
    const postfix: CreateTablePostfix = { columns: [id_column] };

    const result = (await create_table_no_exist(postgre_mem, 'test', postfix).response) as QueryResult;

    expect(result.command).toBe('CREATE');
});
