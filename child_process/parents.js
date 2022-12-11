const express = require("express")
const app = express()
const { fork } = require("child_process")

// From testing on my computer, running the child_process always add a min response time of +20ms
// Also im only spawning 1 child process, which uses only 1 more cpu core... keeping 2 cpu cores busy
app.get("/isprime", (req, res) => {
  const childProcess = fork("./child_process/child.js")
  childProcess.send({ number: parseInt(req.query.number) }) //send method is used to send message to child process through IPC
  const startTime = new Date()

  /* const result = fibonacci(parseInt(req.query.number))
  const endTime = new Date()
  res.json({
    ...result,
    number: req.query.number,
    time: endTime.getTime() - startTime.getTime() + "ms",
  }) */

  childProcess.on("message", message => {
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

app.listen(3636, () => console.log("listening on port 3636"))


/* const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
} */
