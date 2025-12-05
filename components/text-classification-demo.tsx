"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Info, ListTree, Smile, Meh, Frown } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClassificationResult {
  sentiment: "positive" | "negative" | "neutral"
  confidence: number
  category: string
  explanation: string
}

export default function TextClassificationDemo() {
  const [text, setText] = useState("")
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [loading, setLoading] = useState(false)

  const exampleTexts = [
    "J'adore cette application, elle est vraiment géniale !",
    "C'est nul, ça ne marche pas du tout.",
    "L'interface est correcte mais pourrait être améliorée.",
  ]

  const handleAnalyze = async () => {
    if (!text.trim() || loading) return

    setLoading(true)
    setResult(null)

    try {
      const response = await fetch("/api/classify-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error classifying text:", error)
    } finally {
      setLoading(false)
    }
  }

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return <Smile className="w-6 h-6 text-accent" />
      case "negative":
        return <Frown className="w-6 h-6 text-destructive" />
      default:
        return <Meh className="w-6 h-6 text-muted-foreground" />
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-accent/20 border-accent text-accent"
      case "negative":
        return "bg-destructive/20 border-destructive text-destructive"
      default:
        return "bg-muted border-border text-muted-foreground"
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ListTree className="w-5 h-5 text-chart-3" />
            Classification de texte
          </CardTitle>
          <CardDescription>Écris un texte et l'IA analysera son sentiment et sa catégorie</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Input */}
          <div className="space-y-3">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Écris ton texte ici..."
              className="min-h-32 bg-background border-border"
            />
            <div className="flex flex-wrap gap-2">
              <span className="text-xs text-muted-foreground">Exemples :</span>
              {exampleTexts.map((example, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  size="sm"
                  onClick={() => setText(example)}
                  className="text-xs h-auto py-1"
                >
                  {example.substring(0, 30)}...
                </Button>
              ))}
            </div>
          </div>

          <Button onClick={handleAnalyze} disabled={loading || !text.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyse en cours...
              </>
            ) : (
              "Analyser le texte"
            )}
          </Button>

          {/* Results */}
          {result && (
            <div className="space-y-4">
              <div className={`p-4 rounded-lg border-2 ${getSentimentColor(result.sentiment)}`}>
                <div className="flex items-center gap-3 mb-3">
                  {getSentimentIcon(result.sentiment)}
                  <div>
                    <h4 className="font-semibold capitalize">Sentiment : {result.sentiment}</h4>
                    <p className="text-sm opacity-80">Confiance : {Math.round(result.confidence * 100)}%</p>
                  </div>
                </div>
                <div className="h-2 bg-background/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-current transition-all duration-500"
                    style={{ width: `${result.confidence * 100}%` }}
                  />
                </div>
              </div>

              <Card className="bg-secondary/50 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Catégorie détectée</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-primary">{result.category}</p>
                </CardContent>
              </Card>

              <Card className="bg-secondary/50 border-border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Explication</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.explanation}</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Explanation panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-chart-3" />
            Analyse de sentiments
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Qu'est-ce que c'est ?</h4>
            <p className="text-muted-foreground leading-relaxed">
              L'analyse de sentiments utilise l'IA pour déterminer si un texte est{" "}
              <span className="text-accent font-semibold">positif</span>,{" "}
              <span className="text-destructive font-semibold">négatif</span> ou neutre.
            </p>
          </div>

          <div className="p-3 bg-secondary rounded-lg">
            <h4 className="font-semibold mb-2 text-secondary-foreground">Processus d'analyse</h4>
            <ol className="space-y-2 text-secondary-foreground">
              <li className="flex gap-2">
                <span className="text-chart-3 font-bold">1.</span>
                <span>Tokenisation du texte</span>
              </li>
              <li className="flex gap-2">
                <span className="text-chart-3 font-bold">2.</span>
                <span>Analyse contextuelle</span>
              </li>
              <li className="flex gap-2">
                <span className="text-chart-3 font-bold">3.</span>
                <span>Classification et score de confiance</span>
              </li>
            </ol>
          </div>

          <Alert className="bg-chart-3/10 border-chart-3/20">
            <Info className="h-4 w-4 text-chart-3" />
            <AlertDescription className="text-xs">
              Le modèle examine le vocabulaire, la structure et le contexte pour déterminer le sentiment global.
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Applications</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Analyse de feedback client</li>
              <li>• Modération de commentaires</li>
              <li>• Étude de réseaux sociaux</li>
              <li>• Support client automatisé</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
