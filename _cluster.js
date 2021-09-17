process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster')
const crypto = require('crypto')

// Is the file being executed in master mode (primary process)?
if (cluster.isPrimary) {
    const numCPUs = cpus().length;

    console.log(`Primary ${process.pid} is running`);
    
    for (let i = 0; i < numCPUs; i++) {
        // Cause index.js to be executed again but in child mode
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
} else {
    //I'm a child, I'm going to act like a server and nothing else
    const express = require('express');
    const app = express();
    
    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there')
        })
    })

    app.get('/fast', (req, res) => {
        res.send('This was fast!')
    })
    
    app.listen(3000)
}
