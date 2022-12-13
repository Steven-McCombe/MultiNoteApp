
const express = require('express');
const path = require('path');
//Use express
const app = express();
//Environment port or local host.
const PORT = process.env.PORT || 3001;

//create a static route for files in the public folder
app.use(express.static('public'));

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// gets index page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

// gets note page
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

//Listen 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
