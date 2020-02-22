const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('./webpack.config.babel.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

let shits = [
  {
    id: 1,
    content: "First shit ever"
  }
];

app.get('/',  (req, res) => {
  res.send(`Hello world! It's LEMN stack!`);
});

app.get("/shits", (req, res) => {
  res.send(`Welcome to the shit-pages!`)
});

app.get("/shits/:id", (req, res) => {
  let shit = shits.find(sh => sh.id === parseInt(req.params.id));
  if(!shit) res.status(404).send(`Shit which you looking for IS NOT HERE YET, Motherfucker!`);
  else res.send(`${shit.content} <hr /> (That is the realest shit content, isn't it?)`);
});

app.listen(5476, function () {
  console.log('App is listening on port:5476. Go through localhost:5476!');
});

