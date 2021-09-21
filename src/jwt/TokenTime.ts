export class TokenTime {
    constructor(private readonly time: number, private readonly unit: 's' | 'h' | 'd') {}

    public toString = (): string => `${this.time}${this.unit}`;
}
