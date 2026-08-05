import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.AI_API_KEY!,
});

export async function POST(req: Request) {
  const { message } = await req.json();

  const response = await groq.chat.completions.create({
    model: process.env.AI_MODEL!,
    messages: [{ role: "user", content: message }],
    stream: true,
  });

  console.log(response);

  return Response.json({
    reply: response.choices[0].message.content,
  });
}
