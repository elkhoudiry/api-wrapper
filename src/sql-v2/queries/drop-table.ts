import logging from '../../utils/logging';
import { QueryExecuter } from '../databases/common';

const NAMESPACE = 'sql/queries/drop-table';

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

const drop_table_exist = <T>(executer: QueryExecuter<T>, table: string, postfix: DropTablePostfix): Promise<T | Error> => {
    return drop_table(executer, `IF EXISTS ${table}`, postfix);
};

const drop_table = async <T>(executer: QueryExecuter<T>, table: string, postfix: DropTablePostfix): Promise<T | Error> => {
    try {
        const query = drop_table_query(table, postfix);

        logging.info(NAMESPACE, `query: ${query}`);

        return await executer.execute(query);
    } catch (error: any) {
        return Error(error);
    }
};

export { drop_table, drop_table_exist, drop_table_query };
