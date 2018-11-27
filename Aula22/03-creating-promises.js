function forwardPromise(p) {
  return p
    .then(console.log)
    .catch((e) => console.log(`Something wrong happened ${e}`))
    .finally(() => console.log("Finally is always called!"))
}



function createPromiseUsingConstructorFunction(success) {
  return new Promise(function (resolve, reject) {
    if (success) {
      return resolve("ok!")
    }
    reject("ERROR")
  });
}


let s1 = createPromiseUsingConstructorFunction(true)
forwardPromise(s1)


let e1 = createPromiseUsingConstructorFunction(false)
forwardPromise(e1)

let s2 = Promise.resolve(33)
forwardPromise(s2)

let e2 = Promise.reject("Promise Rejected")
forwardPromise(e2)

