# Shopping List App

Current Status: Pre Alpha (under construction)

This app was built so I could familiarise myself with react by following this web series
Learncode.Academy - React Web Series
www.youtube.com/watch?v=MhkGQAoc7bc&list=PLoYCgNOIyGABj2GQSlDRjgvXtqfDxKm5b

I integrated it with node js as a backend with some data endpoints set up

Core packages
Web Server: Express v4
Database: MongoDB (using Monk middleware)
Auth: Passport local strategy (hard coded login details at the moment)
AJAX Helper: Axios

Look at the package.json file for more details

Before you start:
- Install MongoDB from their website.
- Navigate to the MongoDB directory in command line and run mongod (leave this running in the background)

To start:
1. Unpack or clone this repo into desired location.
2. Navigate to the directory in a new command line and type "npm install".
3. When thats done type "npm start".
4. Open a web browser and navigate to localhost:8000.
5. You should get a login screen if its working. (You will need to manually insert a login to your DB)
6. Open a new command line in the same directory and run webpack --watch (leave this running in the background)

You are now ready to work on the code.

To insert a login into the DB i have created a helper located in admin.js

At the bottom of server.js there is some commented out code that will set up a user, run it only once.




