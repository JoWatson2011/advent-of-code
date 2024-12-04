import { promises } from "fs";
const { readFile } = promises;

const checkReports = async (path) => {
  const data = await readFile(path, "utf-8");

  const reports = data.split("\n").map((report) => report.split(" "));

  return reports.reduce((safeReportCounter, report) => {
    return checkLevels(report) ? safeReportCounter + 1 : safeReportCounter;
  }, 0);
};

const checkLevels = (report) => {
  let slope = 0;

  const areSafe = report.map((level, index) => {
    if (index === 0) return true;

    const difference = report[index - 1] - level;

    if (Math.abs(difference) > 3 || Math.abs(difference) < 1) return false;

    if (index === 1) {
      slope = difference > 0 ? 1 : -1;
      return true;
    }

    const currSlope = difference > 0 ? 1 : -1;
    if (currSlope != slope) return false;

    return true;
  });

  return areSafe.every((level) => level);
};
