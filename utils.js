const searchWord = (searchWord, dictionary) => {
    for(let words of dictionary)
        if(words[0] === searchWord)
            return words[1]

    return "*Sonuç Yok*"
}

module.exports = {
    searchWord,
}