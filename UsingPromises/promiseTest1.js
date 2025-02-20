import { createDirecotry, createFiles, removeFiles } from "./promise1.js";

createDirecotry("dir1")
  .then((res) => {
    createFiles(res, 10);
    return res;
  })
  .then((res) => {
    console.log(res);
    return removeFiles(res);
  })
  .catch((err) => {
    console.log("Error :", err.message);
  });
