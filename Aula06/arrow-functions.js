function Contructor(x) {
    this.x = x;

    this.f = () => { 
        console.log("this:")
        console.log(this)
    }
}

function f2(f) {
    f();
}


let c = new Contructor(5);

c.f();

let f1 = c.f;

f1();

// Raises an error. Arrow functions cannot be used as constructor functions
//let foo = new f1();  


f1.call("SLB", 5);

f2(c.f)
f2(f1)