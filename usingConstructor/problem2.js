import fs from "fs";

// Function to read a file
function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, "utf8", (err, data) => {
      if (err) {
        return reject(`Error reading ${filename}: ${err.message}`);
      }
      resolve(data);
    });
  });
}

// Function to write data into a file
function writeInFile(filename, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, data, (err) => {
      if (err) {
        return reject(`Error writing ${filename}: ${err.message}`);
      }
      resolve(data);
    });
  });
}

// Function to append filenames to filenames.txt
function appendFilename(filename) {
  return new Promise((resolve, reject) => {
    fs.appendFile("filenames.txt", filename + "\n", (err) => {
      if (err) {
        return reject(`Error appending ${filename}: ${err.message}`);
      }
      resolve();
    });
  });
}

// Function to generate a random filename
function generateRandomName() {
  let count = 0;
  return () => `file${++count}.txt`;
}
const getRandomFilename = generateRandomName();

// Function to write uppercase content
function writeInUppercase(data) {
  return new Promise((resolve, reject) => {
    const upperCaseFileName = getRandomFilename();
    const upperCaseData = data.toUpperCase();

    writeInFile(upperCaseFileName, upperCaseData)
      .then(() => {
        console.log(`${upperCaseFileName} created`);
        appendFilename(upperCaseFileName);
      })
      .then(() => resolve(upperCaseData))
      .catch(reject);
  });
}

// Function to write lowercase content, splitting sentences
function writeInLowercase(data) {
  return new Promise((resolve, reject) => {
    const lowerCaseFileName = getRandomFilename();
    const lowerCaseData = data
      .toLowerCase()
      .split(".")
      .map((line) => line.trim())
      .join(".\n");

    writeInFile(lowerCaseFileName, lowerCaseData)
      .then(() => {
        console.log(`${lowerCaseFileName} created`);
        appendFilename(lowerCaseFileName);
      })

      .then(() => resolve(lowerCaseData))
      .catch(reject);
  });
}

// Function to handle sorting of sentences
function handleSort() {
  return new Promise((resolve, reject) => {
    readFile("lipsum.txt")
      .then((data) => {
        if (!data) return reject("Empty file or read error");

        const sortedContent = data
          .split(" ")
          .map((line) => line.trim())
          .sort()
          .join(".\n");
        const sortFileName = getRandomFilename();
        writeInFile(sortFileName, sortedContent);
        return sortFileName;
      })
      .then((res) => {
        console.log(`${res} created`);
        appendFilename(res);
      })

      .then(() => resolve())
      .catch(reject);
  });
}

// Function to remove all files listed in filenames.txt
function removeFiles() {
  return new Promise((resolve, reject) => {
    readFile("filenames.txt")
      .then((res) => {
        if (!res.trim()) {
          console.log("No files to delete.");
          return resolve();
        }
        const filenames = res.trim().split("\n").filter(Boolean);

        Promise.all(
          filenames.map(
            (file) =>
              new Promise((res, rej) => {
                fs.unlink(file, (err) => {
                  if (err) return rej(`Error deleting ${file}: ${err.message}`);
                  console.log(`${file} removed`);
                  res();
                });
              })
          )
        )
          .then(() => {
            console.log("All filenames removed from file");
            return writeInFile("filenames.txt", "");
          })
          .then(() => {
            resolve();
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

export {
  removeFiles,
  handleSort,
  writeInLowercase,
  writeInUppercase,
  readFile,
};
