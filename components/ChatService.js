import express from 'express';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(express.json());

const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = process.env.OPENAI_API_KEY;

app.post('/api/sendMessage', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await axios.post(
      API_URL,
      { prompt: message, max_tokens: 150 },
      { headers: { Authorization: `Bearer ${API_KEY}` } }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error communicating with OpenAI' });
  }
});

app.listen(5000, () => console.log('Server running on http://localhost:5000'));

