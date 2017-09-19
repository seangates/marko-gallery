require('marko/node-require');

let path = require('path');
let express = require('express');
let markoExpress = require('marko/express');
let template = require('./src/pages/home');
let port = process.env.PORT || 8080;

let isProduction = process.env.NODE_ENV === 'production';

let app = express();

require('lasso').configure({
  plugins: [
    'lasso-marko',
    'lasso-less',
    'lasso-autoprefixer',
    'lasso-require'
  ],
  outputDir: __dirname + '/static',
  bundlingEnabled: isProduction,
  minify: isProduction,
  fingerprintsEnabled: isProduction
});

app.use(markoExpress());

app.use('/public', express.static(path.join(__dirname, '/public')));

app.use(require('lasso/middleware').serveStatic());

app.get('/', (req, res) => {
  res.marko(template);
});

app.listen(port, () => {
  console.log('online');
});
