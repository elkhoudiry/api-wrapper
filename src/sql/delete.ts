import { PoolClient } from 'pg';
import logging from '../utils/logging';
import { Query } from './database';
import { Where } from './where';

const NAMESPACE = 'sql/delete';

export type DeletePostfix = {
    where?: Where;
};

const deleteQueryBuilder = (postfix: DeletePostfix): string => {
    return postfix.where ? postfix.where.toString() : '';
};

const deleteQuery = (client: PoolClient, table: string, postfix: DeletePostfix): Query => {
    const options = deleteQueryBuilder(postfix);
    const query = `DELETE FROM ${table} ${options} RETURNING * ;`;

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: client.query(query) };
};

export { deleteQuery };
