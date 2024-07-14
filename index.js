
const express = require('express');
const app = express();

const http = require('http');
const path = require('path');

const socketio = require('socket.io');
const server = http.createServer(app);
const io = socketio(server);

// set engine
app.set('views', './views');
app.set('view engine', 'ejs');
// set static folder
app.use(express.static(path.join(__dirname, 'public')));


// io it means all the users and socket it means individual user
io.on('connection', (socket) => {
    socket.on('send-location', (data) => {
        io.emit('receive-location', { id: socket.id, ...data })
    })

    socket.on("disconnect", () => {
        io.emit('user-disconnected', socket.id)
    })
})

app.get('/', (req, res) => {
    res.render('index');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log('listening on *:3000');
});  