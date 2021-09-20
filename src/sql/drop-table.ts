import { PoolClient } from 'pg';
import logging from '../utils/logging';
import { Query } from './database';

const NAMESPACE = 'sql/drop-table';

export type DropTablePostfix = {
    cascade?: boolean;
};

const dropTableQueryBuilder = (postfix: DropTablePostfix): string => {
    let options = '';

    !postfix.cascade ? options : (options += `CASCADE `);

    return options;
};

const dropTableIfExistQuery = (client: PoolClient, table: string, postfix: DropTablePostfix): Query => {
    return dropTableQuery(client, `IF EXISTS ${table}`, postfix);
};

const dropTableQuery = (client: PoolClient, table: string, postfix: DropTablePostfix): Query => {
    const options = dropTableQueryBuilder(postfix);
    const query = `DROP TABLE ${table} ${options} ;`;

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: client.query(query) };
};

export { dropTableQuery, dropTableIfExistQuery };
