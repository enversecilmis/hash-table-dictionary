import { DictionaryHashTable } from "./Dictionary Hash Table/DictionaryHashTable"
import { Dictionary } from "./Dictionary Hash Table/types"
import { createDictionaryFromTextFile } from "./Dictionary Hash Table/utils"

 


const dictionary: Dictionary = createDictionaryFromTextFile('files/sozluk.txt')

const dictHashTable = new DictionaryHashTable(dictionary, dictionary.length*4)

dictHashTable.saveToFile('files/output.txt')

