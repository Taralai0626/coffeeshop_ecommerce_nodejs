const express = require('express');
const path = require('path');
const mongo = require('mongodb').MongoClient; //import the client from the mongo module

const app = express();
const port = process.env.PORT || 8888;

//DB stuff
const dbUrl = "mongodb://localhost:27017/testdb"; // connection string to testdb databases.
var db, menuLinks;

//test connection 
mongo.connect(dbUrl, (error, client) => {
  db = client.db("testdb");
  db.collection("menuLinks").find({}).toArray((err, result) => {
    menuLinks = result;
  });
});

//set up path to important files and folders
//set up template engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// set up path for static files(e.g. CSS & client side JS)
app.use(express.static(path.join(__dirname, 'public')))

// app.get('/', (request, response) => {
//   response.status(200).send('Test Tara');
// });
//set up routes
app.get('/index', (request, response) => {
  response.render("index");
});
app.get('/learn', (request, response) => {
  response.render("learn");
});
app.get('/location', (request, response) => {
  response.render("location");
});
// app.get('/', (request, response) => {
//   response.render("index", { title: 'Home', links: menuLinks});
// });

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

