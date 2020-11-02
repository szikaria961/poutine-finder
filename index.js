const { writeFileSync } = require('fs');
const axios = require('axios');
const express = require('express');
const { data: poutineLocations } = require('./data.json');
const { buildQuery } = require('./helpers');

const PORT = process.env.PORT || 8000;
const PLACES_API_INPUT = "poutine places in Toronto";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(__dirname + '/public'));

app.listen(PORT, () => {
  console.log(`[ index.js ] Listening on port ${PORT}`);
});

app.get('/api/places', (req, res, next) => {
  try {
    const data = poutineLocations.map(({ name, formatted_address: address }) => {
      return {
        name,
        address
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
