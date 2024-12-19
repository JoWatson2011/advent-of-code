import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");

  const corruptedInstructions = data;
  const numbersPaired = cleanUpInstruction(corruptedInstructions);
  const numsMultiplied = numbersPaired.map(
    (numberPairs) => numberPairs[0] * numberPairs[1]
  );
  return numsMultiplied.reduce((sum, num) => sum + num, 0);
};

const cleanUpInstruction = (corruptedInstruction) => {
  const mulFunctionPattern = /^\d+,\d+\)/;

  const splitInstruction = corruptedInstruction.split(/don't\(\)/);
  const enabledInstructions = [];

  for (let i = 0; i < splitInstruction.length; i++) {
    if (i === 0) enabledInstructions.push(splitInstruction[0]);
    else if (/do\(\)/.test(splitInstruction[i])) {
      const splitEnabled = splitInstruction[i].slice(
        splitInstruction[i].indexOf("do()")
      );
      enabledInstructions.push(splitEnabled);
    }
  }

  return enabledInstructions
    .join("")
    .split("mul(")
    .filter((split) => {
      return mulFunctionPattern.test(split);
    })
    .map((mulFunction) => {
      const splitMulFunction = mulFunction.split(/(,|(\).*))/);
      return splitMulFunction.filter((split) => {
        const int = parseInt(split);
        return !isNaN(int);
      });
    });
};
