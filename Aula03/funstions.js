let f = function (p1, p2) {
    console.log(`${p1}, ${p2}` )
};


var o = { m1 : f };


f();
f(10);
f(10, 20);
f(10, 20, 30, 40, 50);

