import fs from "fs";

// Function to create a directory
function createDirectory(dirName) {
  return new Promise((resolve, reject) => {
    fs.mkdir(dirName, { recursive: true }, (err) => {
      if (err) {
        return reject(err); // Fix: Remove unnecessary function wrapping
      }
      console.log(`Directory ${dirName} created`);
      resolve(dirName);
    });
  });
}

// Function to create multiple files inside a directory
function createFiles(dirName, numberOfFiles) {
  return new Promise((resolve, reject) => {
    let promises = [];

    for (let i = 1; i <= numberOfFiles; i++) {
      const data = { type: "json", count: i };
      const filename = `${dirName}/file${i}.json`;

      let filePromise = new Promise((res, rej) => {
        fs.writeFile(filename, JSON.stringify(data), (err) => {
          if (err) return rej(err);
          console.log(`${filename} created`);
          res();
        });
      });

      promises.push(filePromise);
    }

    // Wait for all files to be created
    Promise.all(promises)
      .then(() => resolve(dirName))
      .catch(reject);
  });
}

// Function to delete all files inside a directory
function deleteFiles(dirName) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirName, (err, files) => {
      if (err) return reject(err);

      if (files.length === 0) {
        console.log(`No files to delete in ${dirName}`);
        return resolve();
      }

      let deletePromises = files.map((file) => {
        return new Promise((res, rej) => {
          fs.unlink(`${dirName}/${file}`, (err) => {
            if (err) return rej(err);
            console.log(`${file} deleted`);
            res();
          });
        });
      });

      Promise.all(deletePromises)
        .then(resolve)
        .catch(reject);
    });
  });
}

export { createDirectory, createFiles, deleteFiles };
