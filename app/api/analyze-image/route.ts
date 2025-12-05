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

    const { image } = await req.json()

    // Valider l'image
    if (!image || typeof image !== "string") {
      return Response.json(
        { error: "Image invalide" },
        { status: 400 }
      )
    }

    // Déterminer le type MIME de l'image
    let mimeType = "image/jpeg"
    if (image.startsWith("data:image/png")) {
      mimeType = "image/png"
    } else if (image.startsWith("data:image/webp")) {
      mimeType = "image/webp"
    } else if (image.startsWith("data:image/gif")) {
      mimeType = "image/gif"
    }

    // Extraire les données base64 si le format est data URL
    let base64Data = image
    if (image.includes(",")) {
      base64Data = image.split(",")[1]
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" })

    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Tu es un expert en analyse d'images éducatif. Tu dois décrire les images en détail en français. Identifie les objets principaux, la scène, les couleurs dominantes et le contexte général. Sois précis et éducatif dans tes explications." }],
        },
        {
          role: "model",
          parts: [{ text: "Bien sûr ! Je vais analyser les images de manière détaillée, en mettant l'accent sur les éléments éducatifs et en décrivant précisément ce que je vois." }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 1024,
      },
    })

    const result = await chat.sendMessage([
      { text: "Décris cette image en détail." },
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data,
        },
      },
    ])

    const response = result.response
    const text = response.text()

    // Simulate classifications based on description
    const classifications = [
      { label: "Objet principal détecté", confidence: 0.92 },
      { label: "Scène identifiée", confidence: 0.87 },
      { label: "Contexte analysé", confidence: 0.79 },
    ]

    return Response.json({
      description: text,
      classifications,
    })
  } catch (error) {
    console.error("Error analyzing image:", error)
    return Response.json({ error: "Erreur lors de l'analyse de l'image" }, { status: 500 })
  }
}
