// Synchronous programming model

function addSync(n1,n2) {
    return n1+n2;
}

let res = addSync(2,3)
processRes(res);



function processRes(res) {
    console.log("Inside processRes: " + res);
}


// Asynchronous programming model
let res1;

function addAsync(n1,n2, cb) {
    setTimeout(() => cb(n1+n2), 100)
}


function processRes1(res) {
    res1 = res;
    console.log("Inside processRes1: " + res);
}

addAsync(2,3, processRes1)


//while(res1 == undefined); // Don't EVER do blocking code!!!!

console.log("after addAsync:" + res1)
