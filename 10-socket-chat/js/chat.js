let user = null;
let socket = null;
const url = 'http://localhost:8080/api/auth/';

const txtUid = document.querySelector('#txtUid');
const txtMessage = document.querySelector('#txtMessage');
const ulUsers = document.querySelector('#ulUsers');
const ulMessages = document.querySelector('#ulMessages');
const btnLogOut = document.querySelector('#btnLogOut');

const validateJWT = async () => {
    const token = localStorage.getItem('token') || '';

    if (token.length < 10) {
        window.location = 'index.html';
        throw new Error('There is no token in the server')
    }

    const res =  await fetch(url, {
        method: 'POST',
        headers: {
            'x-token': token,
        },
    });

    const {user: userDb, token: tokenDb} = await res.json();
    localStorage.setItem('token', tokenDb);
    user = userDb;
    document.title = user.name;

    await connectSocket();
};

const connectSocket = async () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token'),
        },
    });

    socket.on('connect', () => {
        console.log('connected');
    });

    socket.on('disconnect', () => {
        console.log('disconnected');
    });

    socket.emit('receive-messages', drawMessages);

    socket.emit('active-users', drawUsers);

    socket.emit('private-message', (payload) => {
        console.log('Private:', payload);
    });
};

const drawUsers = (users = []) => {
    let usersHtml = '';

    users.forEach(({name, uid}) => {
        usersHtml += `
            <li>
                <p>
                    <h5 class="text-success">${name}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `
    });

    ulUsers.innerHTML = usersHtml;
};

const drawMessages = (messages = []) => {
    let messagesHtml = '';

    messages.forEach(({name, message}) => {
        messagesHtml += `
            <li>
                <p>
                    <span class="text-primary">${name}:</span>
                    <span>${message}</span>
                </p>
            </li>
        `
    });

    ulMessages.innerHTML = messagesHtml;
};

txtMessage.addEventListener('keyup', ({keyCode}) => {
    const message = txtMessage.value;
    const uid = txtUid.value;

    if (keyCode !== 13) {
        return;
    }

    if (message.length === 0) {
        return;
    }

    socket.emit('send-message', {message, uid});

    txtMessage.value = '';

});

const main = async () => {
    await validateJWT();
};

main();