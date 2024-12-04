import { Grid, zipLeft } from "advent";

const CROSSES = [
  [-1, -1, -1, +1],
  [-1, -1, 1, -1],
  [1, 1, -1, +1],
  [1, 1, 1, -1],
] as const;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then((x) =>
    x.trim()
  );
  const grid = new Grid(fileContent.split("\n").map((line) => line.split("")));

  const res = grid.coords()
    .filter(([i, j]) =>
      Iterator.from(CROSSES).some(([fi, fj, si, sj]) =>
        isMas(grid, i + fi, j + fj, -fi, -fj) &&
        isMas(grid, i + si, j + sj, -si, -sj)
      )
    ).reduce((a) => a + 1, 0);

  console.log(`Solution: ${res}`);
}

function isMas(
  grid: Grid<string>,
  row: number,
  col: number,
  dirRow: number,
  dirCol: number,
) {
  return zipLeft("MAS", grid.slice(row, col, dirRow, dirCol)).every((a) =>
    a[0] === a[1]
  );
}
