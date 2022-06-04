import DictionaryHashTable from "./Dictionary Hash Table/DictionaryHashTable"
import { Dictionary } from "./Dictionary Hash Table/types"
import { createDictionaryFromTextFile, rndNum, runTimeComparison, searchInDictionary } from "./Dictionary Hash Table/utils"

 


const dictionary: Dictionary = createDictionaryFromTextFile('files/sozluk.txt')
const dictHashTable = DictionaryHashTable.createFromDictionary(dictionary, dictionary.length*4+1,{
    showStats: true,
    throwInfiniteLoopError: true
})

dictHashTable.saveToFile('files/output.txt')







const searchableWords = dictionary.map((pair) => pair[0])

// Sequential search comparison (from start to finish).
let sequentialComparison = runTimeComparison(
    (i) => searchInDictionary(searchableWords[i % searchableWords.length], dictionary),
    (i) => dictHashTable.search(searchableWords[i % searchableWords.length]),
    searchableWords.length
)
console.log(`Sequential search comparison: ${sequentialComparison}`)


// Random search comparison.
let randomComparison = runTimeComparison(
    () => searchInDictionary(searchableWords[rndNum(0,searchableWords.length)], dictionary),
    () => dictHashTable.search(searchableWords[rndNum(0,searchableWords.length)]),
    searchableWords.length
)
console.log(`Random search comparison: ${randomComparison}`)





