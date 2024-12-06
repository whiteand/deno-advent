export class Grid<T> {
    constructor(private readonly arr: T[][]) {}
    get(i: number, j: number): T | undefined {
        return this.arr[i]?.[j];
    }
    set(i: number, j: number, value: T): T | undefined {
        if (i < 0 || i >= this.arr.length) return;
        if (j < 0 || j >= this.arr[i].length) return;

        const prev = this.arr[i][j];
        this.arr[i][j] = value;
        return prev;
    }
    print() {
        console.table(this.arr);
    }
    clone(): Grid<T> {
        return new Grid(structuredClone(this.arr));
    }
    *coords() {
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr[i].length; j++) {
                yield [i, j] as [number, number];
            }
        }
    }
    /// Iterates in straight line starting from i and j moving step by step increasing it by di and dj
    *slice(i: number, j: number, di: number, dj: number) {
        while (this.arr[i]?.[j]) {
            yield this.arr[i][j];
            i += di;
            j += dj;
        }
    }
}
