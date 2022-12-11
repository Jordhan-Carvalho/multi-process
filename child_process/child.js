process.on("message", message => {
  //child process is listening for messages by the parent process
  const result = fibonacci(message.number)
  process.send(result)
  process.exit() // make sure to use exit() to prevent orphaned processes
})

const fibonacci = n => {
  if (n <= 1) {
    return 1
  }

  return fibonacci(n - 1) + fibonacci(n - 2)
}

