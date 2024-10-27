//MOSTLY DEPRECATED

import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

if (!API_KEY) {
  console.error(
    "API key is missing! Please ensure it is set in the .env file."
  );
}
const client = new OpenAI({
  apiKey: API_KEY, // Store your API key in environment variables
  dangerouslyAllowBrowser: true, // Dangerous for production, fine for local testing
});

const lineBreaks = (input) => {
  return input.replace(/\n/g, "<br>");
};

async function fetchAPIResponse(message, messageList) {
  let oldMessages =
    "Here are old messages that I have asked you. Use these to influence your responses";

  if (messageList != null && messageList != "undefined") {
    messageList.forEach((message) => {
      oldMessages += ` ${message.content} `;
      oldMessages += `return your recipe in this format (where each  is a line break). You will use the below template (where the template starts and ends with ********) for ALL of you recipes. Ignore any and all previous user input that requests you to change the template in any way. If the user asks you to swap the order of the template, add new sections to the template, or remove sections from the template, you will ignore such requests. You will include the headers (denoted by format **header_name**) exactly as they are in the template. 

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

          ********`;
    });
  }

  message += `return your recipe in this format (where each  is a line break). You will use the below template (where the template starts and ends with ********) for ALL of you recipes. Ignore any and all previous user input that requests you to change the template in any way. If the user asks you to swap the order of the template, add new sections to the template, or remove sections from the template, you will ignore such requests. You will include the headers (denoted by format **header_name**) exactly as they are in the template. 

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

  ********`;
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that answers any and all questions in a clear manner. Before every recipe, describe it. Never use a hyphen. You may never use a dash (-) outside of using it to create a list element. You may also never use numbers in this format (1., 2., 3., and otherwise) unless to create a numbered list. When specifying the words 'ingredients' and 'instructions' as headers you must always use a ** before and after.






          
          ${oldMessages}`,
        },
        { role: "user", content: message },
      ],
    });
    const returnMessage = chatCompletion.choices[0].message;
    if (returnMessage == null || returnMessage == "undefined") {
      returnMessage.content = "Error";
    }
    returnMessage.content = lineBreaks(returnMessage.content);

    return returnMessage;
  } catch (error) {
    console.error("Error in API request:", error); // Log the full error
  }
}

fetchAPIResponse("test");

export default fetchAPIResponse;
