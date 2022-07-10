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
          csv-to-log -i foo.csv             => stdout
          csv-to-log -i foo.csv -o bar.log  => Write output to a file
```
