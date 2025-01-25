import axios from 'axios';

// Use your new Hugging Face API key here
const HUGGING_FACE_API_KEY = ""; // Replace with your actual Hugging Face API key

// Example function to send a message to Hugging Face's GPT-2 model
export const sendMessageToBot = async (userMessage) => {
  try {
    const response = await axios.post(
      "https://api-inference.huggingface.co/models/gpt2", // Model URL (you can replace this with another model)
      { inputs: userMessage }, // Pass user input as the "inputs" parameter
      {
        headers: {
          Authorization: `Bearer ${HUGGING_FACE_API_KEY}`, // Include the API key in headers
        },
      }
    );

    // Log the response from Hugging Face API
    console.log("Bot Response:", response.data);
    return response.data[0].generated_text; // Example: Extracts generated text from the response
  } catch (error) {
    console.error("Error communicating with Hugging Face:", error.message);
    return "Sorry, there was an error.";
  }
};
