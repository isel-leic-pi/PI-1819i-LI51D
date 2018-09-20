let literalNotation = { a: "SLB", b: 10};
let anotherLiteralNotation = { a: 30, b: literalNotation };

console.log(literalNotation.a); // Reading properties with Dot Notation
literalNotation.a = 33;         // Writing properties with Dot Notation

console.log(literalNotation["a"]); // Reading properties with Subscript Notation
literalNotation["a"] = 33;         // Writing properties with Subscript Notation


literalNotation.z = "Benfica";


//delete literalNotation.a;

console.log(`Has d property: ${literalNotation.hasOwnProperty(`d`)}`);
console.log(`Has b property: ${literalNotation.hasOwnProperty('b')}`);


for(let k in literalNotation) {
    console.log(`${k} = ${literalNotation[k]} `)
}



