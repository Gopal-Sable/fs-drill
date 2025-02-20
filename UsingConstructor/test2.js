import { createDirectory, createFiles, deleteFiles } from "./problem2.js";

createDirectory("jsonDir")
  .then((res) => res)
  .then((res) => createFiles(res, 5))
  .then(deleteFiles)
  .catch((err) => console.error(err.message));
