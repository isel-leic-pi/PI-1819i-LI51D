// Using callbacks

function asyncOrNotAsync(n, cb) {
  if (n % 2 == 0) {
    cb(n)
  } else {
    setTimeout(() => {
      cb(n)
    }, 1000);
  }
}

function myCallBack(n) {
  console.log(n);
}

asyncOrNotAsync(3, myCallBack)
asyncOrNotAsync(2, myCallBack)

