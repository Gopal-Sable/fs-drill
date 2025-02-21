import {
  readFile,
  writeInUppercase,
  writeInLowercase,
  handleSort,
  removeFiles,
} from "./problem2.js";

readFile("lipsum.txt")
  .then((data) => writeInUppercase(data))
  .then((upperData) => writeInLowercase(upperData))
  .then(() => handleSort())
  .then(() => removeFiles())
  .catch((err) => console.error("Error:", err));
