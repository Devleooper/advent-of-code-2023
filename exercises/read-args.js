var fs = require("fs");

function getArgAsFile(argument) {
  let filePath = process.argv[argument];
  return fs.readFileSync(filePath, "utf-8").split(/\n/);
}

function getInput() {
  return getArgAsFile(2);
}

module.exports = { getArgAsFile, getInput };
