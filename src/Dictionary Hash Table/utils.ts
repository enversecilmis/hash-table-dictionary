import { readFileSync } from "fs"
import { Dictionary } from "./types"






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




const fib = (n: number): number => {
    const table = [1,1]

    for (let i=2; i<n; i++)
        table[i] = table[i-1] + table[i-2]

    return table[n-1]
}






export {
    createDictionaryFromTextFile,
    searchInDictionary,
    fib,
}
