var WebSocket = require('ws');
var request = require('request');

exports.server = '';
exports.symbol = '!';
exports.commands = {};
exports.name = '';
exports.pass = '';
exports.rooms = '';
exports.connect = function() {
  ws = new WebSocket("ws://" + exports.server + "/showdown/websocket");

  ws.on('open', function() {
  });

  ws.on('message', function(data) {
    data = data.replace(/(^>|\n)/, '');
    var msg = data.split('|');
    console.log(data);
    switch(msg[1]) {
      case 'challstr':
        var url = "http://play.pokemonshowdown.com/action.php";
        if (exports.pass === '') {
          var q = {"act": "getassertion", "userid": exports.name, "challengekeyid": msg[2], "challenge": msg[3]}
          request({url: url, qs: q}, function(err, res, body) {
            ws.send("|/trn " + exports.name + ",0," + body);
          });
        } else {
          request.post(url, {form: {"act": "login", name: exports.name, pass: exports.pass,
            "challengekeyid": msg[2], "challenge": msg[3]}}, function(err, res, body) {
              var d = JSON.parse(body.split(']')[1]);
              ws.send("|/trn " + exports.name + ",0," + d.assertion);


          })
        }
        for(var x = 0; x <exports.rooms.length; x++) {
          ws.send("|/join " + exports.rooms[x]);
        }
        break;
      case 'c:':
        var room = msg[0];
        var user = msg[3];
        if (msg[4][0] == exports.symbol) {
          var cmd = msg[4].split(exports.symbol)[1].split(' ')[0];
          var args = msg[4].split(cmd + ' ')[1];
          if (exports.commands[cmd]) {
            if (typeof exports.commands[cmd] === 'function') {
              var m = exports.commands[cmd].call(this, args, room, user);
              ws.send(room + "|" + m);
            }
          }
        }
    }
  });
}