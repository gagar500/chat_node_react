var express = require('express');
var app = express();
var port =3001;
var server = require('http').Server(app);
var messageService = require('./service/message.control');

app.use(express.static('client/build'));

server.listen(port,function(){
    messageService.createService(server)
    console.log('Listening on port ' + port);
});