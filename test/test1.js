import { createDirecotry, createFiles, removeFiles } from "../problem1.js";
let filesCount = 100;
createDirecotry("dir1", filesCount, (dirName, fileCount) => {
  createFiles(dirName, fileCount, (fileNames) => {
    removeFiles(fileNames);
  });
});
