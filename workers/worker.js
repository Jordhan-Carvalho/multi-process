/* const { workerData, parentPort } = require("worker_threads")

const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2) 
}

console.log("workerData", workerData)
const sum = fibonacci(workerData)


parentPort.postMessage({
  //send message with the result back to the parent process
  result: sum,
}) */
const { workerData, parentPort } = require("worker_threads")
//workerData will be the second argument of the Worker constructor in multiThreadServer.js

const start = workerData.start
const end = workerData.end

var sum = 0
for (var i = start; i <= end; i++) {
  for (var j = 2; j <= i / 2; j++) {
    if (i % j == 0) {
      break
    }
  }
  if (j > i / 2) {
    sum += i
  }
}

parentPort.postMessage({
  //send message with the result back to the parent process
  start: start,
  end: end,
  result: sum,
})
