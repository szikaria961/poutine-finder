const API_BASE = 'https://maps.googleapis.com/maps/api/place/textsearch/';
const API_KEY = process.env.API_KEY;

const buildQuery = ({
  format = 'json',
  input,
  inputType = 'textquery',
  fields = 'formatted_address,name'
}) => {
  return `${API_BASE}${format}?input=${encodeURI(input)}&inputtype=${inputType}&fields=${fields}&key=${API_KEY}`;
}

module.exports = {
  buildQuery
}