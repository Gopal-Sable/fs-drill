import {
  deleteFiles,
  processLowerCase,
  processSort,
  processUpperCase,
  readFile,
} from "../problem2.js";

readFile("lipsum.txt", (data) => {
  processUpperCase(data, (upperCaseFileName) => {
    processLowerCase(upperCaseFileName, (lowerCaseFileName) => {
      processSort(upperCaseFileName, lowerCaseFileName, () => {
        setTimeout(deleteFiles, 3000);
      });
    });
  });
});
