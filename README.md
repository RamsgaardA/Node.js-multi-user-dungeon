Node.js Multi-User Dungeon
==================

What's that?
------------
Just as the title says, a MUD with a backend in Node.js
http://en.wikipedia.org/wiki/MUD


Future:
------
Actual content


Setting up the server
----------

* Install Node.js
* Install redis-server ( 'apt-get install redis-server' on linux, windows: https://github.com/dmajkic/redis/downloads )
* Fetch this repo
* run 'npm install' in the directory
* Run redis-server (This stores some key-value pairs needed for the server to function)
* Open server.js with Node.js
* go to localhost:3700 and see if it works
* shut down the server, go to public/main.js and change the line var socket = io.connect('http://localhost:3700'); to var socket = io.connect('[your IP]:3700');
* Start the server again
* Done
