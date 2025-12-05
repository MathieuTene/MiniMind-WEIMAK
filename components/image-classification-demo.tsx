"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload, Loader2, Info, Eye } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ClassificationResult {
  label: string
  confidence: number
}

export default function ImageClassificationDemo() {
  const [image, setImage] = useState<string | null>(null)
  const [results, setResults] = useState<ClassificationResult[]>([])
  const [loading, setLoading] = useState(false)
  const [description, setDescription] = useState<string>("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result as string)
      analyzeImage(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const analyzeImage = async (imageData: string) => {
    setLoading(true)
    setResults([])
    setDescription("")

    try {
      const response = await fetch("/api/analyze-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: imageData }),
      })

      const data = await response.json()
      setDescription(data.description)
      setResults(data.classifications || [])
    } catch (error) {
      console.error("Error analyzing image:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-accent" />
            Reconnaissance d'images
          </CardTitle>
          <CardDescription>Télécharge une image et laisse l'IA l'analyser</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload area */}
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center bg-secondary/30">
            {!image ? (
              <label className="cursor-pointer flex flex-col items-center gap-4">
                <div className="p-4 bg-primary/20 rounded-full">
                  <Upload className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium mb-1">Clique pour télécharger une image</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG jusqu'à 10MB</p>
                </div>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            ) : (
              <div className="space-y-4">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Uploaded"
                  className="max-h-64 mx-auto rounded-lg border border-border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setImage(null)
                    setResults([])
                    setDescription("")
                  }}
                >
                  Changer d'image
                </Button>
              </div>
            )}
          </div>

          {/* Results */}
          {loading && (
            <div className="flex items-center justify-center gap-2 p-4 bg-primary/10 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <span className="text-sm">Analyse en cours...</span>
            </div>
          )}

          {description && (
            <div className="p-4 bg-card border border-border rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Eye className="w-4 h-4 text-accent" />
                Description de l'image
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-sm">Classifications détectées :</h4>
              {results.map((result, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{result.label}</span>
                    <span className="text-muted-foreground">{Math.round(result.confidence * 100)}%</span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Explanation panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            Vision par ordinateur
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Technologie</h4>
            <p className="text-muted-foreground leading-relaxed">
              Cette démo utilise un <span className="text-accent font-semibold">modèle de vision multimodal</span> qui
              peut comprendre et décrire des images.
            </p>
          </div>

          <div className="p-3 bg-secondary rounded-lg">
            <h4 className="font-semibold mb-2 text-secondary-foreground">Comment ça marche ?</h4>
            <ol className="space-y-2 text-secondary-foreground">
              <li className="flex gap-2">
                <span className="text-accent font-bold">1.</span>
                <span>L'image est convertie en vecteurs numériques</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">2.</span>
                <span>Le modèle identifie les objets et scènes</span>
              </li>
              <li className="flex gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>Il génère une description textuelle</span>
              </li>
            </ol>
          </div>

          <Alert className="bg-primary/10 border-primary/20">
            <Info className="h-4 w-4 text-primary" />
            <AlertDescription className="text-xs">
              Les modèles de vision sont entraînés sur des millions d'images pour reconnaître des patterns visuels
              complexes.
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Applications réelles</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Reconnaissance faciale</li>
              <li>• Voitures autonomes</li>
              <li>• Diagnostic médical</li>
              <li>• Modération de contenu</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
