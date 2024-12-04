import { Grid, zipLeft } from "advent";

const DIRS = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, 1],
  [0, -1],
  [1, -1],
  [1, 0],
  [1, 1],
] as const;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then((x) =>
    x.trim()
  );
  const grid = new Grid(fileContent.split("\n").map((line) => line.split("")));

  const res = grid.coords().flatMap(([i, j]) =>
    Iterator.from(DIRS).filter((dir) =>
      zipLeft("XMAS", grid.slice(i, j, dir[0], dir[1])).every((a) =>
        a[0] === a[1]
      )
    )
  ).reduce((a) => a + 1, 0);
  console.log(`Solution: ${res}`);
}
