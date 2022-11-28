// compile code will go here
// req some module
const solc = require("solc");

// The path module provides utilities for working with file and directory paths.
const path = require("path");

// The fs module enables interacting with the file system in a way modeled on standard POSIX functions.
const fs = require("fs");

const fse = require("fs-extra");

const buildPath = path.resolve(__dirname, "build");

fse.removeSync(buildPath);

const Campaign_path = path.resolve(__dirname, "contracts", "Campaign.sol");

const content = fs.readFileSync(Campaign_path, "utf8");

var input = {
  language: "Solidity",
  sources: {
    "Campaign.sol": {
      content: content,
    },
  },
  settings: {
    outputSelection: {
      "Campaign.sol": {
        "*": ["*"],
      },
    },
  },
};

var output = JSON.parse(solc.compile(JSON.stringify(input)));

fse.ensureDirSync(buildPath);

for (let contractName in output.contracts["Campaign.sol"]) {
  fse.outputJSONSync(
    path.resolve(buildPath, `${contractName}.json`),
    output.contracts["Campaign.sol"][contractName]
  );
}

// var output = JSON.parse(solc.compile(JSON.stringify(input))).contracts[
//   "Campaign.sol"
// ].Campaign;

console.log(output);

//module.exports = output;
