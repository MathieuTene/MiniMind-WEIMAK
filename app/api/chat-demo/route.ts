import { GoogleGenerativeAI } from "@google/generative-ai"
import { NextResponse } from "next/server"

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
      return NextResponse.json(
        { error: "Clé API non configurée. Veuillez définir GEMINI_API_KEY dans les variables d'environnement." },
        { status: 500 }
      )
    }

    const { message } = await req.json()

    // Valider le message
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json(
        { error: "Message invalide" },
        { status: 400 }
      )
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Tu es un assistant pédagogique qui aide les étudiants à comprendre l'intelligence artificielle et la programmation. Réponds de manière claire, concise et éducative. Utilise des exemples simples et adaptés à des collégiens/lycéens." }],
        },
        {
          role: "model",
          parts: [{ text: "Bien sûr ! Je suis ravi d'être ton assistant pour apprendre l'IA et la programmation. Je vais expliquer les concepts de façon simple et progressive. N'hésite pas à me poser tes questions !" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessage(message)
    const response = result.response
    const text = response.text()

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error generating response:", error)

    // Gestion d'erreur plus détaillée
    if (error instanceof Error) {
      return NextResponse.json(
        { error: `Erreur: ${error.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "Erreur lors de la génération de la réponse" },
      { status: 500 }
    )
  }
}