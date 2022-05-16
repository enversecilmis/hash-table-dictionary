"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Create dictionary from txt
var file = (0, fs_1.readFileSync)("sozluk.txt", { encoding: "utf-8" });
var lines = file.split("\r\n");
var dictionary = lines.map(function (line) { return line.split(/ {2,}/); });
var hashFunc = function (wordInput) {
    var code = 0;
    for (var i = 0; i < wordInput.length; i++)
        code += wordInput.charCodeAt(i);
    return code;
};
// create hash table
var hashTable = Array(10000);
for (var i in dictionary) {
    var hashIndex = hashFunc(dictionary[i][0]) % 10000;
    while (hashTable[hashIndex] !== undefined) {
        hashIndex++;
        hashIndex = hashIndex % 10000;
    }
    hashTable[hashIndex] = [dictionary[i][0], dictionary[i][1]];
}
var searchHashTable = function (word) {
    var hashIndex = hashFunc(word) % 10000;
    while (hashTable[hashIndex] !== undefined) {
        if (hashTable[hashIndex][0] == word)
            return hashTable[hashIndex][1];
        hashIndex++;
        hashIndex = hashIndex % 10000;
    }
    return "*Sonuç Yok*";
};
var trans = searchHashTable("abouts");
console.log(trans);
