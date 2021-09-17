import { Client, QueryResult } from 'pg';
import { getQueryResult } from './database';
import logging from '../utils/logging';
import { Where } from './where';
import { OrderBy } from './order';

const NAMESPACE = 'sql/select';

export type SelectPostfix = {
    where?: Where;
    orderBy?: OrderBy;
};

const selectQueryOptions = (postfix?: SelectPostfix) => {
    let options = '';

    if (postfix?.where) options += ` ${postfix.where?.toString()}`;
    if (postfix?.orderBy) options += ` ${postfix.orderBy.toString()}`;

    return options;
};

const select = async (client: Client, table: string, columns: Array<string>, postfix?: SelectPostfix): Promise<QueryResult | Error> => {
    const options = selectQueryOptions(postfix);
    const query = `SELECT ${columns.join()} FROM ${table}${options};`;

    logging.info(NAMESPACE, `query: ${query}`);

    return getQueryResult(client.query(query));
};

export { select };
