
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




//|GET REQUEST|
// This route serves as an endpoint to retrieve the contents of the db.json file.
  app.get("/api/notes", function (req, res) {
    let getNotes = fs.readFileSync('db/db.json')
    getNotes = JSON.parse(getNotes);
    console.log(getNotes)
    res.json(getNotes);
  });

//|POST REQUEST|
// This route serves as an endpoint to create new notes. The route reads the current list of notes from the db.json file, adds the new note, and then writes the updated list of notes back to the file.
  app.post('/api/notes/', (req, res) => {
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


//|DELETE REQUEST|
//This route serves as an endpoint to delete a specific note from the application. It reads the current list of notes from the db.json file, removes the specified note based on id, and then writes the updated list of notes back to the file.
  app.delete('/api/notes/:id', (req, res) => {
    // reading notes form db.json
    let getNotes = fs.readFileSync('db/db.json')
    getNotes = JSON.parse(getNotes);
    // removing note with id param
    let deleteNote = getNotes.filter(noteId => noteId.id !== req.params.id);
    // Rewriting note to db.json
    fs.writeFileSync('db/db.json', JSON.stringify(deleteNote));
    res.json(deleteNote);
    
  })


//Listen 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
