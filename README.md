<p align="center">
  <a href="" rel="noopener">
 <img src="https://www.luby.com.br/wp-content/uploads/2020/11/nodejs-luby.png" alt="Project logo"></a>
</p>

<h3 align="center">NodeJS Enhance Performance
<div align="center">
<br>

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

<br>

## Two different ways to do it

- (Recommended) Node 'Cluster' mode
- (Experimental) Worker Threads
  
<br>
<hr>
<br>

## Start

First we need to understand the default application flux, that is:

```
Request ----> Node Server ----> Response
```

It causes a block in all the event loop, this way, in request process much longs, we can lose performance and get worse the user experience.

<br>
<hr>
<br>

## Cluster Module

The clustering process creates and manages some nodejs event loop instances, winning this way mor threads to execute our code, action that will increase our speed. This instances are monitored by the Cluster Manager

Follows a visual representation:

<div align="center">
<img src="https://miro.medium.com/max/412/1*1dzWfKzhph6oFhPjqj6x2g.png">
</div>

<br>

This basically call a lot of times the server index file, in the first execution, it creates the Cluster Manager and then it will create some new workers instances (child process). The command to create children process: 

```
cluster.fork()
```

<br>

Command to verify if the process is the primary(first execution):

```
cluster.isPrimary(): Boolean
```

<br>
<hr>
<br>

### Benefits
Using it you can break your server flux in most pieces, this way you will process more then one request at a time.

<br>


### Disadvantages and Not Usecases
If we increase the number of children process, will arrive a moment that our performance will decrease, because all machines have a limit of processing, because it, is recommendable we use this logic:

```
const numCPUs = cpus().length;

 for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
}
```

<br>

### Conclusion
To use this feature we need to be wary before, you can fill free to do your tests and benchmarks using the file _cluster.js as base. Prefer to use it when you need big processing in the request.

<br>
<hr>
<br>

## Worker Threads
Just use it if you have a big business logic that can take much time.

Our app communicate with the webworker through this flux:

Our app postMessage, and the webWorker stay listening an event 'onMessage', like the nodejs Event Emitter. <br>
The applied example in the file _workers-threads.js is at nodejs documentation, see it to more details.

<br>
<hr>
<br>

## Author: Nathan Cotrim - MIT License
