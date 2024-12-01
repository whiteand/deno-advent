


export function countBy<T, U>(collection: Iterable<T>): Map<T, number>;
export function countBy<T, U>(collection: Iterable<T>, selector: (value: T) => U = (x) => x as any): Map<U, number> {
    const res = new Map<U, number>();
    for (const x of collection) {
        const key = selector(x);
        const prev = res.get(key) ?? 0;
        res.set(key, prev + 1);
    }
    return res;
}
