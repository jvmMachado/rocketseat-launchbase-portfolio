const express = require('express');
const nunjucks = require('nunjucks');
const videos = require('./data');

const server = express();

server.use(express.static('public'));

server.set('view engine', 'njk');

nunjucks.configure('views', {
  express: server,
  autoescape: false,
  noCache: true
});

server.get('/', (req, res) => {
  return res.render('about');
});

server.get('/portfolio', (req, res) => {
  return res.render('portfolio', { items: videos });
});

server.get('/video', (req, res) => {
  const id = req.query.id;

  const video = videos.find(video => {
    return video.id == id;
  });

  if (!video) {
    return res.send('Video not found!');
  }

  return res.render('video', { item: video });
});

server.listen(3000, () => {
  console.log('Server started and listening on port 3000.');
});
