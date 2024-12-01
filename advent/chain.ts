

export function chain<T>(value: T): Chain<T> {
    return new Chain(value);
}


class Chain<T> {
    #value: T
    constructor(value: T) {
        this.#value = value;
    }

    call<U>(f: (value: T) => U): Chain<U> {
        return new Chain(f(this.#value))
    }

    value(): T {
        return this.#value
    }
}