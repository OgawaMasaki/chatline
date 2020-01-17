var express = require('express');
var path = require('path');
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 7000;

app.get('/' , function(req, res){
    res.sendFile(__dirname+'/index.html');
});
//情的ファイルを読み込めるようにする
app.use(express.static(path.join(__dirname, 'public')));

//クライアントへメッセージを送る
io.on('connection',function(socket){
    socket.on('message',function(msg){
        console.log('message: ' + msg);
        io.emit('message', msg);
    });
});

http.listen(PORT, function(){
    console.log('server listening. Port:' + PORT);
});