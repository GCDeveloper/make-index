#!/usr/bin/env node
const path = require("path");
const fs = require("fs");
const cwd = process.cwd();
const jsonArgs = require("@toolia/json-args").default;
const processDir = require("@toolia/process-dir").default;
const toCamelCase = require("../utils/toCamelCase.js");
//cwd is where the index.js will be generated
console.log("process.cwd()", process.cwd());

const args = jsonArgs(
  process.argv.slice(2),
  { directory: "" },
  { onlyDoubleDash: true }
);
const directory = path.join(cwd, args.directory);
// first check if index.js already exists

// if it does, output a console error
// else write the file

const filename = "index.js";

fs.open(filename, "wx", err => {
  if (err) {
    if (err.code === "EEXIST") {
      console.error(filename + " already exists");
      return;
    }
    throw err;
  }
  //now create the index.js data
  //read the folder contents (optionally recursively) and output exports based on filenames
  //   let data = `
  //   import ${moduleName} from
  // `;
  let data = [];
  processDir(directory, (filename, { level, stats, fullPath }) => {
    if (
      level === 1 &&
      stats.isFile() &&
      filename.endsWith(".js") &&
      filename !== "index.js"
    ) {
      const moduleName = toCamelCase(filename.slice(0, -3));
      data.push({ filename, fullPath, moduleName });
    }
  })
    .then(() => {
      console.log("json:\r\n", data);
      data = data
        .map(({ fullPath, moduleName }) => {
          return `
  import ${moduleName} from '${path.normalize(fullPath)}';
  export const ${moduleName} = ${moduleName};
`;
        })
        .join("\r\n");
      //TODO use write stream instead
      fs.writeFile(filename, data, err => {
        if (err) throw err;
        console.log(`Successfully written ${filename} to ${cwd}`);
      });
    })
    .catch(err => {
      throw err;
    });
});
