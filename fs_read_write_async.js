const {readFile, writeFile} = require('fs')
console.log("Starting")
readFile('./content/first.txt','utf8', (err, result) => {
    if (err) {
        console.log(err)
        return
    }
    const first = result
    readFile('./content/second.txt','utf8', (err, result) => {
        if (err) {
            console.log(err)
            return
        }
        const second = result
        writeFile(
            './content/result-async.txt',
            `Os dois no modo async: ${first} ${second}`,
            (err,result) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log("Done with this task")
            }
            )
    })
})
console.log("Starting next taxt")


