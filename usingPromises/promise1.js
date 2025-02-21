// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

const { default: fs } = await import("fs/promises");

function createDirectory(dirName) {
  return fs
    .mkdir(dirName, { recursive: true })
    .then(() => {
      console.log(`${dirName} created`);
      return dirName;
    })
    .catch((err) => {
      console.error(`Error creating directory ${dirName}: ${err.message}`);
    });
}

function createFiles(dirName, fileCount) {
  const allPromises = [];
  for (let i = 1; i <= fileCount; i++) {
    let fileName = `${dirName}/file${i}.json`;
    let data = { fileName, number: i };
    
    allPromises.push(
      fs.writeFile(fileName, JSON.stringify(data)).then(() => {
        console.log(`${fileName} created`);
      })
    );
  }
  
  return Promise.all(allPromises).catch((err) => {
    console.error(`Error writing files: ${err.message}`);
  });
}

function removeFiles(dirName) {
  return fs.readdir(dirName).then((files) => {
    const deletePromises = files.map((file) => {
      let filePath = `${dirName}/${file}`;
      return fs.unlink(filePath).then(() => {
        console.log(`${file} deleted successfully`);
      });
    });

    return Promise.allSettled(deletePromises);
  })
  .catch((err) => {
    console.error(`Error reading directory: ${err.message}`);
  });
}

export { createFiles, removeFiles, createDirectory };
