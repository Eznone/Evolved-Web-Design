const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const levels = [
  'level-1-the-prompt',
  'level-2-design-skills',
  'level-3-visual-director',
  'level-4-the-cloner',
  'level-5-custom-assets',
  'level-6-visual-tinkering',
  'level-7-the-frontier',
];

app.use(express.static(path.join(__dirname, 'public')));

for (const level of levels) {
  app.use(`/${level}`, express.static(path.join(__dirname, level)));
  app.get(`/${level}`, (req, res) => {
    res.sendFile(path.join(__dirname, level, 'index.html'));
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
