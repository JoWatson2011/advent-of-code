import { promises } from "fs";
const { readFile } = promises;

const checkReports = async (path) => {
  const data = await readFile(path, "utf-8");

  const reports = data.split("\n").map((report) => report.split(" "));

  const part1Count = reports.reduce((safeReportCounter, report) => {
    return checkLevels(report) ? safeReportCounter + 1 : safeReportCounter;
  }, 0);

  const part2Count = reports.reduce((safeReportCounter, report) => {
    const newReport = switchUnsafeLevels(report);
    return checkLevels(newReport) ? safeReportCounter + 1 : safeReportCounter;
  }, 0);

  return { part1: part1Count, part2: part2Count };
};

const checkLevels = (report) => {
  if (!allDecreasing(report) && !allIncreasing(report)) {
    return false;
  }

  const areSafe = report.map((level, index) => {
    if (index === 0) return true;

    const difference = report[index - 1] - level;

    if (Math.abs(difference) > 3 || Math.abs(difference) < 1) return false;

    return true;
  });

  return areSafe.every((level) => level);
};

const allIncreasing = (report) => {
  return report.slice(0, report.length - 1).every((level, index) => {
    return level < report[index + 1];
  });
};
const allDecreasing = (report) => {
  return report.slice(0, report.length - 1).every((level, index) => {
    return level > report[index + 1];
  });
};

const switchUnsafeLevels = (report) => {
  const newReport = [];

  return newReport.length ? newReport : report;
};

console.log(await checkReports("day-2-input-test.txt"));
