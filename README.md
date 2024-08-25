# Welcome to Flights Service

## Project Setup

- Clone the project on your local

- Execute `npm install` on the same path as of your root directory of teh downloaded project

- Create a `.env` file in the root directory and add the following environment variable
    - `PORT=3000`
    
- Inside the `src/config` folder create a new file `config.json` and then add the following piece of json

```
{
  "development": {
    "username": <YOUR_DB_LOGIN_NAME>,
    "password": <YOUR_DB_PASSWORD>,
    "database": "Railway-Search-DB",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}

```
- Once you've added your db config as listed above, go to the src folder from your terminal and execute `npx sequelize db:create`
and then execute

`npx sequelize db:migrate`
```


## DB Design
  - Express Table
  - Train
  - Station
  - City 

  - A train belongs to an express but one express can be used in multiple trains
  - A city has many stations but one station belongs to a city
  - One station can have many trains, but a train belongs to one station


  
## Tables

    City -> id, name, created_at, updated_at
    Station -> id, name, address, city_id, created_at, updated_at
    Relationship -> City has many stations and Station belongs to a city (one to many)

To start the server - 
```
npm start
```

