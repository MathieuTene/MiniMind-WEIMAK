import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(req: Request) {
  const { text } = await req.json()

  try {
    const { text: analysis } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: `Analyse le sentiment et la catégorie du texte suivant. Réponds UNIQUEMENT avec un JSON valide dans ce format exact :
{
  "sentiment": "positive" ou "negative" ou "neutral",
  "confidence": nombre entre 0 et 1,
  "category": "Opinion", "Feedback", "Question", ou "Commentaire",
  "explanation": "Explication courte en français"
}

Texte à analyser : "${text}"`,
    })

    // Parse the JSON response
    const result = JSON.parse(analysis.trim())

    return Response.json(result)
  } catch (error) {
    console.error("Error classifying text:", error)
    // Return a default response if parsing fails
    return Response.json({
      sentiment: "neutral",
      confidence: 0.5,
      category: "Commentaire",
      explanation: "Analyse en cours...",
    })
  }
}
