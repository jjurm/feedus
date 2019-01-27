$(document).ready(function(){
    var socket = io.connect('http://' + document.domain + ':' + location.port + '/ws');
    socket.on('connect', function(msg) {
        console.log("socket connected!")
    });
});