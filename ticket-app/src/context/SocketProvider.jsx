import { useEffect, useState } from "react"
import { getEnvVariables } from "../helpers/getEnvVariables";
import { useSocket } from "../hooks/useSocket";
import { SocketContext } from "./SocketContext"

const {VITE_API_URL} = getEnvVariables();

export const SocketProvider = ({children}) => {

    const {socket, online} = useSocket(VITE_API_URL);
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        socket.on('ticket-asignado', (ultimos13) => {
            setTickets(ultimos13);
        })
        return () => {
            socket.off('ticket-asignado');
        }
    }, [socket])
      
    const nuevoTicket = () => {

        return new Promise((resolve, reject) => {
            socket.emit('solicitar-ticket', null, (ticket) => {
                //console.log(ticket);
                resolve(ticket);
            });
        });

    }
  
    const nextTicket = (user) => {

        return new Promise((resolve, reject) => {
            socket.emit('next-ticket', user, (ticket) => {
                //console.log(ticket);
                resolve(ticket);
            });
        });

    }

    return (
        <SocketContext.Provider value={{
            socket, 
            online,
            nuevoTicket,
            nextTicket,
            tickets,
            setTickets,
        }}>
            {children}
        </SocketContext.Provider>
    )
}
