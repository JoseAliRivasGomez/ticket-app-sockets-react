const TicketList = require("./ticket-list");



class Sockets {

    constructor(io){
        this.io = io;

        this.ticketList = new TicketList();

        this.socketEvents();
    }

    socketEvents(){

        this.io.on('connection', (socket) => { 

            console.log('Cliente conectado');

            socket.on('solicitar-ticket', (data, callback) => {
                const nuevoTicket = this.ticketList.creatTicket();
                callback(nuevoTicket);
            });

            socket.on('next-ticket', ({agente, escritorio}, callback) => {
                const suTicket = this.ticketList.asignarTicket(agente, escritorio);
                callback(suTicket);

                this.io.emit('ticket-asignado', this.ticketList.ultimos13); //Getter no lleva parentesis
            });
        
            //console.log('Dispositivo cliente conectado');
            //console.log(socket.id);
        
            // socket.emit('mensaje-bienvenida', {
            //     msg: 'Bienvenido al servidor',
            //     fecha: new Date(),
            // });
        
            // socket.on('mensaje-cliente', (data) => {
            //     console.log(data);
            // });
        
        
        
        });

    }

}

module.exports = Sockets;