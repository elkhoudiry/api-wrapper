import { PoolClient } from 'pg';
import logging from '../../utils/logging';
import { Query, QueryExecuter } from '../databases/common';

const NAMESPACE = 'sql/drop-table';

export type DropTablePostfix = {
    cascade: boolean;
};

const dropTableQueryBuilder = (postfix: DropTablePostfix): string => {
    let options = '';

    !postfix.cascade ? options : (options += ` CASCADE `);

    return options.trimEnd();
};

const drop_table_query = (table: string, postfix: DropTablePostfix): string => {
    const options = dropTableQueryBuilder(postfix);
    return `DROP TABLE ${table}${options};`;
};

const drop_table_exist = <T>(executer: QueryExecuter<T>, table: string, postfix: DropTablePostfix): Query<T> => {
    return drop_table(executer, `IF EXISTS ${table}`, postfix);
};

const drop_table = <T>(executer: QueryExecuter<T>, table: string, postfix: DropTablePostfix): Query<T> => {
    const query = drop_table_query(table, postfix);

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: executer.execute(query) };
};

export { drop_table, drop_table_exist, drop_table_query };
