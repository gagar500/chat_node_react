var io = require('socket.io');



function createService(server){    
    var messages = [];
    var socket = io(server);
    socket.on('connection',(client)=>{
       
        client.emit('message-from-server',messages);
        client.on('message-from-client',(message) =>{
            console.log(message);
            messages.push(JSON.stringify(message));

            socket.emit('message-from-server',messages);
        });
    });

    
           
    
}

module.exports = {createService:createService};