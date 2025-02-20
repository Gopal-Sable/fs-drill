// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

const { default: fs } = await import("fs/promises");

function createDirecotry(dirName) {
  return fs
    .mkdir(dirName, { recursive: true })
    .then(() => {
      console.log(`${dirName} created`);
      return dirName;
    })
    .catch((err) => {
      console.error(`Error creating directory ${dirName} :${err.message} `);
    });
}

function createFiles(dirName, fileCount) {
  if (fileCount < 1) {
    return;
  }
  const allPromises = [];
  for (let i = 1; i <= fileCount; i++) {
    let fileName = dirName + "/file" + i + ".json";
    let data = { fileName, number: i };
    allPromises.push(
      fs
        .writeFile(fileName, JSON.stringify(data))
        .then(() => {
          console.log(`${fileName}`);
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
  return Promise.allSettled(allPromises);
}

function removeFiles(dirName) {
  return fs
    .readdir(dirName)
    .then((files) => {
      files.forEach((file) => {
        let filePath = dirName + "/" + file;
        fs.unlink(filePath)
          .then(() => {
            console.log(`${file} deleted successfully`);
          })
          .catch((err) => {
            console.error(err.message);
          });
      });
    })
    .catch((err) => {
      console.log(err.message);
    });
}

export { createFiles, removeFiles, createDirecotry };
