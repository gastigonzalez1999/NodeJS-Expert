const TicketControl = require('../models/ticket-control');
const ticketControl = new TicketControl();
const ticket = new Ticket();


const socketController = (socket) => {

    socket.emit('last-ticket', ticketControl.last);
    socket.broadcast.emit('current-state', ticketControl.last4);
    socket.emit('pending-tickets', ticketControl.tickets.length);

    socket.on('next-ticket', ( payload, callback ) => {
        const next = ticketControl.next();
        callback(next);

    });

    socket.on('attend-ticket', ({desk}, callback) => {
        if (!desk) {
            return callback({
                ok: false,
                msg: 'Desk is requried'
            });
        }
        const ticket = ticketControl.attendTicket(desk);

        socket.broadcast.emit('current-state', ticketControl.last4);
        socket.emit('pending-tickets', ticketControl.tickets.length);
        socket.broadcast.emit('pending-tickets', ticketControl.tickets.length);

        if (!ticket) {
            return callback({
                ok: false,
                msg: 'There are no more tickets'
            });
        } else {
            callback({
                ok: true,
                ticket,
            });
        }
    });

}

module.exports = {
    socketController
}

