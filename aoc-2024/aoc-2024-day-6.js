import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");

  const map = data.split("\n").map((report) => report.split(""));

  const boundaries = [map[0].length, map.length];
  const start = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[y].length; x++) {
      if (map[y][x] === "^") {
        start.push(x, y);
      }
    }
  }

  const positionsVisited = findPath(map, start, boundaries);
  return positionsVisited;
};

const findPath = (map, start, boundaries, direction = [0, -1]) => {
  const positions = takeStep(map, start, boundaries, direction);
  return positions;
};

const takeStep = (map, position, boundaries, direction) => {
  const [x, y] = position;
  const new_x = x + direction[0];
  const new_y = y + direction[1];

  console.log(map[new_y][new_x], `(${new_x}, ${new_y})`);

  if (map[new_y][new_x] === "#") {
    console.log("turn");
    const newDirection = turn(direction);
    return takeStep(map, position, boundaries, newDirection) + 1;
  }

  if (0 > new_x > boundaries[0] || 0 > new_y > boundaries[1]) {
    console.log("done");
    return 1;
  }

  //   if (map[new_y][new_x] === ".") {
  console.log("step");
  return takeStep(map, [new_x, new_y], boundaries, direction) + 1 || 0
  //   }
  //   console.log("not caught");
};

const turn = (currentDirection) => {
  const [x, y] = currentDirection;
  console.log(x, y);

  if (y === -1 && x === 0) return [1, 0]; // up > right
  if (y === 0 && x === 1) return [0, 1]; // right > down
  if (y === 1 && x === 0) return [-1, 0]; // down > left
  if (y === 0 && x === -1) return [0, -1]; // right > up
  console.log("not caught");
};

const res = await solve("day-6-input-test.txt");
console.log(res);
