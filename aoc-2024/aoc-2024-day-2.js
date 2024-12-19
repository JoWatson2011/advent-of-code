import { promises } from "fs";
const { readFile } = promises;

const checkReports = async (path) => {
  const data = await readFile(path, "utf-8");

  const reports = data
    .split("\n")
    .map((report) => report.split(" ").map((level) => Number(level)));

  const count = reports.reduce((safeReportCounter, report) => {
    return checkLevels(report) ? safeReportCounter + 1 : safeReportCounter;
  }, 0);

  return count;
};

const checkLevels = (report) => {
  const isValid = (first, second, allIncreasing, allDecreasing) => {
    const isIncreasing = first < second && allIncreasing;
    const isDecreasing = first > second && allDecreasing;
    const difference = first - second;

    return (
      Math.abs(difference) <= 3 &&
      Math.abs(difference) >= 1 &&
      (isDecreasing || isIncreasing)
    );
  };

  const areSafe = report.slice(0, report.length - 1).map((level, index) => {
    if (
      isValid(
        level,
        report[index + 1],
        report[0] < report[1],
        report[0] > report[1]
      )
    )
      return true;
    return false;
  });

  const areSomeSafe = report.some((_, index) => {
    const splicedReport = report.toSpliced(index, 1);
    return splicedReport
      .slice(0, splicedReport.length - 1)
      .map((level, i) =>
        isValid(
          level,
          splicedReport[i + 1],
          splicedReport[0] < splicedReport[1],
          splicedReport[0] > splicedReport[1]
        )
      )
      .every((ele) => ele);
  });
  console.log(areSomeSafe);
  return areSafe.every((level) => level) || areSomeSafe;
};
