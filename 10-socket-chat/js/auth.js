const myForm = document.querySelector('form');
const url = 'http://localhost:8080/api/auth/';

myForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = {};

    for (let elem of myForm.elements) {
        if (elem.name.length > 0) {
            formData[elem.name] = elem.value;
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(formData),
   })
    .then(res => res.json())
    .then(({ msg, token }) => {
        if (msg) {
            return console.error(msg);
        }

        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch(console.warn)

    
});

function handleCredentialResponse(response) {
    // Google Token: ID_TOKEN
   //console.log('id_token', response.credential);
   const body = { id_token: response.credential };
   
   fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(body),
   })
    .then(res => res.json())
    .then(res => {
        localStorage.setItem('email', res.user.email),
        localStorage.setItem('token', res.token),
        console.log(res);
    })
    .catch(console.warn);
}

const button = document.getElementById('google_singout');
button.onclick = () => {
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect()

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    });
}