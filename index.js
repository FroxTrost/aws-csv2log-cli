import { parse } from "csv-parse";
import { createReadStream, createWriteStream } from "fs";
import { transform } from "stream-transform";

const convertCSVtoLOG = (inputFilePath, outFilePath) => {
  const records = []; // Records to be read from input stream
  let isHeader = true; // Header of CSV file

  // Initialize the parser
  const csvParser = parse({
    delimiter: ",",
  });

  // Using the readable stream api to consume records
  csvParser.on("readable", function () {
    let record;
    while ((record = csvParser.read()) !== null) {
      records.push(record);
    }
  });

  // Input Stream
  const input = createReadStream(inputFilePath);

  /**
   * Parsing and transforming the csv records to ALB log format
   * CSV record : [timestamp, message]
    ]
   */
  const transformCSVtoLog = transform((record) => {
    // First records will always be csv header
    if (isHeader) {
      isHeader = false;
      return "";
    }
    // We only need message
    return `${record[1]}\n`;
  });

  /**
   * Output Stream.
   * If outfile file is provides then writing the logs on file
   * Otherwise writing on standard output
   */
  const output = outFilePath ? createWriteStream(outFilePath) : process.stdout;

  input.pipe(csvParser).pipe(transformCSVtoLog).pipe(output);
};

export default convertCSVtoLOG;
