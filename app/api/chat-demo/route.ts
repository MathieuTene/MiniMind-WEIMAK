import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { generateText } from "ai"
import { NextResponse } from "next/server"

const google = createGoogleGenerativeAI({
  apiKey: process.env.GOOGLE_API_KEY,
})

export async function POST(req: Request) {
  try {
    // Vérifier que la clé API est configurée
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json(
        { error: "Clé API non configurée" },
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

    const { text } = await generateText({
      model: google("gemini-2.0-flash-exp"),
      prompt: `Tu es un assistant pédagogique qui aide les étudiants à comprendre l'intelligence artificielle et la programmation. 
      Réponds de manière claire, concise et éducative. Utilise des exemples simples et adaptés à des collégiens/lycéens.
      
      Question de l'étudiant : ${message}`,
      temperature: 0.7,
    })

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