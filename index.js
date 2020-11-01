const { writeFileSync } = require('fs');
const axios = require('axios');
const { data: poutineLocations } = require('./export.json');

const API_KEY = process.env.API_KEY;
const API_BASE = 'https://maps.googleapis.com/maps/api/place/textsearch/';
const EXPORT_PATH = "export.json";

const buildQuery = ({
  format = 'json',
  input,
  inputType = 'textquery',
  fields = 'formatted_address,name'
}) => {
  return `${API_BASE}${format}?input=${encodeURI(input)}&inputtype=${inputType}&fields=${fields}&key=${API_KEY}`;
}

async function main() {
  try {
    const { data } = await axios.get(buildQuery({
      input: 'Poutine places in toronto'
    }));
    writeFileSync(EXPORT_PATH, JSON.stringify(data));
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

main();
