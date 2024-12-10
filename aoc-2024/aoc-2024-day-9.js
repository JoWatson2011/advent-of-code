import { promises } from "fs";
const { readFile } = promises;

const solve = async (path) => {
  const data = await readFile(path, "utf-8");
  const diskMap = data.split("").map((str) => Number(str));

  const fileBlocks = getFileBlocks(diskMap);
  const sortedFileBlocks = fillFreeBlockSpace(fileBlocks);
  const sortedFragmentedFileBlocks = fillWholeBlockSpace(fileBlocks);
  const part1 = sortedFileBlocks.reduce(
    (total, file, index) => total + file * index,
    0
  );

  console.log(sortedFragmentedFileBlocks);
  const part2 = sortedFragmentedFileBlocks.reduce(
    (total, file, index) => total + file * index,
    0
  );

  return { part1, part2 };
};

const getFileBlocks = (diskMap) => {
  return diskMap
    .map((num, index) => {
      return index % 2 != 0 ? Array(num).fill(".") : Array(num).fill(index / 2);
    })
    .flat();
};

const fillFreeBlockSpace = (fileBlocks) => {
  const sortedFileBlock = [];
  const files = fileBlocks.filter((ele) => ele != ".");
  let freeSpaceRemaining = files.length;
  for (let i = 0; i < fileBlocks.length; i++) {
    if (fileBlocks[i] === ".") {
      sortedFileBlock.push(files[files.length - 1]);
      files.pop();
    } else {
      sortedFileBlock.push(fileBlocks[i]);
    }
    freeSpaceRemaining--;
    if (!freeSpaceRemaining) {
      return sortedFileBlock;
    }
  }
};

const fillWholeBlockSpace = (fileBlocks) => {
  const fileBlocksJoined = fileBlocks.join("").match(/(\.+)|(\d)\2*/g);
  const files = fileBlocksJoined.filter((ele) => !/\./.test(ele));

  const sortedBlock = [];

  fileBlocksJoined.forEach((fileBlock) => {
    if (fileBlock[0] === ".") {
     for(let file of files.reverse()) {
        if (file.length <= fileBlock.length) {
          const newBlock = [
            Array(file.length).fill(file[0]),
            Array(fileBlock.length - file.length).fill("."),
          ];
          sortedBlock.push(newBlock);
          return;
        }
      };
    } else {
      sortedBlock.push(fileBlock);
    }
  });

  return sortedBlock;

  // for (let i = 0; i < fileBlocks.length; i++) {
  //   if (fileBlocks[i] === ".") {
  //     currentBlock.push(i);
  //   } else if (fileBlocks[i] != "." && currentBlock.length) {
  //     for (let x = Math.max(...files); x >= 0; x--) {
  //       if (fileCount[x] <= currentBlock.length) {
  //         sortedBlock.push(...Array(fileCount[x]).fill(x));
  //         delete fileCount[x];
  //         currentBlock.length = 0;
  //         break;
  //       }
  //     }
  //   } else {
  //     sortedBlock.push(fileBlocks[i]);
  //   }
  // }
  // return sortedBlock;
};

console.log(await solve("day-9-input-test.txt"));
