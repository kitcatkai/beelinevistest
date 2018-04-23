var path = require('path');
var express = require('express');

var app = express();


app.set('port', process.env.PORT || 8080);
app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/app.js');
});


app.listen(app.get('port'), function() {
  console.log('listening on port', app.get(;port) );
});

// console.log('listening to port', process.env.PORT);
// console.log('getting port', app.get('port'));
// app.listen(process.env.PORT || 8080);



