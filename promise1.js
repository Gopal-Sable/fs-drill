// Using callbacks and the fs module's asynchronous functions, do the following:
// 1. Create a directory of random JSON files
// 2. Delete those files simultaneously

const { default: fs } = await import("fs/promises");

function createDirecotry(dirName) {
  return fs
    .mkdir(dirName, { recursive: true })
    .then(() => {
      console.log(`${dirName} created`);
    })
    .catch((err) => {
      console.error(`Error creating directory ${dirName} :${err.message} `);
    });
}

function createFiles(dirName, fileCount) {
  if (fileCount < 1) {
    return;
  }
  let count = 0;
  const allFilesPromis = [];
  for (let i = 1; i <= fileCount; i++) {
    let fileName = dirName + "/file" + i + ".json";
    count++;
    let data = { fileName, number: i };
    allFilesPromis.push(
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
  return Promise.all(allFilesPromis);
}

function removeFiles(file) {
  return fs
    .rm(file)
    .then(() => {
      console.log(`${file} deleted successfully`);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

createDirecotry("dir1")
  .then((res) => {
    console.log(res);
    return createFiles("dir1", 10);
  })
  .then((res) => {
    console.log(res);
    return removeFiles("dir1/file1.json");
  })
  .catch((err) => {
    console.log("sadkasjd", err);
  });
//   .then(() => {
//     removeFiles();
//   });
// export { createFiles, removeFiles, createDirecotry };
