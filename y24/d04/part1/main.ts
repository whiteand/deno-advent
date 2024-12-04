// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then(x => x.trim())
  const grid = fileContent.split('\n').map(line => line.split(''));

  const tasks = []
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === 'X') {
        tasks.push({ row: i, col: j, text: '', dir: null })
      }
    }
  }
  let count = 0
  while (tasks.length > 0) {
    const { text, row, col, dir } = tasks.pop()!
    const newText = text + grid[row][col]
    const nextLetter = 'XMAS'[newText.length]
    if (nextLetter == null) {
      count += 1;
      continue
    }

    check(tasks, row, col, dir, grid, row - 1, col - 1, nextLetter, newText);
    check(tasks, row, col, dir, grid, row - 1, col, nextLetter, newText);
    check(tasks, row, col, dir, grid, row - 1, col + 1, nextLetter, newText);
    check(tasks, row, col, dir, grid, row, col - 1, nextLetter, newText);
    check(tasks, row, col, dir, grid, row, col + 1, nextLetter, newText);
    check(tasks, row, col, dir, grid, row + 1, col - 1, nextLetter, newText);
    check(tasks, row, col, dir, grid, row + 1, col, nextLetter, newText);
    check(tasks, row, col, dir, grid, row + 1, col + 1, nextLetter, newText);
  }

  console.log(`Solution: ${count}`)
}

function check(tasks, prevRow, prevCol, dir: [number, number] | null, grid, row, col, next, text) {
  if (dir == null) {
    if (grid[row]?.[col] === next) {
      tasks.push({ row, col, text, dir: [row - prevRow, col - prevCol] })
    }
  } else if ((row - prevRow === dir[0]) && (col - prevCol === dir[1])) {
    if (grid[row]?.[col] === next) {
      tasks.push({ row, col, text, dir: [row - prevRow, col - prevCol] })
    }
  }
}