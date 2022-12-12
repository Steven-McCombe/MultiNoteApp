
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
app.use('/api', api);

//Listen 
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
