import {
  readFile,
  writeInUppercase,
  writeInLowercase,
  removeFiles,
  handdleSort,
} from "./promise2.js";

readFile("lipsum.txt")
  .then((res) => {
    return writeInUppercase(res);
  })
  .then((res) => {
    return writeInLowercase(res);
  })
  .then(() => {
    return handdleSort();
  })
  .then(() => {
    return removeFiles();
  })
  .catch((err) => {
    console.log("Error:", err);
  });
