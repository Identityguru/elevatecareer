const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();

app.use(bodyParser.json());

app.post('/generate-pitch', async (req, res) => {
    const { name, job, strength1, strength2, strength3, strength4, accomplishment, qualification1, qualification2, qualification3, ask } = req.body;

    const openaiResponse = await fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: `Create an elevator pitch for:
            Name: ${name}
            What do you do: ${job}
            Strengths: ${strength1}, ${strength2}, ${strength3}, ${strength4}
            Accomplishment: ${accomplishment}
            Qualifications: ${qualification1}, ${qualification2}, ${qualification3}
            Ask: ${ask}`,
            max_tokens: 150
        })
    });

    const openaiData = await openaiResponse.json();
    const pitch = openaiData.choices[0].text.trim();

    res.json({ pitch });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

