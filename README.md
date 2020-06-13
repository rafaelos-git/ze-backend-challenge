# Ze Delivery Backend Code Challenge

This project is a NodeJS REST API developed to the Ze Delivery position backend code challenge.

## Getting Startted
Follow this instructions to get a copy of this project in your local env to develop and test.

###  Tools
To run the project you will need:
- [NodeJS](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)

### Installing Dependencies
Clone this repo:
```sh
git clone https://github.com/angelobzsouza/ze-backend-challenge.git
cd ze-backend-challenge
```

You can use npm to this task, but it is recommended to use [Yarn](https://yarnpkg.com/). To install it:
```sh
npm install -g yarn
```

Then, install projects dependencies:
```
yarn
```

### Environment
Create a .env file and set your local environment variables:
```sh
cp .env-example .env
```
Note that if your local MongoDB instance is not waiting for auth, the .env file must to be like this:
```sh
PORT=<app_port>
DB_URL='mongodb://localhost:27017/<db_name>'
```

### Database
To seed database:
```sh
yarn database:seed
```

### Test
You can integrations tests using
```sh
yarn test
```
or with coverage
```sh
yarn test:coverage
```

## Running
After config, to run application:
```sh
yarn start
```

### Routes
You can access the API by the following routes:
| Method | Route | Description |
| --- | --- | --- |
| GET | /health | Return a status code 200 and a message saying that API is running |
| GET | /docs | Show a complete API documentation using [Swagger UI Express](https://www.npmjs.com/package/swagger-ui-express). You can test routes from here.  |
| GET | /v1/pdvs/:id | Get a specific pdv by its id |
| GET | /v1/pdvs/nearest/:lng/:lat | Get nearest pdv passing a specific location (lng, lat) considering pdvs' coverage areas |
| POST | /v1/pdvs | Insert a new pdv in database |
