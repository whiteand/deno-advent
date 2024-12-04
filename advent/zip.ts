import { IntoIterator } from "./IntoIterator.ts";
export function* zip<A, B>(intoA: IntoIterator<A>, intoB: IntoIterator<B>) {
    const a = Iterator.from(intoA)
    const b = Iterator.from(intoB)

    while (true) {
        const aEntry = a.next()
        if (aEntry.done) return
        const bEntry = b.next()
        if (bEntry.done) return
        yield [aEntry.value, bEntry.value]
    }
}
export function* zipLeft<A, B>(intoA: IntoIterator<A>, intoB: IntoIterator<B>) {
    const a = Iterator.from(intoA)
    const b = Iterator.from(intoB)

    while (true) {
        const aEntry = a.next()
        if (aEntry.done) return
        const bEntry = b.next()
        if (bEntry.done) {
            yield [aEntry.value, undefined]
        } else {
            yield [aEntry.value, bEntry.value]
        }
    }
}
