import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const preprocessJobDescription = async (rawDescription) => {
    try {
        if (!rawDescription) return "";

        const response = await openai.chat.completions.create({
            model: "gpt-4o-mini", // or gpt-3.5-turbo
            messages: [
                {
                    role: "system",
                    content: "You are a professional recruiting assistant. Convert the following raw job description into a clean, well-formatted Markdown version. Use headings, bullet points, and bold text to make it readable. Do not add any extra commentary, just the markdown description.",
                },
                {
                    role: "user",
                    content: rawDescription,
                },
            ],
            temperature: 0.7,
        });

        return response.choices[0].message.content;
    } catch (error) {
        console.error("OpenAI Preprocessing Error:", error);
        return rawDescription; // Fallback to raw if LLM fails
    }
};
