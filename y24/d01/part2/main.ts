import { sumOf, mapValues, unzip, runningReduce } from "@std/collections"
import { parse } from '../parse.ts'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const pairs = parse(fileContent).toArray();
  const [xs, ys] = unzip(pairs)
  const ysCount = mapValues(Object.groupBy(ys, x => x), x => x!.length)
  const res = sumOf(xs.map((x) => x * (ysCount[x] ?? 0)), x => x)
  console.log(`Solution: ${res}`)
}
