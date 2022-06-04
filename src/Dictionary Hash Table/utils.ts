import { readFileSync } from "fs"
import { Dictionary, HashStringFunction, OnCollisionNextIndexHandler } from "./types"






const createDictionaryFromTextFile = (path: string): Dictionary => {

    const file = readFileSync(path, {encoding: "utf-8"})

    // Split file line by line.
    const lines = file.split("\r\n")

    // From each line, get word and its translation as tuple, which are seperated by two spaces.
    const dictionary: Dictionary = lines.map( line => {
        const pair = line.split(/ {2,}/)
        return [pair[0], pair[1]]
    })

    return dictionary
}




const searchInDictionary = (searchWord: string, dictionary: Dictionary) => {
    for(let words of dictionary)
        if(words[0] === searchWord)
            return words[1]

    return "*Sonuç Yok*"
}





// Default hash function.
const simpleStringHashFunction: HashStringFunction = (input) => {
    const g = 17
    let hash = 0

    for(let i=0; i<input.length; i++){
        hash += input.charCodeAt(i) * g**i
    }

    return hash
}




// Default collision handler.
const simpleNextHash: OnCollisionNextIndexHandler = (currentHashValue, input) => currentHashValue * input.length

const linearProbing: OnCollisionNextIndexHandler = (currentHashValue,_,iteration) => currentHashValue + 1

const quadraticProbing: OnCollisionNextIndexHandler = (currentHashValue, _, iteration) => currentHashValue + iteration**2




const showStats = (arr: number[]) => {
    const max = Math.max(...arr)
    const min = Math.min(...arr)
    const total = arr.reduce((acc,cur) => acc+cur)
    const average = total / arr.length
    const standardDeviation = (arr.reduce((prev, current) => prev + (current-average)**2)) / arr.length
    
    
    console.log("Max: ", max)
    console.log("Min: ", min)
    console.log("Total: ", total)
    console.log("Average:", average);
    console.log("Standard Deviation: ",standardDeviation)
}




const runTimeComparison = (func1: (index?: number) => void, func2: (index?: number) => void, iterations: number = 100) => {
    let dateBefore = Date.now()
    for(let i=0; i<iterations; i++)
        func1(i)
    let runTime1 = Date.now() - dateBefore


    dateBefore = Date.now()
    for(let i=0; i<iterations; i++)
        func2(i)
    let runtime2 = Date.now() - dateBefore


    return runTime1 / runtime2
}




const rndNum = (min: number, max: number) => Math.floor(Math.random() * (max - min) ) + min;






export {
    createDictionaryFromTextFile,
    searchInDictionary,
    simpleStringHashFunction,
    simpleNextHash,
    showStats,
    runTimeComparison,
    rndNum
}
