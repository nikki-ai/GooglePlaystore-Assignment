const express = require('express');
const app = express();
const morgan = require('morgan');
const apps = require('./Playstore.js');

app.use(morgan('common'));

app.get('/', (req, res) => {
  res.send('Google Playstore assignment');
});

app.get('/apps', (req, res) => {
  const { sort, genres } = req.query;

  if (sort) {
    if (!['rating', 'app'].includes(sort.toLowerCase())) {
      return res.status(400).send('Sort must be by rating or app-name');
    }
  }

  if (genres) {
    if (
      !['puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(
        genres.toLowerCase()
      )
    ) {
      return res
        .status(400)
        .send(
          'Genre must be one of Action, Puzzle, Strategy, Casual, Arcade, Card'
        );
    }
  }
  let results = [...apps];

  if (genres){
    results = apps.filter((apps) => apps.Genres.toLowerCase().includes(genres.toLowerCase()));
  }

  if (sort && sort.includes('app')) {

    results.sort((a, b) => {
      return a['App'] > b['App'] ? 1 : a['App'] < b['App'] ? -1 : 0;
    });
    
  }

  if (sort && sort.includes('rating')) {

    results.sort((a, b) => {
      return a['Rating'] > b['Rating'] ? -1 : a['Rating'] < b['Rating'] ? 1 : 0;
    });
    
  }

  res.json(results);
});

module.exports = app;
