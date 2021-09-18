class Limit {
    /**
     * @deprecated The method is error prone and should not be used, use Limit.build method instead
     */
    constructor(private readonly _limit: number) {}

    public toString(): string {
        return `LIMIT ${this._limit}`;
    }

    static build = (): LimitCount => new LimitCount();
}

class LimitCount {
    constructor() {}

    public count = (count: number): Limit => new Limit(count);
}

export { Limit };
