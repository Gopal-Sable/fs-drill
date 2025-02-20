/*
    Problem 2:
    
    Using callbacks and the fs module's asynchronous functions, do the following:
        1. Read the given file lipsum.txt
        2. Convert the content to uppercase & write to a new file. Store the name of the new file in filenames.txt
        3. Read the new file and convert it to lower case. Then split the contents into sentences. Then write it to a new file. Store the name of the new file in filenames.txt
        4. Read the new files, sort the content, write it out to a new file. Store the name of the new file in filenames.txt
        5. Read the contents of filenames.txt and delete all the new files that are mentioned in that list simultaneously.
*/

const { default: fs } = await import("fs/promises");

const filenamesFile = "filenames.txt";

function generateRandomName() {
  let count = 0;
  return () => {
    count++;
    return "file" + count + ".txt";
  };
}
const getRandomFilename = generateRandomName();

function readFile(filename) {
  return fs
    .readFile(filename, "utf8")
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function writeInUppercase(data) {
  const upperCaseFileName = getRandomFilename();
  const upperCaseData = data.toUpperCase();
  return fs
    .writeFile(upperCaseFileName, upperCaseData)
    .then(() => {
      console.log(`${upperCaseFileName} created`);
      uppendFilenames(upperCaseFileName);
      return upperCaseData;
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function uppendFilenames(fileNameToUppend) {
  return fs
    .appendFile(filenamesFile, fileNameToUppend + "\n")
    .then(() => {
      return console.log(`${fileNameToUppend} added in filenames`);
    })
    .catch((err) => {
      console.error("error in appending file name: ", err.message);
    });
}

function writeInLowercase(data) {
  const lowerCaseFileName = getRandomFilename();
  const lowerCaseData = data
    .toLowerCase()
    .split(".")
    .map((line) => {
      return line.trim();
    })
    .join("\n");
  return fs
    .writeFile(lowerCaseFileName, lowerCaseData)
    .then(() => {
      console.log(`${lowerCaseFileName} created`);
      return lowerCaseFileName;
    })
    .then((res) => {
      return uppendFilenames(res);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function handdleSort() {
  const sortFileName = getRandomFilename();

  return readFile("lipsum.txt")
    .then((res) => {
      let sortedContent = res
        .split(/\s/)
        .sort((a, b) => a.localeCompare(b))
        .join("\n");
      return fs.writeFile(sortFileName, sortedContent);
    })
    .then(() => {
      console.log(`${sortFileName} created`);
      return sortFileName;
    })
    .then((res) => {
      return uppendFilenames(res);
    })
    .catch((err) => {
      console.error(err.message);
    });
}

function removeFiles() {
  readFile(filenamesFile).then((res) => {
    const filenames = res.trim().split("\n");
    const allPromises = [];

    filenames.forEach((file) => {
      allPromises.push(
        fs
          .unlink(file)
          .then(() => {
            console.log(`${file} removed`);
          })
          .catch((err) => {
            console.error("Error: ", err.message);
          })
      );
    });

    return Promise.all(allPromises)
      .then(() => {
        fs.writeFile(filenamesFile, "")
          .then(() => {
            console.log("file names removed from file");
          })
          .catch((err) => {
            console.error(err.message);
          });
      })
      .catch((err) => console.error(err.message));
  });
}

export {
  readFile,
  writeInUppercase,
  writeInLowercase,
  removeFiles,
  handdleSort,
};
