package main

import (
	"fmt"
	"net/http"
	"strconv"
	"time"
)

// I DO NOT EVEN HAVE TO START A GO ROUTINE... EVEN IF IT USES 100% OF ONE CPU IT DOES NOT BLOCK THE EXECUTION
// IT ALSO TWICE AS FAST AS THE NODE ONE, SINGLE THREAD OR SPAWNING A NEW PROCESS
func main() {

	http.HandleFunc("/fibonacci", func(w http.ResponseWriter, r *http.Request) {
		startTime := time.Now()
		numberString := r.URL.Query().Get("number")
		number, _ := strconv.Atoi(numberString)
		result := fibonacci(number)
		answes := strconv.Itoa(result)
		fmt.Println(answes)
		elapsed := time.Since(startTime)
		elapsedMs := elapsed.Milliseconds()
		str := strconv.FormatInt(elapsedMs, 10) // Convert to decimal
		fmt.Fprintf(w, str)
	})


	http.HandleFunc("/test", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Request not blocked")
	})

	http.ListenAndServe(":3000", nil)
}

func fibonacci(n int) int {
	if n <= 1 {
		return 1
	}

	return fibonacci(n-1) + fibonacci(n-2)
}

/* const express = require("express")
const app = express()

app.get("/getfibonacci", (req, res) => {
  const startTime = new Date()
  const result = fibonacci(parseInt(req.query.number))
  const endTime = new Date()
  res.json({
    number: parseInt(req.query.number),
    fibonacci: result,
    time: endTime.getTime() - startTime.getTime() + "ms",
  })
})

app.get("/testrequest", (req, res) => {
  res.send("I am unblocked now")
})

const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

app.listen(3000, () => console.log("listening on port 3000")) */
