function f1(a, b) {
    console.log(`a = ${a}`)
    console.log(`b = ${b}`)
    
    console.log(`number of arguments = ${arguments.length}`)


    for(var i = 0; i < arguments.length; ++i) {
        console.log(`arguments[${i}] = ${arguments[i]}`)
    }
}

f1()
f1(5)
f1(5,10)
f1(5,10,15)
f1(5,10,15,20)