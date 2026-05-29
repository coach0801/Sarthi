import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export const geminiFlash = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    temperature: 0.4,
    topP: 0.95,
    maxOutputTokens: 8192,
  },
})

export const geminiPro = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
  generationConfig: {
    temperature: 0.3,
    topP: 0.9,
    maxOutputTokens: 16384,
  },
})

export async function generateText(prompt: string, model: "flash" | "pro" = "flash"): Promise<string> {
  const m = model === "flash" ? geminiFlash : geminiPro
  const result = await m.generateContent(prompt)
  return result.response.text()
}

export async function generateJSON<T>(prompt: string, model: "flash" | "pro" = "flash"): Promise<T> {
  const fullPrompt = `${prompt}\n\nRespond ONLY with valid JSON. No markdown, no explanation, no code blocks.`
  const text = await generateText(fullPrompt, model)
  const clean = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim()
  return JSON.parse(clean) as T
}
