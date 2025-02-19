/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

import fs from "fs";

const filenamesFile = "filenames.txt";

function appendFilename(filename, callback) {
  fs.appendFile(filenamesFile, filename + "\n", (err) => {
    if (err) {
      return console.error("Error appending filename:", err.message);
    }
    callback();
  });
}

function generateRandomName() {
  let count = 0;
  return () => {
    count++;
    return "file" + count + ".txt";
  };
}
const getRandomFilename = generateRandomName();

function readFile(filename, callback) {
  fs.readFile(filename, "utf8", (err, data) => {
    if (err) {
      console.error(`Error reading ${filename}: ${err.message}`);
    } else {
      callback(data);
    }
  });
}

function handdleWriteFile(filename, data, callback) {
  fs.writeFile(filename, data, (err) => {
    if (err) {
      return console.error(`Error in writing ${filename}: ${err.message}`);
    }
    console.log(filename + " created");
    callback();
  });
}

function processUpperCase(data, callback) {
  let upperCaseData = data.toUpperCase();
  const upperCaseFileName = getRandomFilename();
  handdleWriteFile(upperCaseFileName, upperCaseData, () => {
    appendFilename(upperCaseFileName, () => {
      callback(upperCaseFileName);
    });
  });
}

function processLowerCase(inputFileName, callback) {
  readFile(inputFileName, (data) => {
    let lowerCaseData = data
      .toLowerCase()
      .split(".")
      .map((line) => line.trim())
      .join("\n");
    let lowerCaseFileName = getRandomFilename();
    handdleWriteFile(lowerCaseFileName, lowerCaseData, () => {
      appendFilename(lowerCaseFileName, () => {
        callback(lowerCaseFileName);
      });
    });
  });
}

function processSort(inputFile1, inputFile2, callback) {
  readFile(inputFile1, (data1) => {
    readFile(inputFile2, (data2) => {
      let filesContent = data1 + data2;
      const sortedData = filesContent
        .split(/\s/)
        .sort((a, b) => a.localeCompare(b))
        .join("\n");

      const sortedFile = getRandomFilename();
      handdleWriteFile(sortedFile, sortedData, () => {
        appendFilename(sortedFile, () => {
          callback();
        });
      });
    });
  });
}

function deleteFiles() {
  readFile(filenamesFile, (data) => {
    const filenames = data.trim().split("\n");
    filenames.forEach((file) => {
      fs.unlink(file, (err) => {
        if (err) {
          console.error(`error deleting ${file} : ${err.message}`);
        }
        console.log(`${file} deleted`);
      });
    });
    fs.writeFile(filenamesFile, "", (err) => {
      if (err) {
        console.error("Error deleting filenames from file: ", err.message);
      } else {
        console.log(`${filenamesFile} names cleared.`);
      }
    });
  });
}

export {
  readFile,
  processUpperCase,
  processLowerCase,
  processSort,
  deleteFiles,
};
