let o = new Object();
o[1] = 10;
console.log(o[1])
o["property with spaces"] = 30;
console.log(o["property with spaces"])
console.log(o.length)

// Array creation with literal notation
let a = [1, "SLB", {}, , () => {}];

console.log(a.length)

a[735] = "Benfica";
console.log(a.length)

a.length = 0;

console.log(a[0])

a.length = 3;

console.log(a[0])


// Array creation with object notation
let a1 = new Array("10");

console.log(a1.length)

console.log(a.constructor)
console.log(a1.constructor)









