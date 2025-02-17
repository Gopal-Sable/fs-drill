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

function processUpperCase(callback) {
  fs.readFile("lipsum.txt", "utf8", (err, data) => {
    if (err) {
      console.error("Error reading lipsum.txt: " + err.message);
    } else {
      let upperCaseData = data.toUpperCase();
      const upperCaseFileName = getRandomFilename();
      fs.writeFile(upperCaseFileName, upperCaseData, (err) => {
        if (err) {
          console.error("Error in writting uppercase  file " + err.message);
          return;
        }
        console.log(upperCaseFileName+" created");
        
        appendFilename(upperCaseFileName, () => {
          callback(upperCaseFileName);
        });
      });
    }
  });
}

function processLowerCase(inputFileName, callback) {
  fs.readFile(inputFileName, "utf8", (err, data) => {
    if (err) {
      console.error(
        "error in reading input file for lowercase : " + err.message
      );
    } else {
      let lowerCaseData = data.toLocaleLowerCase();
      let lowerCaseFileName = getRandomFilename();
      fs.writeFile(lowerCaseFileName, lowerCaseData, (err) => {
        if (err) {
          console.error("Error in writting lower case file: " + err.message);
        } else {
          appendFilename(lowerCaseFileName, () => {
            callback(lowerCaseFileName);
          });
        }
      });
    }
  });
}

processUpperCase((upperCaseFileName) => {
  processLowerCase(upperCaseFileName, (lowerCaseFileName) => {
    console.log("lowerCase file created", lowerCaseFileName);
  });
});
// processUpperCase(()=>{
//     lowercase(()=>{
//         sortedfile(()=>{
//             deleteFiles()
//         })
//     })
// })
