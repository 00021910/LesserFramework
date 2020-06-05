const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');

const app = express();
const config = require('../webpack.config.babel.js');
const compiler = webpack(config);

const { msgString } = require("./UTILS/CoreHelper")

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
}));

let craps = [
  {
    id: 1,
    content: "First crap ever"
  }
];

app.get('/',  (req, res) => {
  res.send(`Hello world! It's LE(M)N stack!`);
});

app.get("/craps", (req, res) => {
  res.send(`Welcome to the crap-pages!`)
});

app.get("/craps/:id", (req, res) => {
  let crap = craps.find(sh => sh.id === parseInt(req.params.id));
  if(!crap) res.status(404).send(`crap which you looking for IS NOT HERE YET, Motherfucker!`);
  else res.send(`${crap.content} <hr /> (That is the realest crap content, isn't it?)`);
});

app.post("/craps/add/:crapname", (req, res) => {
  craps[craps.length] = req.params.crapname;
  res.send(`We tried to add yo crap to the database (actually it's not database, just an array),
            go check it out by that link: <a href="craps/{craps[craps.length]}">link..?</a>`)
})

app.listen(5476, function () {
  console.log('App is listening on port:5476. Go through localhost:5476!');
  console.log("Helper Script Import: ");
  console.log(msgString);
});

