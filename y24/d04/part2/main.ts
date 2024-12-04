// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const grid = fileContent.split('\n').map(line => line.split(''));

  let count = 0
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (checkXMas(grid, i, j)) {
        count += 1;
      }
    }
  }
  console.log("Count", count)
}
function checkXMas(grid: string[][], i: number, j: number): boolean {
  if (grid[i][j] !== 'A') return false
  // left
  if (grid[i - 1]?.[j - 1] === 'M' && grid[i + 1]?.[j - 1] === 'M' && grid[i - 1]?.[j + 1] === 'S' && grid[i + 1]?.[j + 1] === 'S') {
    return true
  }
  // top
  if (grid[i - 1]?.[j - 1] === 'M' && grid[i - 1]?.[j + 1] === 'M' && grid[i + 1]?.[j - 1] === 'S' && grid[i + 1]?.[j + 1] === 'S') {
    return true
  }
  // rigth
  if (grid[i - 1]?.[j + 1] === 'M' && grid[i + 1]?.[j + 1] === 'M' && grid[i - 1]?.[j - 1] === 'S' && grid[i + 1]?.[j - 1] === 'S') {
    return true
  }
  // bottom
  if (grid[i + 1]?.[j - 1] === 'M' && grid[i + 1]?.[j + 1] === 'M' && grid[i - 1]?.[j - 1] === 'S' && grid[i - 1]?.[j + 1] === 'S') {
    return true
  }

  return false
}
