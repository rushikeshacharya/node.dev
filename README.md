# node.dev

- Node RELP - (Read Evaluate Print Loop)
- window object given by brower object not by V8 engine
- global object is given by Node js not V8 
  - setTimeout
  - setInterval
- window | this | self | frames | globalThis -> all points to window object

- CommonJS Module
  - module.exports
  - require
  - modules will be loaded Sync 
  - runs in not strict mode
- ES Module
  - exports 
  - import
  - modules wil be loaded Async way
  - strict mode
34

# Event Loop
- allows Node.js to perform non-blocking I/O operations — despite the fact that a single JavaScript thread is used by default — by offloading operations to the system kernel whenever possible.

- When Node.js starts, it initializes the event loop
- Phases of Event Loop
  - Timers
    - executes callbacks scheduled by 
      - setTimeout
      - setInterval
  - Pending Callbacks
    - executes I/O callbacks deferred to the next loop iteration.
    -  executes callbacks for some system operations such as types of TCP errors
    -  eg `ECONNREFUSED` TCP error
  - idle, prepare
    - used internally
  - Poll
    - Incoming connections, data, fs, crypto, http
    - If the poll queue is not empty, the event loop will iterate through its queue of callbacks executing them synchronously until either the queue has been exhausted, or the system-dependent hard limit is reached.
    - If the poll queue is empty
      - If there is `setImmediate()` available, the event loop will end the poll phase and continue to the check phase to execute those scheduled scripts.
      - If there is no `setImmediate()` loop will wait for callbacks to be added to queue, then execue them immediately.
    - Once the poll queue is empty the event loop will check for timers whose time thresholds have been reached
  - Check
    - setImmediate() callbacks are invoked.
  - Close Callbacks
    - socket.on('close')

- `setImmediate()` is designed to execute a script once the current poll phase completes.

- `setTimeout()` schedules a script to be run after a minimum threshold in ms has elapsed

- Each Phase has its own FIFO queue of callbacks.
- when loop enters a given phase, it will perform any operations specific to that phase, then executes callbacks in hat phases queue unitll hte queue has been exhaused or max no of callbacks exhaused
- Between each run of the event loop, Node.js checks if it is waiting for any asynchronous I/O or timers and shuts down cleanly if there are not any.

