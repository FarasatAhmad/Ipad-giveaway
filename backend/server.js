const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public')); // Serve the HTML file

app.post('/submit', (req, res) => {
  const { name, email, address } = req.body;

  // Save to CSV file
  const data = `${name},${email},${address}\n`;
  fs.appendFile(path.join(__dirname, 'submissions.csv'), data, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Submission failed!' });
    }
    res.json({ message: 'Thank you for entering!' });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});