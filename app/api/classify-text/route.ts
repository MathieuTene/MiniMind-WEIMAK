import { GoogleGenerativeAI } from "@google/generative-ai"

// IMPORTANT: Store your API key in an environment variable
const API_KEY = process.env.GEMINI_API_KEY

if (!API_KEY) {
  console.error("❌ GEMINI_API_KEY is not set in environment variables")
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null

export async function POST(req: Request) {
  try {
    // Vérifier que la clé API est configurée
    if (!API_KEY || !genAI) {
      return Response.json(
        { error: "Clé API non configurée" },
        { status: 500 }
      )
    }

    const { text } = await req.json()

    // Valider le texte
    if (!text || typeof text !== "string" || text.trim() === "") {
      return Response.json(
        { error: "Texte invalide" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Tu es un analyseur de texte expert. Tu dois analyser le sentiment et la catégorie de tout texte qu'on te donne. Réponds UNIQUEMENT avec un JSON valide dans ce format exact sans aucune explication supplémentaire.\n\nFormat de réponse:\n{\n  \"sentiment\": \"positive\" ou \"negative\" ou \"neutral\",\n  \"confidence\": nombre entre 0 et 1,\n  \"category\": \"Opinion\", \"Feedback\", \"Question\", ou \"Commentaire\",\n  \"explanation\": \"Explication courte en français\"\n}" }],
        },
        {
          role: "model",
          parts: [{ text: "Compris ! Je vais analyser les textes et répondre uniquement avec le JSON formaté comme demandé, sans aucun texte supplémentaire." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 500,
      },
    })

    const result = await chat.sendMessage(`Texte à analyser: "${text}"`)
    const response = result.response
    const analysis = response.text()

    // Parse the JSON response
    const parsed = JSON.parse(analysis.trim())

    return Response.json(parsed)
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
