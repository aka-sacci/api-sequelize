# api-sequelize

A simple API to consult a body mass index (BMI) from informed weight and height. You can also register your BMI in the database to, later, consult it history.
Made to train some MVC model, TypeScript, NodeJS and Sequelize concepts.

## How to use

After clone, install the dependencies:
>npm i

Edit "./src/database/config/database.json" development database to your machine environment

Run the migrations and seeders
>npx sequelize-cli db:migrate
>npx sequelize-cli db:migrate:undo:all

Run the server
>npm run

*To better use, i recommend the use of some http request tool, like Insomnia, Postman, ThunderClient etc...

