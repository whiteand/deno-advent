import { equal } from "@std/assert";
import { lines } from "advent";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then((x) =>
    x.trim()
  );
  const [firstPage, secondPage] = fileContent.split("\n\n");
  const definedOrder = firstPage.split("\n").map((line) =>
    line.split("|").map(Number) as [number, number]
  );

  const total = lines(secondPage)
    .filter(Boolean)
    .map((line) => line.split(",").map(Number))
    .filter((pages) => equal(pages, getOrdered(definedOrder, pages)))
    .map((x) => x[(x.length / 2) | 0])
    .reduce((a, b) => a + b, 0);

  console.log(`Solution: ${total}`);
}

function getOrdered(comparisons: [number, number][], list: number[]): number[] {
  return list.toSorted((a, b) => {
    for (const [x, y] of comparisons) {
      if (x === a && y === b) return -1;
      if (x === b && y === a) return 1;
    }
    return 0;
  });
}
