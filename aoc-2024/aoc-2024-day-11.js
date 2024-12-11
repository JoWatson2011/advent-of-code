/*
As you observe them for a while, you find that the stones have a consistent behavior. Every time you blink, the stones each simultaneously change according to the first applicable rule in this list:

If the stone is engraved with the number 0, it is replaced by a stone engraved with the number 1.
If the stone is engraved with a number that has an even number of digits, it is replaced by two stones. The left half of the digits are engraved on the new left stone, and the right half of the digits are engraved on the new right stone. (The new numbers don't keep extra leading zeroes: 1000 would become stones 10 and 0.)
If none of the other rules apply, the stone is replaced by a new stone; the old stone's number multiplied by 2024 is engraved on the new stone.
No matter how the stones change, their order is preserved, and they stay on their perfectly straight line.

e.g.
Initial arrangement:
125 17

After 1 blink:
253000 1 7

After 2 blinks:
253 0 2024 14168

After 3 blinks:
512072 1 20 24 28676032

After 4 blinks:
512 72 2024 2 0 2 4 2867 6032

After 5 blinks:
1036288 7 2 20 24 4048 1 4048 8096 28 67 60 32

After 6 blinks:
2097446912 14168 4048 2 0 2 4 40 48 2024 40 48 80 96 2 8 6 7 6 0 3 2

In this example, after blinking six times, you would have 22 stones. After blinking 25 times, you would have 55312 stones!

Consider the arrangement of stones in front of you. How many stones will you have after blinking 25 times?
*/

import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");
  const stones = data.split(" ");

  const part1 = getStoneArrangement(stones, 6);
  return part1;
};

const getStoneArrangement = (stones, numberOfBlinks) => {
  let blinks = 1;

  const stoneArrangments = [[...stones]];

  while (blinks <= numberOfBlinks) {
    const newStones = [];
    stoneArrangments[blinks - 1].forEach((stone) => {
      console.log(stone);
      if (stone === 0) {
        newStones.push(1);
      }
      if (stone % 2 === 0) {
        const str = String(stone);
        const left = str.slice(0, Math.floor(str.length / 2));
        const right = str.slice(Math.floor(str.length / 2), str.length - 1);
        console.log(left, right);
        newStones.push(Number(left), Number(right));
      }
      if (stone % 2 === 1) {
        newStones.push(stone * 2024);
      }
    });
    stoneArrangments[blinks] = [...newStones];
    blinks++;
  }


  return stoneArrangments[numberOfBlinks - 1];
};

const res = await solve("day-11-input-test.txt");
console.log(res);
