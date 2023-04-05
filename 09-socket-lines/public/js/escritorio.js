const lblDesk =  document.querySelector('h1');
const btnAttend = document.querySelector('button');
const lblTicket = document.querySelector('small');
const divAlert = document.querySelector('.alert');
const lblPendientes = document.querySelector('#lblPendientes');


const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('desk')) {
    window.location = 'index.html';
    throw new Error ('Desk is required');
}

const desk = searchParams.get('desk');
lblDesk.innerText = desk;

divAlert.style.display = none;

const socket = io();

socket.on('connect', () => {
    // console.log('Conectado');
    btnAttend.disabled = false;

});

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAttend.disabled = true;
});

socket.on('pending-tickets', (pending) => {
    if (pending === 0) {
        lblPendientes.style.display = 'none';
    } else {
        lblPendientes.style.display = '';
        lblPendientes.innerText = pending;
    }
});

btnAttend.addEventListener( 'click', () => {
    socket.emit('attend-ticket', {desk}, ({ok, ticket}) => {
        if (!ok) {
            return divAlert.style.display = '';
        }

        lblTicket.innerText = 'Ticket' + ticket.number;
    });
    
    // socket.emit('next-ticket', null, ( ticket ) => {
    //     lblNuevoTicket.innerText = ticket;
    //     console.log('Desde el server', ticket );
    // });

});