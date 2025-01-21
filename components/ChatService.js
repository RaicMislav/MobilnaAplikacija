import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

/**
 * Sends a message to the OpenAI API and gets a bot response.
 * @param {string} userMessage - The user's message to send.
 * @returns {Promise<string>} - The bot's response.
 */
export const sendMessageToBot = async (userMessage) => {
  const MAX_RETRIES = 3; // Maximum number of retries
  let attempt = 0;

  // Validate input message
  if (!userMessage || userMessage.trim().length === 0) {
    return 'Please provide a valid message.';
  }

  while (attempt < MAX_RETRIES) {
    try {
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: 'text-ada-001',
          messages: [
            { role: 'system', content: 'You are a helpful assistant.' },
            { role: 'user', content: userMessage },
          ],
          max_tokens: 150, // Adjust token limit based on your use case
          temperature: 0.7, // Adjust creativity level (0.0 to 1.0)
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );

      // Check if response data is valid
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content.trim();
      }
      return "Sorry, I couldn't understand that.";
    } catch (error) {
      // Log full error response for easier debugging
      console.error('Error communicating with OpenAI:', error.response ? error.response.data : error.message);

      attempt += 1;
      if (attempt === MAX_RETRIES) {
        // If retries are exhausted, return a friendly error message
        return 'There was an error communicating with the bot. Please try again later.';
      }
    }
  }
};