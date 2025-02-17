import { createDirecotry, createFiles, removeFile } from "../problem1.js";
let data={name: "gopal", email:"abc@xyz.com"}
let dirName = "./dir1";
createDirecotry(dirName);
createFiles(dirName + "//file.json", JSON.stringify(data));
removeFile(dirName + "//file.json");
