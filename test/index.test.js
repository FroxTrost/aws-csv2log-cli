import test from "ava";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execa } from "execa";
import { readFile } from "fs/promises";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cli = path.join(__dirname, "../cli.js");
const inputfile = path.join(__dirname, "log-events-viewer-result.csv");
const outputFile = path.join(__dirname, "output.log");
const logOutput = `
# Time: 2022-07-08T04:24:31.384291Z
# User@Host: admin[admin] @  [101.0.33.216]  Id: 333445
# Query_time: 0.000410  Lock_time: 0.000128 Rows_sent: 1  Rows_examined: 443
use my_slave_db;
SET timestamp=1657254271;
SELECT * from users LIMIT 1;
# Time: 2022-07-08T04:24:31.391490Z
# User@Host: admin[admin] @  [101.0.33.216]  Id: 347300
# Query_time: 0.006267  Lock_time: 0.000213 Rows_sent: 1  Rows_examined: 7933
SET timestamp=1657254271;
SELECT * From pizza;`;

test("no arg", async (t) => {
  try {
    await execa(cli, []);
  } catch (error) {
    t.regex(error.stderr, /--input is required/);
  }
});

test("inavalid input file", async (t) => {
  try {
    await execa(cli, ["--input", "input.txt"]);
  } catch (error) {
    t.regex(error.stderr, /Input file should be a .csv file/);
  }
});

test("inavalid log file", async (t) => {
  try {
    await execa(cli, ["--input", "input.csv", "--output", "output.txt"]);
  } catch (error) {
    t.regex(error.stderr, /Output file should be a .log file/);
  }
});

test("stdout output", async (t) => {
  const { stdout } = await execa(cli, ["--input", inputfile]);

  t.is(stdout.trim(), logOutput.trim());
});

test("file output", async (t) => {
  await execa(cli, ["--input", inputfile, "--output", outputFile]);
  const data = await readFile(outputFile, "utf-8");
  t.is(data.trim(), logOutput.trim());
});
