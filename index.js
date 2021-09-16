const cluster = require('cluster')

// Is the file being executed in master mode (primary process)?
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    
    // Cause index.js to be executed again but in child mode
    cluster.fork()

    cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
    //I'm a child, I'm going to act like a server and nothing else
    const express = require('express');
    const app = express();
    
    function doWork(duration) {
        const start = Date.now()
        while (Date.now() - start < duration) {}
    }
    
    app.get('/', (req, res) => {
        doWork(5000)
        res.send('Hi there')
    })
    
    app.listen(3000)
}
