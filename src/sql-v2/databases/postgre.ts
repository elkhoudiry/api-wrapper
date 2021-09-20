import { Pool, QueryResult } from 'pg';
import { QueryExecuter } from './common';

import logging from '../../utils/logging';

const NAMESPACE = 'sql/databases/postgre';

class Postgre implements QueryExecuter<QueryResult> {
    private readonly pool = new Pool({
        connectionString: process.env.DATABASE_URL
    });

    execute = async (query: string): Promise<QueryResult | Error> => {
        const client = await this.pool.connect();
        let result: QueryResult | Error;
        try {
            result = await client.query(query);
        } catch (error: any) {
            if (error instanceof Error) logging.error(NAMESPACE, error.message);
            result = error;
        }
        await client.release();
        return result;
    };
}

const postgre = new Postgre();

export { postgre };
