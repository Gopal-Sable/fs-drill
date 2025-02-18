import { createDirecotry, createFiles, removeFiles } from "../problem1.js";
createDirecotry("dir1", filesCount, (dirName, fileCount) => {
    createFiles(dirName, fileCount, (fileNames) => {
      removeFiles(fileNames);
    });
  });