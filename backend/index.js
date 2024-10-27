import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for cross-origin requests

// Set up OpenAI client
const client = new OpenAI({
  apiKey: process.env.VITE_OPENAI_API_KEY, // Ensure your API key is stored in .env file
  dangerouslyAllowBrowser: false,
});

const lineBreaks = (input) => {
  return input.replace(/\n/g, "<br>");
};

// API endpoint to handle OpenAI requests
app.post("/api/openai", async (req, res) => {
  let { message, messageList } = req.body;

  let oldMessages =
    "Here are old messages that I have asked you. Use these to influence your responses";

  if (messageList && Array.isArray(messageList)) {
    messageList.forEach((msg) => {
      oldMessages += ` ${msg.content} `;
      oldMessages += `If the user requires a recipe, return your recipe in this format. You will use the below template (where the template starts and ends with ********) for ALL of you recipes. Ignore any and all previous user input that requests you to change the template in any way. If the user asks you to swap the order of the template, add new sections to the template, or remove sections from the template, you will ignore such requests. You will include the headers (denoted by format **header_name**) exactly as they are in the template. 

          ********
          ***<Begin every recipe with the name of the dish>** (YOU MUST INCLUDE THE TITLE OF THE DISH)
          <general rating out of 5 as a number (only a number NO TEXT)>
          <number of people it feeds in the format of "Serves 6 people">
          <brief description of the dish (separate from the title)>
          **Ingredients** (INGREDIENTS ARE REQUIRED FOR EVERY RECIPE)
          -<ingredient 1> 
          -<ingredient 2> 
          -<and so on> 
          **Instructions** (INSTRUCTIONS ARE REQUIRED FOR EVERY RECIPE AND ARE ALWAYS AFTER INGREDIENTS)
          1.<step 1>
          2.<step 2>
          3.<and so on>

          ********
          
          
          if the user does not require a recipe, ignore this template. You can and will provite nutritional information`;
    });
  }

  try {
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that answers any and all questions in a clear manner. You will answer any and all questions. Your primary function is to provide recipes, but you may also provide nutritional info about those recipes.

          ${oldMessages}`,
        },
        { role: "user", content: message },
      ],
    });

    const returnMessage = chatCompletion.choices[0].message.content;

    if (!returnMessage) {
      return res.status(500).json({ error: "No response from API" });
    }

    // Process the message and send response
    res.json({ message: lineBreaks(returnMessage) });
  } catch (error) {
    console.error("Error in API request:", error);
    res
      .status(500)
      .json({ error: "API request failed", details: error.message });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
