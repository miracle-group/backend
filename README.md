# Express Boilerplate

#### This repository is a custom made boilerplate for express app, this app will be tweaked according to my need, but if your need is similar with my need, feel free to clone


# How To Install

make sure nodejs is installed

clone this repository by typing ```git clone https://github.com/naskapal/express-boilerplate``` in your terminal/cmd

browse to the folder using ```cd express-boilerplate``` and then install the packages with ```npm install``` command

fill in your database URL in `config.secrets` file and rename it to `config.secrets.js`

run the app using ```npm start``` command

# Routes

This app has 2 basic routes, index, and users

The index route is commented, make sure to uncomment if you need it (it's in app.js line 15)

|route|method|description|
|-----|------|--------------|
|/users|POST|registers user to database|


## The model provided in here is mongoose model, feel free to replace it with your own model if you don't need it
