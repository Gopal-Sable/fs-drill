import fs, { write } from "fs";

// 1. function for reading file content.
function readFile(fileName) {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
  return promise;
}

// Function for writting in file
function writeInFile(fileName, data) {
  const promise = new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, (err) => {
      if (err) {
        reject(err);
      }
      resolve(fileName);
    });
  })
    .then((res) => {
      return appendFilename(res);
    })
    .catch((err) => err.message);
  return promise;
}

// 3. appending file names to file
function appendFilename(fileName) {
  const promise = new Promise((resolve, reject) => {
    fs.appendFile("filenames.txt", fileName + "\n", (err) => {
      if (err) {
        reject(err);
      }
      resolve(fileName);
    });
  });
  return promise;
}

readFile("lipsum.txt")
  .then((res) => res)
  .then((res) => {
    let upperCaseData = res.toUpperCase();
    return writeInFile("uppercase.txt", upperCaseData);
  })
  .catch((err) => err.message);
