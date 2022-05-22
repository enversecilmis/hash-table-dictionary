import { readFileSync } from "fs"
import { DictionaryHashTable } from "./hash"
import { Dictionary } from "./types"
import { fib, searchWordInDisctionary } from "./utils"






// Create dictionary from txt
const file = readFileSync("sozluk.txt", {encoding: "utf-8"})
const lines = file.split("\r\n")
const dictionary: Dictionary = lines.map((line) => [line.split(/ {2,}/)[0], line.split(/ {2,}/)[1]])


const dictHashTable = new DictionaryHashTable(dictionary, dictionary.length*4)




