export function parse(fileContent: string): IteratorObject<[number, number], undefined, unknown> {
    return Iterator.from(fileContent.split('\n'))
        .map(line => line.split('   ').map(Number) as [number, number])
}