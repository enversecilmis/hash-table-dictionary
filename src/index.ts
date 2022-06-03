import DictionaryHashTable from "./Dictionary Hash Table/DictionaryHashTable"
import { Dictionary } from "./Dictionary Hash Table/types"
import { createDictionaryFromTextFile, runTimeComparison, searchInDictionary } from "./Dictionary Hash Table/utils"

 


const dictionary: Dictionary = createDictionaryFromTextFile('files/sozluk.txt')
const dictHashTable = DictionaryHashTable.createFromDictionary(dictionary, dictionary.length*4)

const searchableWords = dictionary.map((pair) => pair[0])


let comp = runTimeComparison(
    (i) => searchInDictionary(searchableWords[i % searchableWords.length], dictionary),
    (i) => dictHashTable.search(searchableWords[i % searchableWords.length]),
    searchableWords.length*4
)

// let comp = runTimeComparison(
//     (i) => searchInDictionary('about', dictionary),
//     (i) => dictHashTable.search('about'),
//     searchableWords.length*4
// )

console.log(comp)

