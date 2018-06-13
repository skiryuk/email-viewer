const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || '8080';
app.set('port', port);

app.use(express.static(__dirname + '/dist'));

app.get('/[^\.]+$', function(req, res) {
  res.set('Content-Type', 'text/html')
    .sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(app.get('port'), function() {
  console.log("Listening on port " + app.get('port'));
})
