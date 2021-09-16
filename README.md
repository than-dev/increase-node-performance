## Improving NodeJS Performance
<hr>
<br>

### Two different ways to do it

- (Recommended) Node 'Cluster' mode
- (Experimental) Worker Threads
  
<br>

### Start

First we need to understand the default application flux, that is:

( All in a Single-Thread ) <br>
Request ----> Node Server -----> Response

It causes a block in all the event loop, this way, in request process much longs, we can lose performance and get worse the user experience.

<br>

### Cluster Module

The clustering process creates and manages some nodejs event loop instances, winning this way mor threads to execute our code, action that will increase our speed. This instances are monitored by the Cluster Manager

Follows a visual representation:

<div align="center">
<img src="https://miro.medium.com/max/412/1*1dzWfKzhph6oFhPjqj6x2g.png">
</div>

<br>

this basically call a lot of times the server index file, in the first execution, it creates the Cluster Manager and then it will create some new workers instances.