const fs = require("fs")



const file = fs.readFileSync("sozluk.txt", {encoding: "latin1"})
const lines = file.split("\r\n")
const dictionary = lines.map(line => line.split(/ {3,}/))



const searchWord = (searchWord) => {
    let result = "*Sonuç Yok*"

    for(let words of dictionary){
        if(words[0] === searchWord)
            result = words[1]
    }
    return result
}




let trans = ""
for(let i=0; i<10000; i++){
    trans = searchWord("zooming")
}
console.log(trans);