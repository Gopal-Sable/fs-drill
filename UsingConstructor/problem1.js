import fs from "fs";

const readFile = (fileName) => {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf-8", (err, data) => {
      if (err) {
        reject(err.message);
      }
      resolve(data);
    });
  });
  return promise;
};

readFile("lipsum.txt")
  .then((res) => console.log(res))
  .catch((err) => err.message);
