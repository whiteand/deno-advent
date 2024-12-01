import { sumOf, mapValues, unzip } from "@std/collections"
import { chain, countBy, lines, split } from 'advent'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const pairs = chain(fileContent)
    .call(lines)
    .call(lines => lines.map(line => chain(line).call(split('   ')).call(arr => arr.map(Number)).value() as [number, number]))
    .value().toArray();
  const [xs, ys] = unzip(pairs)
  const ysCount = countBy(ys)
  const res = sumOf(xs.map((x) => x * (ysCount.get(x) ?? 0)), x => x)
  console.log(`Solution: ${res}`)
}
