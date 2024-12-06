import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");

  const [rules_raw, pages_raw] = data
    .split("\n\n")
    .map((section) => section.split("\n"));
  const rules = rules_raw.map((rules) => rules.split("|"));
  const manualPages = pages_raw.map((pages) => pages.split(","));

  const validManuals = [];
  const invalidManuals = [];

  manualPages.forEach((pages) => {
    if (checkPages(rules, pages)) {
      validManuals.push(pages);
    } else {
      invalidManuals.push(reorderPages(rules, pages));
    }
  });
  return {
    validSum: sumMiddleVal(validManuals),
    inValidSum: sumMiddleVal(invalidManuals),
  };
};

const checkPages = (rules, pages) => {
  if (pages.length === 1) return 1;
  for (let i = 0; i < rules.length; i++) {
    const rule = rules[i];
    if (rule[1] === pages[0] && rule[0] === pages[1]) return 0;
  }
  return checkPages(rules, pages.slice(1));
};

const reorderPages = (rules, pages) => {
  return pages.sort((a, b) => {
    for (let i = 0; i < rules.length; i++) {
      const rule = rules[i];
      if (rule[1] === a && rule[0] === b) return -1;
    }
    return 1;
  });
};

const sumMiddleVal = (manuals) => {
  return manuals.reduce((acc, manual) => {
    const midPoint = Math.floor(manual.length / 2);
    return acc + Number(manual[midPoint]);
  }, 0);
};
