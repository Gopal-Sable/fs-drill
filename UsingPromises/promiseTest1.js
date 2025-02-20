import { createDirecotry, createFiles, removeFiles } from "./promise1.js";

createDirecotry("dir1")
  .then((res) => createFiles(res, 10))
  .then(() => removeFiles("dir1"))
  .catch((err) => console.log("Error :", err.message));
