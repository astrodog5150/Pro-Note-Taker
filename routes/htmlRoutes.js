const path = require('path');

module.exports = (app) => {
  // GET /notes - Return the notes.html page
  app.get('/notes', (req, res) => {
    console.log('GET /notes route accessed');
    res.sendFile(path.join(__dirname, '../public/notes.html'));
  });

  // GET * - Return the index.html page for any other route
  app.get('*', (req, res) => {
    console.log('GET /* route accessed');
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });
};