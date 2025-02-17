// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

import fs from "fs";

function createDirecotry(dirName) {
  fs.mkdir(dirName, { recursive: true }, (err) => {
    if (err) {
      console.log("Error While creating Directory:", err.message);
    } else {
      console.log("Directorry created successfully");
    }
  });
}
function createFiles(fileName, data) {
  fs.writeFile(fileName, data, (e) => {
    if (e) {
      console.log(e.message);
    } else {
      console.log("File created successfully");
    }
  });
}
function removeFile(path) {
  fs.rm(path, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log("File deleted successfully");
    }
  });
}

export { createFiles, removeFile, createDirecotry };
