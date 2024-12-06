import { Grid } from "advent";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const fileContent = await Deno.readTextFile(Deno.args[0]).then((x) =>
    x.trim()
  );
  const grid = new Grid(fileContent.split("\n").map((line) => line.split("")));
  const pos = grid.coords().find(([r, c]) => grid.get(r, c) === "^")!;
  const { positions } = traverse(grid, [...pos], "up");
  const candidates = [...positions].map((x) => x.split("-").map(Number));
  let total = 0;
  for (
    const [r, c] of candidates
  ) {
    grid.set(r, c, "#");
    const { loop } = traverse(grid, [...pos], "up");
    grid.set(r, c, ".");
    if (loop) total += 1;
  }

  console.log(`Solution: ${total}`);
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
    const state = pos.join("-") + "-" + dir;
    if (states.has(state)) {
      loop = true;
      break nextMove;
    }
    positions.add(pos.join("-"));
    states.add(state);
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
