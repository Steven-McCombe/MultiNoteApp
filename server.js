
const express = require('express');
const path = require('path');
const fs = require('fs')
//npm package to create a unique id
const { v4: uuidv4 } = require('uuid');

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

  // This get request at /api/notes is used to retrieve the contents of the db.json file
  app.get("/api/notes", function (req, res) {
    let getNotes = fs.readFileSync('db/db.json')
    getNotes = JSON.parse(getNotes);
    console.log(getNotes)
    res.json(getNotes);
  });


// Post request
  app.post('/api/notes/', (req, res) => {
    // get all currently saved notes:
    let getNotes = fs.readFileSync('db/db.json')
    getNotes = JSON.parse(getNotes);
    //Create a body for the note
    let postNote = {
      title: req.body.title,
      text: req.body.text,
      // npm package to create a unique id for each note 
      id: uuidv4(),
    };
    // pushing created note to be written in the db.json file
    getNotes.push(postNote);
    fs.writeFileSync('db/db.json', JSON.stringify(getNotes));
    res.json(getNotes);
  });

//Listen 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
