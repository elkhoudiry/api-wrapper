class OrderBy {
    /**
     * @deprecated The method is error prone and should not be used, use OrderBy.build method instead
     */
    constructor(private readonly _order: string) {}

    public order = (column: string): OrderByDirection => new OrderByDirection(`${this._order}, ${column}`);

    public toString(): string {
        return `ORDER BY ${this._order}`;
    }

    static build = (column: string): OrderByDirection => new OrderByDirection(column);
}

class OrderByDirection {
    constructor(private readonly column: string) {}

    public asc = (): OrderBy => new OrderBy(`${this.column} ASC`);

    public desc = (): OrderBy => new OrderBy(`${this.column} DESC`);
}

export { OrderBy };
