# **aws-csv2log-cli**

> Converts aws csv file(insights, DB logs) to .log format.

Works on macOS, Linux, and Windows.

## Install

```sh
npm install --global awscsv2log-cli
```

## Usage

```
$ csv2log --help

	Usage: csv2log --input [input file] --output [output file]

        Options:
          --input   -i  Input .csv file       [string] [required]
          --output  -o  Output .log file      [string]
          --version     Show version number   [boolean]
          --help        Show help             [boolean]

        Examples:
            awscsv2log-cli --input=foo.csv                   => stdout
            awscsv2log-cli --input=foo.csv --output=bar.log  => Write output to a file
```
