type word = string
type translation = string
export type Dictionary = [word, translation][]

export type HashStringFunction = (input: string) => number

export type StringHashTable = [string, string][]

export type OnCollisionNextIndexHandler = ( currentHashValue: number, input?: string, iteration?: number) => number

export type DictionaryHashTableOptions = {
    hashFunction?: HashStringFunction,
    collisionHandler?: OnCollisionNextIndexHandler,
    showStats?: boolean,
    throwInfiniteLoopError?: boolean
}
