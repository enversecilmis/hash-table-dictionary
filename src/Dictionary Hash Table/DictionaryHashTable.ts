import { createWriteStream, readFileSync, writeFileSync } from "fs"
import { Dictionary, HashStringFunction, StringHashTable, OnCollisionNextIndexHandler, DictionaryHashTableOptions } from "./types"
import { showStats, simpleNextHash, simpleStringHashFunction } from "./utils"






class DictionaryHashTable {
    hashTable: StringHashTable
    loadFactor: number
    hashFunc: HashStringFunction
    collisionHandler: OnCollisionNextIndexHandler

    private allCollisions: number[] = []

    constructor(){
        this.loadFactor = 0
    }




    add(input: [string, string], throwInfiniteLoopError: boolean = false){
        let hashIndex = this.hashFunc(input[0]) % this.hashTable.length
        const hashHistory: number[] = [hashIndex] // For detecting collision loop.

        // detect / handle collisions.
        let collisionCount = 0
        while(this.hashTable[hashIndex]){
            collisionCount++
            hashIndex = this.collisionHandler(hashIndex, input[0], collisionCount) % this.hashTable.length
            
            // Throw error on collision loop if the option is set.
            if(throwInfiniteLoopError && hashHistory.includes(hashIndex))
                throw new Error('Infinite collision loop.')
            hashHistory.push(hashIndex)
        }
        this.hashTable[hashIndex] = [ input[0], input[1] ]
        this.loadFactor += 1/this.hashTable.length
        this.allCollisions.push(collisionCount)
    }




    search(searchWord: string): string{
        let hashIndex = this.hashFunc(searchWord) % this.hashTable.length

        let collisionCount = 0
        while (this.hashTable[hashIndex] && this.hashTable[hashIndex][0] !== searchWord){
            collisionCount++
            hashIndex = this.collisionHandler(hashIndex, searchWord, collisionCount) % this.hashTable.length
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




    static loadFromFile(path: string){
        const file = readFileSync(path, { encoding: 'utf-8' })

        // Split file line by line.
        const lines = file.split("\r\n")

        // From each line, get word and its translation as tuple, which are seperated by two spaces.
        // Put undefined in place of empty line.
        const dictionary: Dictionary = lines.map( line => {
            const pair = line.split(/ {2,}/)
            return pair[0]?
                    [pair[0], pair[1]]:
                    undefined
        })

        return dictionary
    }




    static createFromDictionary(
        dictionary: Dictionary,
        tableSize: number,
        options?: DictionaryHashTableOptions
    ): DictionaryHashTable {
        // Default options.
        const opt = {
            ...{
                hashFunction: simpleStringHashFunction,
                collisionHandler: simpleNextHash,
                showStats: false,
                throwInfiniteLoopError: false
            },
            ...options
        }

        if(tableSize <= dictionary.length) throw new Error('Hash table size must be bigger than dictionary size.')
        
        const dictionaryHashTable     = new DictionaryHashTable()
        dictionaryHashTable.hashFunc  = opt.hashFunction || simpleStringHashFunction
        dictionaryHashTable.collisionHandler  = opt.collisionHandler || simpleNextHash
        dictionaryHashTable.hashTable = Array(tableSize)
        
        // Fill in the hash table.
        dictionary.forEach( pair => dictionaryHashTable.add(pair, opt.throwInfiniteLoopError))
        
        // Statistics:
        if(opt.showStats){
            console.log("*** Hash table created ***")
            console.log(`Load factor: ${dictionaryHashTable.loadFactor}`)
            
            console.log("Collision Stats:");
            
            showStats(dictionaryHashTable.allCollisions)
        }
        delete dictionaryHashTable.allCollisions  // So that it won't take up space in memory
        
        return dictionaryHashTable
    }
    
}






export default DictionaryHashTable
