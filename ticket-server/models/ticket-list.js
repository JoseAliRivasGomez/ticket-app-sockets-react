const Ticket = require("./ticket");


class TicketList {

    constructor(name){
        this.ultimoNumero = 0;
        this.pendientes = [];
        this.asignados = [];
    }

    get siguienteNumero() {
        if(this.ultimoNumero<99){
            this.ultimoNumero++;
        }else{
            this.ultimoNumero = 1;
        }
        return this.ultimoNumero;
    }

    get ultimos13() {
        return this.asignados.slice(0,13);
    }

    creatTicket(){
        const nuevoTicket = new Ticket(this.siguienteNumero);
        this.pendientes.push(nuevoTicket)
        return nuevoTicket;
    }

    asignarTicket(agente, escritorio){
        if(this.pendientes.length === 0){
            return;
        }
        const siguienteTicket = this.pendientes.shift();
        siguienteTicket.agente = agente;
        siguienteTicket.escritorio = escritorio;

        this.asignados.unshift(siguienteTicket);
        return siguienteTicket;
    }

}

module.exports = TicketList;