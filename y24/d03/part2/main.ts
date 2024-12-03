// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const matches = fileContent.matchAll(/((mul)\((\d{1,3}),(\d{1,3})\)|(do)\(\)|(don't)\(\))/g)
  let res = 0

  let activated = true
  for (const match of matches) {
    if (match[2] === 'mul') {
      if (!activated) continue
      const a = Number(match[3])
      const b = Number(match[4])
      res += a * b
      continue
    }
    if (match[6] === 'don\'t') {
      activated = false
      continue
    }
    if (match[5] === 'do') {
      activated = true
    }
  }
  console.log(`Solution: ${res}`)
}
