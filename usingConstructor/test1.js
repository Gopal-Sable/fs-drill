import { createDirectory, createFiles, deleteFiles } from "./problem1.js";

createDirectory("jsonDir")
  .then((res) => res)
  .then((res) => createFiles(res, 15))
  .then((res) =>
    setTimeout(() => {
      deleteFiles(res);
    }, 3000)
  )
  .catch((err) => console.error(err.message));
