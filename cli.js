#!/usr/bin/env node
import process from "node:process";
import chalk from "chalk";
import figlet from "figlet";
import meow from "meow";
import convertCSVtoLOG from "./index.js";

const error = chalk.bold.red;

const logError = (msg) => {
  console.log(
    figlet.textSync("FroxTrost", {
      font: "slant",
    })
  );
  console.error(error(msg));
  cli.showHelp();
  process.exit(1);
};

const cli = meow(
  `
        Usage: csv-to-log --input [input file] --output [output file]

        Options:
          --input   -i  Input .csv file       [string] [required]
          --output  -o  Output .log file      [string]
          --version     Show version number   [boolean]
          --help        Show help             [boolean]

        Examples:
          csv-to-log -i foo.csv             => stdout
          csv-to-log -i foo.csv -o bar.log  => Write output to a file

  `,
  {
    importMeta: import.meta,
    inferType: true,
    flags: {
      input: {
        type: "string",
        alias: "i",
      },
      output: {
        type: "string",
        alias: "o",
      },
    },
  }
);

const {
  flags: { input, output },
} = cli;

if (!input) {
  logError("--input is required");
}

if (input && !input.includes(".csv")) {
  logError("Input file should be a .csv file");
}
if (output && !output.includes(".log")) {
  logError("Output file should be a .log file");
}

console.log("\n");
convertCSVtoLOG(input, output);
