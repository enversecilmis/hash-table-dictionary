const searchWordInDisctionary = (searchWord, dictionary) => {
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
    searchWordInDisctionary,
    fib,
}