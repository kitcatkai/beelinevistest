var path = require('path');
var express = require('express');

var app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.set('port', process.env.PORT || 8080);

app.listen(app.get('port'), function() {
  console.log('listening on port');
});

// console.log('listening to port', process.env.PORT);
// console.log('getting port', app.get('port'));
// app.listen(process.env.PORT || 8080);



