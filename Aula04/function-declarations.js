 
(function () { 

    var f = function f() { 
        console.log(`f=${global.f}`)
    }
    
    var f1 = function() { console.log("f1") }
    
    let o = { f3: function () { } }
    
    console.log(`f.name = ${f.name}`)
    
    console.log(`f1.name = ${f1.name}`)
    
    console.log(`o.f3.name = ${o.f3.name}`)
    
    f4(function() {});
    
    function f4(f5) { 
        console.log(`f.name = ${f5.name}`)
    }
    
    let ff = f;
    
    f = 10;
    
    ff();

    var f6 = new Function("a", "console.log('f6'); console.log(a)");
    f6(35);
 })();


 
