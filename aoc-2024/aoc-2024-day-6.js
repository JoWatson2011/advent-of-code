import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");

  const labMap = data.split("\n").map((report) => report.split(""));

  const boundaries = [labMap[0].length - 1, labMap.length - 1];
  const start = [];

  for (let y = 0; y < labMap.length; y++) {
    for (let x = 0; x < labMap[y].length; x++) {
      if (labMap[y][x] === "^") {
        start.push(x, y);
      }
    }
  }

  const positionsVisited = countPositions(labMap, start, boundaries);
  return positionsVisited;
};

const turn = (currentDirection) => {
  const [x, y] = currentDirection;
  if (y === -1 && x === 0) return [1, 0]; // up > right
  if (y === 0 && x === 1) return [0, 1]; // right > down
  if (y === 1 && x === 0) return [-1, 0]; // down > left
  if (y === 0 && x === -1) return [0, -1]; // right > up
};

const countPositions = (
  labMap,
  start,
  boundaries,
  initialDirection = [0, -1]
) => {
  let count = 0;
  let [x, y] = start;
  let currentDirection = initialDirection;

  while (x > 0 && y > 0 && x < boundaries[0] && y < boundaries[1]) {
    if (labMap[y + currentDirection[1]][x + currentDirection[0]] === "#") {
      currentDirection = turn(currentDirection);
    }
    x = x + currentDirection[0];
    y = y + currentDirection[1];

    if (labMap[y][x] === "X") continue;

    count++;
    labMap[y][x] = "X";
  }

  return count;
};

const res = await solve("day-6-input.txt");
console.log(res);
