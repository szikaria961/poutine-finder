const { writeFileSync } = require('fs');
const _ = require('lodash');
const axios = require('axios');
const express = require('express');
const { data: poutineLocations } = require('./data.json');
const { buildQuery } = require('./helpers');
require('dotenv').config();

const PORT = process.env.PORT || 8000;
const API_KEY = process.env.API_KEY;
const PLACES_API_INPUT = "poutine places in Ajax";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/static'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

app.get('/', (req, res) => {
  res.render('index.html', { API_KEY })
});

app.get('/api/places', (req, res, next) => {
  try {
    const data = poutineLocations.map(({ name, formatted_address: address, geometry, price_level: priceLevel, rating, place_id: placeId}) => {
      return {
        name,
        address,
        geometry,
        priceLevel,
        rating,
        placeId
      };
    });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/places-from-resource', async (req, res, next) => {
  try {
    const { data } = await axios.get(buildQuery({
      input: PLACES_API_INPUT
    }));
    res.json(data);
  } catch (err) {
    next(err);
  }
});

app.get('/api/places/:name', (req, res, next) => {
  const { name } = req.params;

  try {
    const data = _.find(poutineLocations, { name });

    res.json([data.name, data.formatted_address]);
  } catch (err) {
    next(err);
  }
});
