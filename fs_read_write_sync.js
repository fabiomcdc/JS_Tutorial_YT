const {readFileSync, writeFileSync} = require('fs')
console.log("Starting")
const first = readFileSync('./content/first.txt','utf8')
const second = readFileSync('./content/second.txt','utf8')
writeFileSync('./content/result-sync.txt',
            `Os dois no modo sync: ${first} ${second}`)
                console.log("Done with this task")
console.log("Starting next taxt")