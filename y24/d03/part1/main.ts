// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const matches = fileContent.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)
  let res = 0
  for (const [_, a, b] of matches) {
    res += Number(a) * Number(b)
  }
  console.log(`Solution: ${res}`)
}
