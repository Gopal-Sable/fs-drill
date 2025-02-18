import {
  deleteFiles,
  processLowerCase,
  processSort,
  processUpperCase,
  readFile,
} from "../problem2.js";

readFile((data) => {
  processUpperCase(data, (upperCaseFileName) => {
    processLowerCase(upperCaseFileName, (lowerCaseFileName) => {
      processSort(upperCaseFileName, lowerCaseFileName, (sortedFile) => {
        setTimeout(deleteFiles, 3000);
      });
    });
  });
});
