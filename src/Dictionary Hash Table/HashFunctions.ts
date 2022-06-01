import { HashStringFunction, OnCollisionNextIndexHandler } from "./types"






const hashFunc1: HashStringFunction = (input) => {
    let hash: number = 0
    
    for(let i=0; i<input.length; i++)
        hash += input.charCodeAt(i)*i

    return hash
}



const nextHashIndex1: OnCollisionNextIndexHandler = (input, currentHashValue) => input.length * currentHashValue






export {
    hashFunc1,
    nextHashIndex1,
}
