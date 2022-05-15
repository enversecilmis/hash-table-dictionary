const { readFileSync } = require("fs")
const { searchWord, compareFunctionTimes } = require("./utils")



const file = readFileSync("sozluk.txt", {encoding: "utf-8"})
const lines = file.split("\r\n")
const dictionary = lines.map(line => line.split(/ {3,}/))



let trans = ""
for(let i=0; i<10000; i++)
    trans = searchWord("zooming", dictionary)

console.log(trans);
