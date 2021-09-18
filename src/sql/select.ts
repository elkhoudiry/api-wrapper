import { Client, PoolClient } from 'pg';
import logging from '../utils/logging';
import { Where } from './where';
import { OrderBy } from './order';
import { Query } from './database';

const NAMESPACE = 'sql/select';

export type SelectPostfix = {
    where?: Where;
    orderBy?: OrderBy;
};

const selectQueryOptions = (postfix?: SelectPostfix) => {
    if (!postfix) return '';

    let options = '';

    if (postfix.where) options += ` ${postfix.where?.toString()}`;
    if (postfix.orderBy) options += ` ${postfix.orderBy.toString()}`;

    return options;
};

const select = (client: PoolClient, table: string, columns: Array<string>, postfix?: SelectPostfix): Query => {
    const options = selectQueryOptions(postfix);
    const query = `SELECT ${columns.join()} FROM ${table}${options};`;

    logging.info(NAMESPACE, `query: ${query}`);

    return { response: client.query(query) };
};

export { select };
