const express = require('express');
const secure = require('express-force-https');
const compression = require('compression');

// Express server
const app = express();

// add secure
app.use(secure);

// add compression
app.use(compression());

app.use(express.static('./dist/case-manager-front'));

app.get('/backend', (req, res) => {
  res.json({url: process.env.API_URL})
});

app.get('/*', function(req, res) {
  res.sendFile('index.html', {root: 'dist/case-manager-front/'}
  );
});

app.listen(process.env.PORT || 8080);
