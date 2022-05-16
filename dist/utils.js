"use strict";
exports.__esModule = true;
exports.searchWordInDisctionary = void 0;
var searchWordInDisctionary = function (searchWord, dictionary) {
    for (var _i = 0, dictionary_1 = dictionary; _i < dictionary_1.length; _i++) {
        var words = dictionary_1[_i];
        if (words[0] === searchWord)
            return words[1];
    }
    return "*Sonuç Yok*";
};
exports.searchWordInDisctionary = searchWordInDisctionary;
