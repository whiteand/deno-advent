import { zip, sumOf, unzip } from "@std/collections"
import { ascend } from '@std/data-structures'
import { chain, lines } from 'advent'

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const [xs, ys] = chain(fileContent)
    .call(lines)
    .call(lines => lines.map(line => line.split('   ').map(Number) as [number, number]))
    .call(x => x.toArray())
    .call(unzip)
    .value()

  xs.sort(ascend)
  ys.sort(ascend)

  const res = sumOf(zip(xs, ys).map(([a, b]) => Math.abs(a - b)), x => x)
  console.log(`Solution: ${res}`)
}
