const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Gaston',
    };

    setTimeout( () => {
        callback(usuario);
    }, 1500);
};

getUsuarioById(10, (usuario) => {
    console.log(usuario);
})