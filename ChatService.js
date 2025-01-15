import 'dotenv/config'; // Učitavanje vrijednosti iz .env datoteke

export const getChatGPTResponse = async (inputText) => {
  const apiKey = process.env.OPENAI_API_KEY; // Učitavanje API ključa iz .env
  const url = 'https://api.openai.com/v1/chat/completions'; // Koristi OpenAI chat completions endpoint

  const data = {
    model: 'gpt-3.5-turbo', // Koristi odgovarajući model
    messages: [
      { role: 'system', content: 'You are a helpful assistant.' },
      { role: 'user', content: inputText },
    ],
    max_tokens: 150, // Maksimalni broj tokena (možeš prilagoditi)
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`, // API ključ iz .env
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (result && result.choices && result.choices.length > 0) {
      return result.choices[0].message.content.trim(); // Vraća odgovor od bota
    }

    throw new Error('No response from API');
  } catch (error) {
    console.error('Error fetching response from API:', error);
    return 'Sorry, I am unable to respond at the moment. Please try again later.';
  }
};
