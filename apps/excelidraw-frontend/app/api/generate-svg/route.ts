// import { NextRequest } from "next/server";
// import { NextResponse } from "next/server";
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY!, // Ensure you have this in your .env file
// });
// export async function POST(req: NextRequest) {
//   const data = await req.json();
//   const { prompt } = data;
//   if (!prompt) {
//     return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
//   }

//   try {
//     const response = await openai.chat.completions.create({
//       model: "gpt-4o-mini",
//       messages: [
//         {
//           role: "system",
//           content: "You generate precise SVG path strings for given shapes.",
//         },
//         {
//           role: "user",
//           content: `Generate an SVG path using moveTo (M), lineTo (L), cubic Bezier curves (C), and closePath (Z).
//               The shape should fit within a 300x300 canvas. Return only the path string. Shape: ${prompt}`,
//         },
//       ],
//       temperature: 0.5,
//     });

//     const svgPath = response.choices[0].message.content?.trim() ?? null;
//     console.log("svgPath_______", svgPath);
//     if (!svgPath) {
//       return NextResponse.json(
//         { error: "Failed to generate SVG path" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ svgPath }, { status: 200 });
//   } catch (error) {
//     console.error("OpenAI API Error:", error);
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!); // Your Gemini API key

interface CompletionResponse {
  response?: Response;
}

interface Response {
  candidates?: Candidate[];
}

interface Candidate {
  content?: Content;
}

interface Content {
  parts?: Part[];
}

interface Part {
  text?: string;
}
export async function POST(req: NextRequest) {
  const data = await req.json();
  const { prompt } = data;

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Or a suitable Gemini model
    const completion: any = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `Generate an SVG path for a user-requested shape. The shape should be created using moveTo (M), lineTo (L), cubic Bezier curves (C), arcs (A), and closePath (Z) commands. The shape must fit within a 300x300 canvas. The user will describe the shape they want to draw, and you should interpret their description to create a clean and accurate SVG path. Return only the path string, without any additional explanation or text.

              Here are some examples of SVG paths for reference:

              Star:
              M150,50 L180,120 L260,120 L200,170 L230,250 L150,200 L70,250 L100,170 L40,120 L120,120 Z

              Car:
              M50,200 L50,150 C50,100 100,50 150,50 L250,50 C300,50 350,100 350,150 L350,200 Z
              M100,200 A25,25 0 1,1 150,200 A25,25 0 1,1 100,200 Z
              M250,200 A25,25 0 1,1 300,200 A25,25 0 1,1 250,200 Z

              Home:
              M100,250 L100,150 L150,100 L200,150 L200,250 Z
              M100,150 L200,150 L150,100 Z

              Moon:
              M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z

              Heart:
              M150,100 C100,50 50,100 50,150 C50,200 100,250 150,300 C200,250 250,200 250,150 C250,100 200,50 150,100 Z

              Use these examples as a guide to generate SVG paths for the user's requested shape." ${prompt}`,
            },
          ],
        },
      ],
    });
    // console.log("completion_______", completion);

    const svgPath =
      completion?.response?.candidates[0].content.parts[0].text.trim() ?? null;

    // console.log("svgPath_______", svgPath);

    if (!svgPath) {
      return NextResponse.json(
        { error: "Failed to generate SVG path" },
        { status: 500 }
      );
    }

    return NextResponse.json({ svgPath }, { status: 200 });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
