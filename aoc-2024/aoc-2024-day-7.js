import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");
  const brokenEquations = data.split("\n").map((row) => {
    const splitRow = row.split(/:? /);
    const splitRowNums = splitRow.map((ele) => Number(ele));
    return [splitRowNums[0], splitRowNums.slice(1)];
  });

  return sumValidEquations(brokenEquations);
};

const sumValidEquations = (equations) => {
  return equations.reduce((grandTotal, equation) => {
    const [total, constants] = equation;
    if (
      checkMultiplyAll(equation) |
      checkSumAll(equation) |
      checkConcatenated(equation)
    ) {
      return grandTotal + total;
    }

    if (constants.length <= 2) return grandTotal;

    if (checkAllCombinations(equation)) return grandTotal + total;
    else return grandTotal;
  }, 0);
};
const checkMultiplyAll = (equation) => {
  const [total, constants] = equation;
  return constants.reduce((acc, val) => acc * val, 1) === total;
};
const checkSumAll = (equation) => {
  const [total, constants] = equation;
  return constants.reduce((acc, val) => acc + val, 0) === total;
};
const checkConcatenated = (equation) => {
  const [total, constants] = equation;
  return constants.reduce((acc, val) => Number(`${acc}${val}`), 0) === total;
};
const checkAllCombinations = (equation) => {
  const [total, constants] = equation;

  const operatorCombinations = [];
  const operators = ["*", "+", "||"];

  const generateCombinations = (current, remainingLength) => {
    if (remainingLength === 0) {
      if (
        !current.every((ele) => ele === "*") &&
        !current.every((ele) => ele === "+") &&
        !current.every((ele) => ele === "||")
      )
        operatorCombinations.push(current);
      return;
    }
    for (const operator of operators) {
      generateCombinations([...current, operator], remainingLength - 1);
    }
  };

  generateCombinations([], constants.length - 1);

  for (const combination of operatorCombinations) {
    const equationTotal = [...constants].reduce(
      (total, currVal, currIndex, array) => {
        if (currIndex === 0) return currVal;
        if (combination[currIndex - 1] === "+") return total + currVal;
        if (combination[currIndex - 1] === "*") return total * currVal;
        if (combination[currIndex - 1] === "||") {
          return Number(`${total}${currVal}`);
        }
      },
      0
    );
    if (equationTotal === total) return true;
  }

  return false;
};

// const resTest = await solve("day-7-input-test.txt");
const res = await solve("day-7-input.txt");

console.log(res);
