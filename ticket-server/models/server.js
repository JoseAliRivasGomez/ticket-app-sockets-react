const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.server = http.createServer(this.app)

        this.io = socketIO(this.server, {cors: {
            origin: "*",
            methods: ["GET", "POST", "PUT", "DELETE"]
          }});

        this.sockets = new Sockets(this.io);
    }

    middlewares(){
        this.app.use(express.static(path.resolve(__dirname, '../public')));
        this.app.use(cors());

        this.app.get('/ultimos', (req, res) => {
            res.json({
                ok: true,
                ultimos: this.sockets.ticketList.ultimos13,
            })
        })
        this.app.get('*', (req, res) => {
            //console.log(__dirname.substring(0, __dirname.length-7));
            res.sendFile( __dirname.substring(0, __dirname.length-7) + '/public/index.html'); //sin /src
        })
    }

    // configurarSockets(){
    //     new Sockets(this.io);
    // }

    execute(){
        this.middlewares();
        //this.configurarSockets();
        this.server.listen(this.port, () => {
            console.log(`Server corriendo en puerto ${this.port}`);
        });
    }

}

module.exports = Server;