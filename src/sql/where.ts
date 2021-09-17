import { getValidSqlValue } from './database';

class Where {
    /**
     * @deprecated The method is error prone and should not be used, use Where.build method instead
     */
    constructor(private readonly _condition: string) {}

    public and = (column: string): WhereCondition => new WhereCondition(`${this._condition} and ${column}`);

    static build = (column: string): WhereCondition => new WhereCondition(column);

    public toString(): string {
        return `WHERE ${this._condition}`;
    }
}

class WhereCondition {
    constructor(private readonly column: string) {}

    public equal = (value: string | number | boolean | null): Where => new Where(`${this.column} = ${getValidSqlValue(value)}`);

    public greater = (value: string | number | boolean | null): Where => new Where(`${this.column} > ${getValidSqlValue(value)}`);

    public lesser = (value: string | number | boolean | null): Where => new Where(`${this.column} < ${getValidSqlValue(value)}`);
}

export { Where };
