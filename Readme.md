# event-booking
Manage events and bookings.  Built with graphql.

### Environment
Create a file `nodemon.json` in the project root. 
```
{
  "env": {
    "JWT_Private_Key": "SOME_PRETTY_RANDOM_STRING_OF_DECENT_LENGTH",
    "JWT_Valid_Hours": 1,
    "mongodb_public_key": "PUBLIC_KEY_HERE",
    "mongodb_private_key": "PRIVATE_KEY_HERE",
    "MONGO_USER": "USERNAME",
    "MONGO_PASSWORD": "PASSWORD",
    "MONGO_DB": "DATABASE_NAME",
    "PORT": 3000
  }
}
```


### Running the server
1. `npm i`
1. `npm start`

