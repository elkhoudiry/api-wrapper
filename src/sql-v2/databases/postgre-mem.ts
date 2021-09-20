import { QueryExecuter } from './common';
import { newDb, QueryResult } from 'pg-mem';

class PostgreMem implements QueryExecuter<QueryResult> {
    private readonly db = newDb();

    execute = async (query: string): Promise<Error | QueryResult> => {
        try {
            const result = this.db.public.query(query);
            return result;
        } catch (error: any) {
            return error;
        }
    };

    create_table = () => {
        this.db.public.none(`create table test(id text);
                insert into test values ('value');`);
    };

    drop_table = () => {
        this.db.public.none(`drop table test;`);
    };
}

const postgre_mem = new PostgreMem();

export { postgre_mem };
