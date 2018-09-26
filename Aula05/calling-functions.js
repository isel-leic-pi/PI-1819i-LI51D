'use strict'

function Point(x, y) {
    this.x = x;
    this.y = y;

    this.toString = function () {return `{x: ${this.x} - y: ${this.y}}` }
}

function f() {
    console.log(`this: `);
    console.log(this)
    console.log(arguments.length)
}

console.log("1. - calling a functions as a global function")
f();   // 1. - calling a functions as a global function

//let o =  { m: f }
let o = new Object()
o.m = f;

console.log("2. - calling as a method")
o.m(); // 2. - calling as a method

console.log("3. callling as a constructor function")
var newO = new f();  // 3. callling as a constructor function


var p = new Point(2,3);
console.log("p: " + p.toString())

console.log("4. callling using call() or apply() function methods")

let s = "SLB";
f.call(s, 1,2,3);
f.apply(s, [1,2,3]);






