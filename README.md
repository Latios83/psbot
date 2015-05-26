# psbot
Create Pokemon Showdown Bots easily.

You must have node installed.

In terminal, run
```
mkdir bot && npm install psbot
```

next, open the folder 'bot', and make a new file called 'app.js'

next, in that file, write the following: 
```javascript
var ps = require('psbot');

ps.name = 'botname';
pa.pass = 'botpass';
ps.server = 'sim.smogon.com:8000';
ps.symbol = 'symbolgoeshere';
ps.exceptions = ['yourusername'];
ps.commands = {
  hello: function(args, room, user) {
    return "Hello World.";
  }
}
ps.connect();
```
