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
readFileAndWriteInUpperCase("lipsum.txt");
let fileNames = "fileNames.txt";

function readFileAndWriteInUpperCase(fileName) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    console.log("file readed");

    let random = getRandomName();
    let upperCaseData = data.toUpperCase();
    writeFile(random, upperCaseData, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("upperCase file created");

        appendFile(fileNames, random, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("filename added");
            readFileAndWriteInlowerCase(random);
          }
        });
      }
    });
  });
}

function readFileAndWriteInlowerCase(fileName) {
  fs.readFile(fileName, "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
      return;
    }
    let random = getRandomName();
    let upperCaseData = data.toLowerCase().split(".").join("\n");
    writeFile(random, upperCaseData, (err) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log("lowercase file Returned");

        appendFile(fileNames, random, (err) => {
          if (err) {
            console.log(err.message);
          } else {
            console.log("Filename Added");

            // SORT FILE IS REMANING
            sortAndWrite(fileNames, (err, data) => {
              if (err) {
                console.log(err);
              } else {
                let files = data.split("\n");
                let sortedFileName = getRandomName();
                files.map((file) => {
                  fs.readFile(file, "utf8", (err, data) => {
                    if (err) {
                      console.log(err);
                    } else {
                      fs.appendFile(sortedFileName, data, (err) => {
                        if (err) {
                          console.log(err.message);
                        }
                      });
                    }
                  });
                });

                fs.readFile(sortedFileName, "utf8", (err, data) => {
                  if (err) {
                    console.log(err.message);
                  } else {
                    let sortedData = data.split(" ").sort((a, b) => a < b);
                    fs.writeFile(sortedFileName, sortedData, (err) => {
                      if (err) {
                        console.log(err.message);
                      } else {
                        appendFile(fileNames, sortedFileName, (err) => {
                          if (err) {
                            console.log(err.message);
                          } else {
                            deleteFiles(fileNames, (err, data) => {
                              if (err) {
                                console.log(err);
                              } else {
                                let files = data.split("\n");
                                files.map((file) => {
                                  // fs.rm(file, (err) => {
                                  //   if (err) {
                                  //     console.log(err);
                                  //   } else {
                                  //     console.log(files + " file deleted");
                                  //   }
                                  // });
                                });
                              }
                            });
                          }
                        });
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    });
  });
}

function sortAndWrite(fileName, cb) {
  fs.readFile(fileName, "utf8", cb);
}

function deleteFiles(fileName, cb) {
  fs.readFile(fileName, "utf8", cb);
}

function writeFile(fileName, data, cb) {
  fs.writeFile(fileName, data, cb);
}

function appendFile(fileName, data, cb) {
  data = data + "\n";
  fs.appendFile(fileName, data, cb);
}

function generateRandomName() {
  let name = "file";
  let count = 0;
  return () => {
    count++;
    return name + count + ".txt";
  };
}
const getRandomName = generateRandomName();
export {};
