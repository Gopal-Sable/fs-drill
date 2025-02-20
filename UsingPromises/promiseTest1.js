createDirecotry("dir1")
  .then((res) => {
    createFiles(res, 10);
    return res;
  })
  .then((res) => {
    console.log(res);
    return removeFiles(res);
  })
  .catch((err) => {
    console.log("sadkasjd", err);
  });