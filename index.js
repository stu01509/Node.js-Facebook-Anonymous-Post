//  Loading Modules
const express = require('express');
const bodyParser = require('body-parser');

//  Express Setting
const app = express();
const port = process.env.PORT || '3000';
app.set('view engine', 'ejs');
const routes = require('./routes');

//  Http urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

// Loading JS CSS Plugins
app.use(express.static(__dirname.concat('/public')));

app.get('/', routes.index);
app.get('/submitted', routes.submitted);
app.get('/bye', routes.bye);
app.post('/submit', routes.submit);

app.listen(port, () => {
  console.log('\x1b[44m', `Express Server is running at ${port}`);
});
