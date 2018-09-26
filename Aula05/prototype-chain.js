function Point(x, y) {
    this.x = x;
    this.y = y;
}

Point.prototype.toString = function () {return `{x: ${this.x} - y: ${this.y}}` }


function Point3D(x, y, z) {
    Point.call(this, x, y);
    this.z = z;
}

Point3D.prototype = new Point()


let p3d = new Point3D(1,2,3);

console.log(p3d.toString());



