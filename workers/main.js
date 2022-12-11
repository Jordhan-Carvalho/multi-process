/* const express = require("express")
const app = express()
const { Worker } = require("worker_threads")


// When using fibonnaci example and only running one worker it seems it only uses 1 cpu
app.get("/fibonacci", async (req, res) => {
  const startTime = new Date()
  const worker = new Worker("./workers/worker.js", { workerData: parseInt(req.query.number) })
  worker.on("message", (message) => {
    //on("message") method is used to listen for messages send by the child process
    const endTime = new Date()
    res.json({
      ...message,
      number: req.query.number,
      time: endTime.getTime() - startTime.getTime() + "ms",
    })
  })

})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(7777, () => console.log("listening on port 7777")) */



// USING THIS EXAMPLE AND SPAWNING 4 WORKERS IT SEEMS THAT 4 CPU CORES GET UTILIZED
const express = require("express")
const app = express()
const { Worker } = require("worker_threads")

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    //first argument is filename of the worker
    const worker = new Worker("./workers/worker.js", {
      workerData,
    })
    worker.on("message", resolve) //This promise is gonna resolve when messages comes back from the worker thread
    worker.on("error", reject)
    worker.on("exit", code => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`))
      }
    })
  })
}

function divideWorkAndGetSum() {
  // we are hardcoding the value 600000 for simplicity and dividing it
  //into 4 equal parts

  const start1 = 2
  const end1 = 1500000
  const start2 = 1500001
  const end2 = 3000000
  const start3 = 3000001
  const end3 = 4500000
  const start4 = 4500001
  const end4 = 6000000
  //allocating each worker seperate parts
  const worker1 = runWorker({ start: start1, end: end1 })
  const worker2 = runWorker({ start: start2, end: end2 })
  const worker3 = runWorker({ start: start3, end: end3 })
  const worker4 = runWorker({ start: start4, end: end4 })
  //Promise.all resolve only when all the promises inside the array has resolved
  return Promise.all([worker1, worker2, worker3, worker4])
}

app.get("/sumofprimeswiththreads", async (req, res) => {
  const startTime = new Date().getTime()
  const sum = await divideWorkAndGetSum()
    .then(
      (
        values //values is an array containing all the resolved values
      ) => values.reduce((accumulator, part) => accumulator + part.result, 0) //reduce is used to sum all the results from the workers
    )
    .then(finalAnswer => finalAnswer)

  const endTime = new Date().getTime()
  res.json({
    number: 600000,
    sum: sum,
    timeTaken: (endTime - startTime) / 1000 + " seconds",
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

app.listen(7777, () => console.log("listening on port 7777"))
