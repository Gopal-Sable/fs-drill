// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

import fs from "fs";

function createDirecotry(dirName, filesCount, callback) {
  fs.mkdir(dirName, { recursive: true }, (err) => {
    if (err) {
      console.log("Error While creating Directory:", err.message);
    } else {
      console.log("Directorry created successfully");
      callback(dirName, filesCount);
    }
  });
}

function createFiles(dirName, fileCount, callback) {
  if (fileCount < 1) {
    return;
  }
  for (let i = 1; i <= fileCount; i++) {
    let fileName = dirName + "/file" + i + ".json";
    let data = { fileName, number: i };
    fs.writeFile(fileName, JSON.stringify(data), (e) => {
      if (e) {
        console.log(e.message);
      } else {
        console.log(`${fileName} created successfully`);
        callback(fileName);
      }
    });
  }
}

function removeFiles(file) {
  fs.rm(file, (err) => {
    if (err) {
      console.log(err.message);
    } else {
      console.log(`${file} deleted successfully`);
    }
  });
}

export { createFiles, removeFiles, createDirecotry };
