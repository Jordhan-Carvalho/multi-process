const express = require("express")
const app = express()

app.get("/fibonacci", (req, res) => {
  const startTime = new Date()
  const result = fibonacci(parseInt(req.query.number))
  const endTime = new Date()
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  })
})

app.get("/test", (req, res) => {
  res.send("I am unblocked now")
})

const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

app.listen(3000, () => console.log("listening on port 3000"))
