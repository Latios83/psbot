# psbot
Create Pokemon Showdown Bots easily.

You must have node installed.

In terminal, run
```
mkdir bot && cd bot && npm install psbot
```

next, open the folder 'bot', and make a new file called 'app.js'

next, in that file, write the following:
```javascript
var ps = require('psbot');

ps.name = 'botname';
pa.pass = 'botpass';
ps.rooms = ['rooms','go','here'];
ps.server = 'sim.smogon.com:8000';
ps.symbol = 'symbolgoeshere';
ps.commands = {
  hello: function(args, room, user) {
    return "Hello " + user.userid() + ".";
  }
}
ps.connect();
```
Then, in terminal, run:
```
node app.js
```
