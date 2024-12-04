export class Grid<T> {
    constructor(private readonly arr: T[][]) { }
    get(i: number, j: number): T | undefined {
        return this.arr[i]?.[j]
    }
    *coords() {
        for (let i = 0; i < this.arr.length; i++) {
            for (let j = 0; j < this.arr[i].length; j++) {
                yield [i, j]
            }
        }
    }
    /// Iterates in straight line starting from i and j moving step by step increasing it by di and dj
    *slice(i: number, j: number, di: number, dj: number) {
        while (this.arr[i]?.[j]) {
            yield this.arr[i][j]
            i += di
            j += dj
        }
    }
}