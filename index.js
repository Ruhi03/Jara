const express = require('express');
const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();

const app = express();
const port = 3000;

// OpenAI API 설정
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// 기본 라우트
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// OpenAI API 호출을 위한 라우트
app.get('/generate', async (req, res) => {
  try {
    const prompt = req.query.prompt || 'Hello, OpenAI!';
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 50,
    });
    res.json(response.data);
    res.send("完了");
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 서버 시작
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});