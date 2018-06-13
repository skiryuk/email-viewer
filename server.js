const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('/email-viewer/dist'));

app.get('/*', function(req,res) {
  res.sendFile('/email-viewer/dist/index.html');
});
app.listen(process.env.PORT || 8080);
