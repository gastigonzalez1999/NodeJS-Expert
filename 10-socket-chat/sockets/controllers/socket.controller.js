const { Socket } = require('socket.io');
const { isJwtValid } = require('../../helpers/generate-jwt');
const ChatMessages = require('../../models/chat-messages');

const chatMessages =  new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
    const token = socket.handshake.headers['x-token'];
    const user = await isJwtValid(token);

    if (!user) {
        return socket.disconnect();
    }

    chatMessages.addUser(user);
    io.emit('active-users', chatMessages.UsersArr);
    socket.emit('receive-messages', chatMessages.last10);

    socket.join(user.id);

    socket.on('disconnect', () => {
        chatMessages.disconnectUser(user.id);
        io.emit('active-users', chatMessages.UsersArr);
    });

    socket.on('send-message', ({message, uid}) => {
        if (uid) {
            socket.to(uid).emit('private-message', {from: user.name, message: message});
        } else {
            chatMessages.sendMessage(user.id, user.name, message);
            io.emit('receive-messages', chatMessages.last10);
        }
    });
};

module.exports = {
    socketController,
}