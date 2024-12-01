
export function lines(str: string): IteratorObject<string, undefined, unknown> {
    return Iterator.from(new Lines(str));
}
class Lines {
    #input: string;
    constructor(value: string) {
        this.#input = value;
    }
    *[Symbol.iterator]() {
        const bytes = new TextEncoder().encode(this.#input);
        const dec = new TextDecoder();
        let nextSeq = 0;
        const n = bytes.length;
        while (nextSeq < n) {
            const ind = bytes.indexOf(10, nextSeq);
            if (ind < 0) {
                yield dec.decode(bytes.subarray(nextSeq));
                return;
            }
            yield dec.decode(bytes.subarray(nextSeq, ind));
            nextSeq = ind + 1;
        }
    }
}

