import { Grid } from "advent";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then((x) =>
    x.trim()
  );
  const grid = new Grid(fileContent.split("\n").map((line) => line.split("")));
  const pos = grid.coords().find(([r, c]) => grid.get(r, c) === "^")!;
  const { positions } = traverse(grid, pos, "up");

  console.log(`Solution: ${positions.size}`);
}

function traverse(
  grid: Grid<string>,
  pos: [number, number],
  dir: "up" | "right" | "left" | "down",
): {
  steps: number;
  positions: Set<string>;
  states: Set<string>;
  loop: boolean;
} {
  const states = new Set<string>();
  const positions = new Set<string>();
  let steps = 0;
  let loop = false;
  nextMove: while (true) {
    if (states.has(pos.join("-") + dir)) {
      loop = true;
      break;
    }

    positions.add(pos.join("-"));
    states.add(pos.join("-") + dir);
    switch (dir) {
      case "up":
        if (grid.get(pos[0] - 1, pos[1]) == null) break nextMove;
        if (grid.get(pos[0] - 1, pos[1]) == "#") {
          dir = "right";
          continue;
        }
        steps += 1;
        pos[0] -= 1;
        break;
      case "right":
        if (grid.get(pos[0], pos[1] + 1) == null) break nextMove;
        if (grid.get(pos[0], pos[1] + 1) == "#") {
          dir = "down";
          continue;
        }
        steps += 1;
        pos[1] += 1;
        break;
      case "down":
        if (grid.get(pos[0] + 1, pos[1]) == null) break nextMove;
        if (grid.get(pos[0] + 1, pos[1]) == "#") {
          dir = "left";
          continue;
        }
        steps += 1;
        pos[0] += 1;
        break;
      case "left":
        if (grid.get(pos[0], pos[1] - 1) == null) break nextMove;
        if (grid.get(pos[0], pos[1] - 1) == "#") {
          dir = "up";
          continue;
        }
        steps += 1;
        pos[1] -= 1;
        break;
      default:
        break;
    }
  }
  return { steps, positions, states, loop };
}
