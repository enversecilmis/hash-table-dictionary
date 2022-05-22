import { Dictionary, HashFunction } from "./types"
import { fib } from "./utils"




class DictionaryHashTable {
    hashTable: [string, string][]



    constructor(dictionary: Dictionary, hashTableSize: number){
        this.hashTable = Array(hashTableSize)
        
        
        let totalCollisions = 0
        let maxCollisions = 0

        // fill in the hash table
        for(let i in dictionary){
            let collisions = this.add(dictionary[i])
            
            console.log(collisions);
            
            maxCollisions = collisions > maxCollisions? collisions : maxCollisions
            totalCollisions += collisions
        }

        console.log("*** Hash table created ***")
        console.log("Total Collisions: ", totalCollisions)
        console.log("Max collisions: ", maxCollisions)
    }

    


    add(input: [string, string]){
        let hashIndex = this.hashFunction(input[0]) % this.hashTable.length

        let collisions = 0
        // detect/handle collisions
        while(this.hashTable[hashIndex] != undefined){
            hashIndex = this.nextHashIndex(input[0], hashIndex) % this.hashTable.length
            collisions++
        }
        this.hashTable[hashIndex] = [ input[0], input[1] ]

        return collisions
    }
    

    search(searchWord: string): string{
        let hashIndex = this.hashFunction(searchWord) % this.hashTable.length
        if(this.hashTable[hashIndex] === undefined)
            return "*** no result ***"

        let collisions = 0
        while (this.hashTable[hashIndex][0] !== searchWord){
            hashIndex = this.nextHashIndex(searchWord, hashIndex) % this.hashTable.length
            collisions++
        }

        return this.hashTable[hashIndex][1]
    }
    

    remove(input: string){
        
    }
    
    
    hashFunction(input: string) {
        let hash: number = 0

        for(let i=0; i<input.length; i++)
            hash += input.charCodeAt(i)*fib(i)

        return hash
    }


    nextHashIndex(input: string, currentHashValue: number): number{
        

        return input.length * currentHashValue

    }
}




export {
    DictionaryHashTable,
}