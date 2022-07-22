# **aws-csv2log-cli**

> Converts aws csv file(insights, DB logs) to .log format.

Works on macOS, Linux, and Windows.

## Install

```sh
clone the repo
npm install --global .
```

## Usage

```
$ aws-csv2log-cli --help

	Usage: aws-csv2log-cli --input=[input file] --output=[output file]

        Options:
          --input   -i  Input .csv file       [string] [required]
          --output  -o  Output .log file      [string]
          --version     Show version number   [boolean]
          --help        Show help             [boolean]

        Examples:
            aws-csv2log-cli --input=foo.csv                   => stdout
            aws-csv2log-cli --input=foo.csv --output=bar.log  => Write output to a file
```
