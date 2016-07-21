# URL shortener app

This is a PoC of a URL shortener application build with ExpressJS, MySQL and Redis.


![Url Shortener app](https://raw.githubusercontent.com/KevinNTH/poc-url-shortener/master/url_shortener.png)

## Run the app

First of all, make sure you have `redis-server` and `mysql` installed on your machine.
Then, fetch the project:
- Clone the project: `git clone git@github.com:KevinNTH/poc-url-shortener.git`
- Install the dependencies: `npm install`
- Take a look in the `config.js` file in order to set up your database connection
- Run the server: `npm start`

## What does the app?

Basically, the app receive an URL in the input, send it to the server. The process will look for that URL in order to check if this URL has already been registered or not. If it is registered, the server return the short URL directly to the client. Otherwise, it will store the new URL in the database, then shorten the input URL by encoding the URL id in Base58. Finally, this encoded value is store in Redis as the key and the long URL as the value.

When the user wants to access to a short URL, the application gets the encoded value of the short URl and access to the long URL via Redis. This allows high performances when requesting an URL. Then the server redirects the client to the requested URL.

### TO DO

- Write the unit test
