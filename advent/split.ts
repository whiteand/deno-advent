export function split(pattern: string | RegExp) {
    return (value: string) => value.split(pattern)
}