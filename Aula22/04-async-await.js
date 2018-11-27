function forwardPromise(p) {
  return p
    .then(console.log)
    .catch((e) => console.log(`Something wrong happened ${e}`))
    .finally(() => console.log("Finally is always called!"))
}


async function a1() {
  return new Promise((resolve) =>
    setTimeout(resolve, 1000, 55))
}

function a2() {
  console.log("before calling a1")
  return a1().then((val) => {
    console.log("after a1 resolved", val)
    return val * 2
  })
  .catch((e) => console.log(e))
}

async function a2AsyncAwait() {
  try {
    console.log("before await on a1")
    let val = await a1()
    console.log("after await on a1", val)
    return val * 2;
  } catch (e) { console.log(e) }
}

console.log("before calling a2")
let sa2 = a2();
console.log("after calling a2")
forwardPromise(sa2);


console.log("before calling a2AsyncAwait")
let sa2aw = a2AsyncAwait();
console.log("after calling a2AsyncAwait")
forwardPromise(sa2aw);


