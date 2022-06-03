type word = string
type translation = string
export type Dictionary = [word, translation][]

export type HashStringFunction = (input: string) => number

export type StringHashTable = [string, string][]

export type OnCollisionNextIndexHandler = (input: string, currentHashIndex: number) => number

export type DictionaryHashTableOptions = {
    hashFunction?: HashStringFunction,
    nextHash?: OnCollisionNextIndexHandler,
    showStats?: boolean
}
