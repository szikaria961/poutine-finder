# Poutine Finder

A small webapp that helps find poutine places near you.

![Toronto Poutine Finder](https://raw.githubusercontent.com/szikaria961/poutine-finder/main/preview.png)

Live preview is available [here](http://poutine-finder.herokuapp.com).

## Development

### API Access
- Go to Google Cloud Platform to generate an API Key for places API.

### Installation

```
git clone https://github.com/szikaria961/poutine-finder.git
cd poutine-finder
npm install
cp .example-env .env
```

Open the `.env` file in your text editor of choice and fill in the `API_KEY` value with the token generated from their website.

### Server

```
npm run dev
```

View development app at `http://localhost:8000`

## Deployment

### Cloud (Heroku)

_* Make sure you have [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed, have created a heroku app and are logged in to the cli._

```
heroku config:set API_KEY=[enter your access token]
npm run deploy
```

## License

[MIT](https://choosealicense.com/licenses/mit/)