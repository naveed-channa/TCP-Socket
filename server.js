var net = require('net');
var carrier = require('carrier');

// creates the server
var server = net.createServer(function(conn) {});

//emitted when server closes ...not emitted until all connections closes.
server.on('close',function(){
  console.log('Server closed !');
});

// emitted when new client connects
server.on('connection',function(socket){

  socket.setNoDelay(true);
  

//this property shows the number of characters currently buffered to be written. (Number of characters is approximately equal to the number of bytes to be written, but the buffer may contain strings, and the strings are lazily encoded, so the exact number of bytes is not known.)
//Users who experience large or growing bufferSize should attempt to "throttle" the data flows in their program with pause() and resume().

  console.log('Buffer size : ' + socket.bufferSize);

  console.log('---------server details -----------------');

  var address = server.address();
  var port = address.port;
  var family = address.family;
  var ipaddr = address.address;
  console.log('Server is listening at port' + port);
  console.log('Server ip :' + ipaddr);
  console.log('Server is IP4/IP6 : ' + family);

  var lport = socket.localPort;
  var laddr = socket.localAddress;
  console.log('Server is listening at LOCAL port' + lport);
  console.log('Server LOCAL ip :' + laddr);

  console.log('------------remote client info --------------');

  var rport = socket.remotePort;
  var raddr = socket.remoteAddress;
  var rfamily = socket.remoteFamily;

  console.log('REMOTE Socket is listening at port' + rport);
  console.log('REMOTE Socket ip :' + raddr);
  console.log('REMOTE Socket is IP4/IP6 : ' + rfamily);

  console.log('--------------------------------------------')
//var no_of_connections =  server.getConnections(); // sychronous version
server.getConnections(function(error,count){
  console.log('Number of concurrent connections to the server : ' + count);
});

socket.setEncoding('utf8');

socket.setTimeout(800000,function(){
  // called after timeout -> same as socket.on('timeout')
  // it just tells that soket timed out => its ur job to end or destroy the socket.
  // socket.end() vs socket.destroy() => end allows us to send final data and allows some i/o activity to finish before destroying the socket
  // whereas destroy kills the socket immediately irrespective of whether any i/o operation is goin on or not...force destry takes place
  console.log('Socket timed out');
});


socket.on('data',async function(data){
  var bread = socket.bytesRead;
  var bwrite = socket.bytesWritten;
  console.log('Bytes read : ' + bread);
  console.log('Bytes written : ' + bwrite);
  console.log('Data sent to server : ' + data);
  var my_carrier = carrier.carry(socket);
  my_carrier.on('line',  function(line) {
    console.log('got one line: ' + line);
  });
  if(data){
    data = data.replace("/r/n" , '');
    data = data.replace('\r\n' , '');
    let isValidJSN =await IsJsonString(data);
    let str = data.slice(0, -4);
    let Rout = require('./router/router');
    await Rout.Action(JSON.parse(str) , socket);
  }
});

socket.on('drain',function(){
  console.log('write buffer is empty now .. u can resume the writable stream');
  socket.resume();
});

socket.on('error',function(error){
  console.log('Error : ' + error);
});

socket.on('timeout',function(){
  console.log('Socket timed out !');
  socket.end('Timed out!');
  // can call socket.destroy() here too.
});

socket.on('end',function(data){
  console.log('Socket ended from other end!');
  console.log('End data : ' + data);
});

socket.on('close',function(error){
  var bread = socket.bytesRead;
  var bwrite = socket.bytesWritten;
  console.log('Bytes read : ' + bread);
  console.log('Bytes written : ' + bwrite);
  console.log('Socket closed!');
  if(error){
    console.log('Socket was closed coz of transmission error');
  }
}); 

setTimeout(function(){
  var isdestroyed = socket.destroyed;
  console.log('Socket destroyed:' + isdestroyed);
  socket.destroy();
},1200000);

});

// emits when any error occurs -> calls closed event immediately after this.
server.on('error',function(error){
  console.log('Error: ' + error);
});

//emits when server is bound with server.listen
server.on('listening',function(){
  console.log('Server is listening 1236!');
});

server.maxConnections = 10;

//static port allocation
server.listen(1236);


async function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
