import { createWriteStream, writeFileSync } from "fs"
import { Dictionary, HashStringFunction, StringHashTable, OnCollisionNextIndexHandler, DictionaryHashTableOptions } from "./types"
import { showStats, simpleNextHash, simpleStringHashFunction } from "./utils"






class DictionaryHashTable {
    hashTable: StringHashTable
    hashFunc: HashStringFunction
    nextHash: OnCollisionNextIndexHandler

    private allCollisions: number[] = []



    constructor(
        dictionary: Dictionary,
        tableSize: number,
        options: DictionaryHashTableOptions = { hashFunction: simpleStringHashFunction, nextHash: simpleNextHash }
    ){
        if(tableSize <= dictionary.length) throw new Error('Hash table size must be bigger than dictionary size.')
        this.hashFunc = options.hashFunction
        this.nextHash = options.nextHash
        this.hashTable = Array(tableSize)
        
        // Fill in the hash table.
        dictionary.forEach( pair => this.add(pair))
        

        // Statistics:
        console.log("*** Hash table created ***")
        showStats(this.allCollisions)
    }




    add(input: [string, string]){
        let hashIndex = this.hashFunc(input[0]) % this.hashTable.length
        const hashHistory: number[] = [hashIndex] // For detecting collision loop.

        // detect / handle collisions.
        let collisions = 0
        while(this.hashTable[hashIndex]){
            collisions++
            hashIndex = this.nextHash(input[0], hashIndex) % this.hashTable.length
            
            // Throw error on collision loop.
            if(hashHistory.includes(hashIndex)) throw new Error('Infinite collision loop.')
                hashHistory.push(hashIndex)
        }
        this.hashTable[hashIndex] = [ input[0], input[1] ]

        this.allCollisions.push(collisions)
    }




    search(searchWord: string): string{
        let hashIndex = this.hashFunc(searchWord) % this.hashTable.length

        let collisions = 0
        while (this.hashTable[hashIndex] && this.hashTable[hashIndex][0] !== searchWord){
            hashIndex = this.nextHash(searchWord, hashIndex) % this.hashTable.length
            collisions++
        }

        return this.hashTable[hashIndex]?
            this.hashTable[hashIndex][1]:
            undefined
    }




    saveToFile(path: string){
        writeFileSync(path,"")
        const logger = createWriteStream(path, {flags: 'a'}) // flags:'a' means append mode

        for(let row of this.hashTable)
            row ?
              logger.write( `${row[0]}  ${row[1]} \r\n`):
              logger.write("\r\n")
    }
    
}













export default DictionaryHashTable
