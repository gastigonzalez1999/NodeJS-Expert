const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMessgae = document.querySelector('#txtMessgae');
const btnSend = document.querySelector('#btnSend');


const socket = io();

socket.on('connect', () => {
    console.log('Connected');

    lblOffline.style.display = 'none';
    lblOnline.style.display = '';
});

socket.on('disconnect', () => {
    console.log('Disconnected');

    lblOnline.style.display = 'none';
    lblOffline.style.display = '';
});

socket.on('send-message', (payload) => {
    console.log(payload);
});

btnSend.addEventListener('click', () => {
    const message = txtMessgae.value;
    const payload = {
        message,
        date: new Date().getTime(),
    };

    socket.emit('send-message', payload);
});