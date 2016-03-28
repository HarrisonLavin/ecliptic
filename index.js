var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var playerNum= 0;

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  playerNum++;
  console.log('A player has connected');
  socket.on('disconnect', function(){
    playerNum--;
    console.log('A player disconnected');
  });
});

// io.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//     console.log('message: ' + msg);
//   });
// });

//game command
io.on('connection', function(socket){
  socket.on('command', function(msg){
    parseCommand(msg);
    console.log('command: ' + msg);
  });
});
//chat message
io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
    console.log('message: ' + msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});



function parseCommand(instr){
  // Commands:
  // -Start Game

}