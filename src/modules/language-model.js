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

async function fetchAPIResponse(message, messageList) {
  let oldMessages =
    "Here are old messages that I have asked you. Use these to influence your responses";
  if (messageList != null && messageList != "undefined") {
    messageList.forEach((message) => {
      oldMessages += ` ${message.content} `;
    });
  }

  console.log(oldMessages);
  console.log(messageList);
  try {
    const chatCompletion = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful assistant that answers any and all questions in a clear manner. Before every recipe, describe it. Never use a hyphen. You may never use a dash (-) outside of using it to create a list element. You may also never use numbers in this format (1., 2., 3., and otherwise) unless to create a numbered list. When specifying the words 'ingredients' and 'instructions' as headers you must always use a ** before and after. ${oldMessages}`,
        },
        { role: "user", content: message },
      ],
    });
    const returnMessage = chatCompletion.choices[0].message;
    if (returnMessage == null || returnMessage == "undefined") {
      returnMessage.content = "Error";
    }
    return returnMessage;
  } catch (error) {
    console.error("Error in API request:", error); // Log the full error
  }
}

fetchAPIResponse("test");

export default fetchAPIResponse;
