//handshaking part

import {WebSocketServer,WebSocket} from 'ws';

const wss = new WebSocketServer({ port: 8080 });

//connection part fires afetr handshaking is done
// 0=open
// 1=connected
// 2=closing
// 3=closed
wss.on('connection',(socket,req)=>{
    const ip = req.socket.remoteAddress;

    socket.on('message',(e)=>{  //incoming message
        const msg = e.toString();
        console.log(`${ip} : ${msg}`);
        wss.clients.forEach(client=>{
            if(client.readyState === WebSocket.OPEN){
                client.send(`server broadcast : ${msg}`);
            }

        });
    });

    socket.on('close',(error)=>{
        console.log(`${ip} , ${error}`);
    })
    socket.on('close',()=>{
        console.log(`${ip} , closed`);
    })
}
)
