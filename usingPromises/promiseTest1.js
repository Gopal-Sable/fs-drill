import { createDirectory, createFiles, removeFiles } from "./promise1.js";

createDirectory("dir1")
  .then((res) => createFiles(res, 10))
  .then(() => removeFiles("dir1"))
  .catch((err) => console.log("Error :", err.message));
