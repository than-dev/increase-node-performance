// Run it and open two tabs in your browser, in one run the '/' route, at other, get the route '/fast'. Execute the first again and then change fast the tab and execute the route '/fast', you will see that fast not wait the other process finish to execute.


const cluster = require('cluster')

// Is the file being executed in master mode (primary process)?
if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);
    
    // Cause index.js to be executed again but in child mode
    cluster.fork()
    cluster.fork()
    cluster.fork()
    cluster.fork()

//     cluster.on('exit', (worker, code, signal) => {
//     console.log(`worker ${worker.process.pid} died`);
//   });
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

    app.get('/fast', (req, res) => {
        res.send('This was fast!')
    })
    
    app.listen(3000)
}
