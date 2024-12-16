import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");
  const machines = data.split("\n\n").map((machine) => {
    return machine.split("\n").map((section) => {
      return section
        .split(/,? [XY][\+=]/)
        .slice(1)
        .map((str) => Number(str));
    });
  });
  return machines.reduce(
    (acc, machine) => acc + getMinimumTokensRequired(machine),
    0
  );
};
const getMinimumTokensRequired = (
  machine,
  currentX = 0,
  currentY = 0,
  visited = new Set(),
  tokens = 0
) => {
  const [
    [buttonAX, buttonAY],
    [buttonBX, buttonBY],
    [prizeLocationX, prizeLocationY],
  ] = machine;

  if (visited.has(`${currentX},${currentY}`)) return 0;
  visited.add(`${currentX},${currentY}`);
  if (currentX === prizeLocationX && currentY === prizeLocationY) return 1;
  if (currentX >= prizeLocationX || currentY >= prizeLocationY) return 0;

  const directions = [
    [buttonAX, buttonAY],
    [buttonBX, buttonBY],
  ];
  let totalTokens = 0;
  for (let i = 0; i < directions.length; i++) {
    const newX = currentX + directions[i][0];
    const newY = currentY + directions[i][1];
    totalTokens +=
      getMinimumTokensRequired(machine, newX, newY, visited, tokens + 1) + 1;
  }
  return totalTokens;
};
const res_total = await solve("day-13-input-test.txt");

console.log(res_total);
