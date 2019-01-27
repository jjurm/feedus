$(document).ready(function(){
    var socket = io.connect('https://' + document.domain + ':' + location.port + '/ws');
    socket.on('connect', function(msg) {
        console.log("socket connected!")
    });
    socket.on('menus', function (json){

    })
});