import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");
  const stones = data.split(" ");

  const part1 = getStoneArrangement(stones, 25);
  return { part1  };
};


const getStoneArrangement = (stones, n) => {
  if (!n) return stones.length;

  const newStones = stones
    .map((stone) => {
      if (stone === "0") {
        return "1";
      }
      if (stone.length % 2 === 0) {
        const left = stone.slice(0, Math.floor(stone.length / 2));
        const right = stone.slice(Math.floor(stone.length / 2), stone.length);

        return [left, right].map((stone) => {
          if (/^0+$/.test(stone)) return "0";
          if (stone.startsWith("0")) return stone.slice(1);

          return stone;
        });
      }
      if (stone.length % 2 === 1) {
        return String(Number(stone) * 2024);
      }
    })
    .flat();

  return getStoneArrangement(newStones, n - 1);
};

const res = await solve("day-11-input-test.txt");

console.log(res);
