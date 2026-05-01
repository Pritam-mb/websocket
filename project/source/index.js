import express from 'express';
import matchrouter from '../src/routes/matches.js'
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/matches', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/matches', matchrouter)