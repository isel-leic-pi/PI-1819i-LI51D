function Point(x, y) {
    this.x = x;
    this.y = y;

}

Point.prototype.toString = function () {return `{x: ${this.x} - y: ${this.y}}` }

let p = new Point(2,3);

console.log(p.toString());

//Point.prototype.toString = function () {return `[x: ${this.x} - y: ${this.y}]` }

p.toString = function () {
    return '[' + Point.prototype.toString.call(this) + ']';
}

let p1 = new Point(4,5);

console.log(p.toString());
console.log(p1.toString());


String.prototype.surround = function(prefix, suffix) {
    return prefix + this + suffix
}

let s = "O".surround("SLB é", "maior");

console.log(p1.constructor.prototype == p1.__proto__)

console.log(p1.constructor.prototype == Object.getPrototypeOf(p1))