import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    const response = await openai.chat.completions.create({
      model: "gpt-3-5-turbo",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    });

    return Response.json({
      response: response.choices[0].message.content,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
