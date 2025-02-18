// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

import fs from "fs";
let filesCount = 5;
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
  if (fileCount<1) {
    return 
  }
  let count = 0;
  let fileNames = [];
  for (let i = 1; i <= fileCount; i++) {
    let fileName = dirName + "/file" + i + ".json";
    fileNames.push(fileName);
    count++;
    let data = { fileName, number: i };
    fs.writeFile(fileName, JSON.stringify(data), (e) => {
      if (e) {
        console.log(e.message);
      } else {
        console.log(`${fileName} created successfully`);
      }
    });
  }
  if (count == fileCount) {
    callback(fileNames);
  }
}
function removeFiles(path) {
  path.map((file) => {
    fs.rm(file, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("File deleted successfully");
      }
    });
  });
}

export { createFiles, removeFiles, createDirecotry };
