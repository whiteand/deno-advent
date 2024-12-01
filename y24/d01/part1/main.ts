import { zip, sumOf, unzip } from "@std/collections"
import { ascend } from '@std/data-structures'
import { chain, lines, split } from 'advent'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const pairs = chain(fileContent)
    .call(lines)
    .call(lines => lines.map(line => chain(line).call(split('   ')).call(arr => arr.map(Number)).value() as [number, number]))
    .value().toArray();
  const [xs, ys] = unzip(pairs)

  xs.sort(ascend)
  ys.sort(ascend)

  const res = sumOf(zip(xs, ys).map(([a, b]) => Math.abs(a - b)), x => x)
  console.log(res)
}
