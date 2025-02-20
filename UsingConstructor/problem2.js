import fs from "fs";

function createDirectory(dirName) {
  const promise = new Promise((resolve, reject) => {
    fs.mkdir(dirName, { recursive: true }, (err) => {
      if (err) {
        return reject((err) => err);
      }
      console.log(`Directory ${dirName} created `);
      resolve(dirName);
    });
  });
  return promise;
}

function createFiles(dirName, numberOfFiles) {
  const promise = new Promise((resolve, reject) => {
    if (numberOfFiles < 1) {
      return reject("Number of files can not be less than 1");
    }
    for (let i = 1; i <= numberOfFiles; i++) {
      const data = { type: "json", count: i };
      const filename = `${dirName}/file${i}.json`;

      fs.writeFile(filename, JSON.stringify(data), (err) => {
        if (err) {
          reject((err) => err);
        } else {
          console.log(filename, "created");
          if (i === numberOfFiles) {
            resolve(dirName);
          }
        }
      });
    }
  });
  return promise;
}

function deleteFiles(dirName) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirName, (err, files) => {
      if (err) {
        return reject(err);
      }
      let count = 0;
      files.forEach((file) => {
        fs.unlink(dirName + "/" + file, (err) => {
          if (err) {
            return reject(err);
          }
          console.log(file, "deleted");

          if (++count == files.length) {
            resolve();
          }
        });
      });
    });
  });
}

export { createDirectory, createFiles, deleteFiles };
