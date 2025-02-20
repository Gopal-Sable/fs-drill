import { createDirecotry, createFiles, removeFiles } from "./promise1.js";

createDirecotry("dir1")
  .then((res) => {
    return createFiles(res, 10);
  })
  .then(() => {
    return removeFiles("dir1");
  })
  .catch((err) => {
    console.log("Error :", err.message);
  });
