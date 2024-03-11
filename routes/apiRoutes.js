const fs = require('fs');
const path = require('path');

const dbFilePath = path.join(__dirname, '../db/db.json');

module.exports = (app) => {
  // GET /api/notes - Read notes from db.json
  app.get('/api/notes', (req, res) => {
    console.log('Get /api/notes route accessed')
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    });
  });

  // POST /api/notes - Add a new note to db.json
  app.post('/api/notes', (req, res) => {
    console.log('POST /api/notes route accessed')
    const newNote = req.body;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) throw err;

      const notes = JSON.parse(data);
      // Add a unique ID to the new note
      newNote.id = generateUniqueId();
      notes.push(newNote);

      // Write updated notes back to db.json
      fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json(newNote);
      });
    });
  });

  // Bonus: DELETE /api/notes/:id - Delete a note by ID
  app.delete('/api/notes/:id', (req, res) => {
    console.log('DELETE /api/notes route accessed')
    const noteIdToDelete = req.params.id;
    fs.readFile(dbFilePath, 'utf8', (err, data) => {
      if (err) throw err;

      let notes = JSON.parse(data);
      // Remove the note with the given ID
      notes = notes.filter((note) => note.id !== noteIdToDelete);

      // Write updated notes back to db.json
      fs.writeFile(dbFilePath, JSON.stringify(notes), (err) => {
        if (err) throw err;
        res.json({ success: true });
      });
    });
  });
};

// Function to generate a unique ID (you can use npm packages like 'uuid' for this)
function generateUniqueId() {
  console.log('Unique ID made')
  return Math.random().toString(36).substr(2, 9);
}