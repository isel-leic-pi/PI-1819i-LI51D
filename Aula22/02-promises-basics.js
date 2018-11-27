function myCallBack(n) {
  console.log(n);
  return n + ""
}


function asyncOrNotAsyncWithPromisses(n) {
  console.log("Before creating the promisse")
  var p = new Promise(function (resolve, reject) {
    console.log("Inside the promisse constructor provided function")
    if (n % 2 == 0) {
      resolve(n)
    } else {
      if (n == 99) {
          reject("Bad, really bad number")
      } else {
        setTimeout(() => {
          resolve(n)
        }, 1000);
      }
    }
  });

  console.log("After creating the promisse")
  n++;
  return p;
}

// asyncOrNotAsyncWithPromisses(34)  // P<number>
//   .then(myCallBack)              // P<string>
//   .then(s => console.log(s.length))
//   .catch(e => console.log(e))


console.log("#################")

asyncOrNotAsyncWithPromisses(99)  // P<number>
  .then(myCallBack)              // P<string>
  .then(s => console.log(s.length))
  .catch(e => console.log(e))



