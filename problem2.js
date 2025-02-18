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

function readFile(callback) {
  fs.readFile("lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading lipsum.txt: " + err.message);
    } else {
      callback(data);
    }
  });
}

function processUpperCase(data, callback) {
  let upperCaseData = data.toUpperCase();
  const upperCaseFileName = getRandomFilename();
  fs.writeFile(upperCaseFileName, upperCaseData, (err) => {
    if (err) {
      console.error("Error in writting uppercase  file " + err.message);
      return;
    }
    console.log(upperCaseFileName + " created");

    appendFilename(upperCaseFileName, () => {
      callback(upperCaseFileName);
    });
  });
}

function processLowerCase(inputFileName, callback) {
  fs.readFile(inputFileName, "utf8", (err, data) => {
    if (err) {
      console.error(
        "error in reading input file for lowercase : " + err.message
      );
    } else {
      let lowerCaseData = data.toLowerCase().split(".").join("\n");
      let lowerCaseFileName = getRandomFilename();
      fs.writeFile(lowerCaseFileName, lowerCaseData, (err) => {
        if (err) {
          console.error("Error in writting lower case file: " + err.message);
        } else {
          console.log(lowerCaseFileName + " created");
          appendFilename(lowerCaseFileName, () => {
            callback(lowerCaseFileName);
          });
        }
      });
    }
  });
}

function processSort(inputFile1, inputFile2, callback) {
  fs.readFile(inputFile1, "utf8", (err, data) => {
    if (err) {
      return console.error("Error reading upper case file:", err.message);
    }

    const sortedFile = getRandomFilename();
    fs.appendFile(sortedFile, data, (err) => {
      if (err) {
        return console.error("Error writing sorted file:", err.message);
      }
      fs.readFile(inputFile2, "utf8", (err, data) => {
        if (err) {
          console.error("Error in reading second File: ", err.message);
        }
        fs.appendFile(sortedFile, data, (err) => {
          if (err) {
            return console.error(
              "Error in updating sorted file: " + err.message
            );
          }
          fs.readFile(sortedFile, "utf-8", (err, data) => {
            if (err) {
              return console.error(
                "error in reading sorted file: ",
                err.message
              );
            }
            const sortedData = data
              .split(" ")
              .sort((a, b) => a.localeCompare(b))
              .join(" ");

            fs.writeFile(sortedFile, sortedData, (err) => {
              if (err) {
                return console.error("Error writing sorted file:", err.message);
              }
              console.log(`Sorted file created: ${sortedFile}`);
              appendFilename(sortedFile, () => {
                callback(sortedFile);
              });
            });
          });
        });
      });
    });
  });
}

function deleteFiles() {
  fs.readFile(filenamesFile, "utf8", (err, data) => {
    if (err) {
      console.error("Problem in reading filenames file: ", err.message);
    } else {
      const filenames = data.trim().split("\n");
      filenames.map((file) => {
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
          console.log(`${filenamesFile} deleted`);
        }
      });
    }
  });
}

export {
  readFile,
  processUpperCase,
  processLowerCase,
  processSort,
  deleteFiles,
};
