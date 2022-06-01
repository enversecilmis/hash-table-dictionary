import { createWriteStream, writeFileSync } from "fs"
import { hashFunc1, nextHashIndex1 } from "./HashFunctions"
import { Dictionary, HashStringFunction, StringHashTable, OnCollisionNextIndexHandler, DictionaryHashTableOptions } from "./types"






class DictionaryHashTable {
    hashTable: StringHashTable
    hashFunc: HashStringFunction
    nextHash: OnCollisionNextIndexHandler

    private maxCollisions: number
    private totalCollisions: number



    constructor(
        dictionary: Dictionary,
        hashTableSize: number,
        options: DictionaryHashTableOptions = { hashFunction: hashFunc1, nextHash: nextHashIndex1 }
    ){
        this.totalCollisions = 0
        this.maxCollisions = 0
        this.hashFunc = options.hashFunction
        this.nextHash = options.nextHash
        this.hashTable = Array(hashTableSize)
        
        // fill in the hash table
        dictionary.forEach( pair => this.add(pair) )
        
        console.log("*** Hash table created ***")
        console.log("Total Collisions: ", this.totalCollisions)
        console.log("Max collisions at a time: ", this.maxCollisions)
    }




    add(input: [string, string]){
        let hashIndex = this.hashFunc(input[0]) % this.hashTable.length

        // detect/handle collisions
        let collisions = 0
        while(this.hashTable[hashIndex] !== undefined){
            hashIndex = this.nextHash(input[0], hashIndex) % this.hashTable.length
            collisions++
        }
        this.hashTable[hashIndex] = [ input[0], input[1] ]

        this.totalCollisions += collisions
        if(collisions > this.maxCollisions)
            this.maxCollisions = collisions
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






export {
    DictionaryHashTable,
}
