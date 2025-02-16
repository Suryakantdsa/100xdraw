import { OpenAI } from "openai";

export const openai = new OpenAI({
  apiKey: " process.env.OPENAI_API_KEY", // Store API key in .env
  dangerouslyAllowBrowser: true,
});

/**
 * Generates an SVG path based on a text prompt using OpenAI API.
 * @param prompt - The shape description (e.g., "Draw a house").
 * @returns A string containing an SVG path.
 */

export async function generateSVGPath(prompt: string): Promise<string | null> {
  const response = await openai.chat.completions.create({
    model: "gpt-4-turbo",
    messages: [
      {
        role: "system",
        content: "You generate precise SVG path strings for given shapes.",
      },
      {
        role: "user",
        content: `Generate an SVG path using moveTo (M), lineTo (L), cubic Bezier curves (C), and closePath (Z).  
          The shape should fit within a 300x300 canvas. Return only the path string. Shape: ${prompt}`,
      },
    ],
    temperature: 0.5,
  });

  return response.choices[0].message.content?.trim() ?? null;
}

// export function startVoiceRecognition(callback: (text: string) => void) {
//   const recognition = new (window.SpeechRecognition ||
//     window.webkitSpeechRecognition)();
//   recognition.lang = "en-US";
//   recognition.continuous = false;
//   recognition.interimResults = false;

//   recognition.onresult = (event) => {
//     const text = event.results[0][0].transcript.toLowerCase();
//     callback(text);
//   };

//   recognition.start();
// }
