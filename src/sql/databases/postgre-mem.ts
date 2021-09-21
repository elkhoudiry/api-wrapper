import { QueryExecuter } from './common';
import { newDb, QueryResult } from 'pg-mem';

class PostgreMem implements QueryExecuter<QueryResult> {
    private readonly pg = newDb().adapters.createPg();
    private readonly pool = new this.pg.Pool();

    execute = async (query: string): Promise<Error | QueryResult> => {
        const client = await this.pool.connect();

        try {
            return await client.query(query);
        } catch (error: any) {
            return error;
        } finally {
            client.release();
        }
    };
}

const postgre_mem = new PostgreMem();

export { postgre_mem };
