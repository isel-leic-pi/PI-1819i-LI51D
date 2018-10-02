function passArguments() {
    arguments[0].apply(this, Array.prototype.slice.call(arguments, 1))

}

function add(a,b) {
    console.log(arguments.length)

    return a+b;
}

passArguments(add, 2,3,4)