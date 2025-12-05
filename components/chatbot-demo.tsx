"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, Send, Info, Brain } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function ChatbotDemo() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showExplanation, setShowExplanation] = useState(true)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput("")
    setMessages((prev) => [...prev, { role: "user", content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch("/api/chat-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }])
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Désolé, une erreur s'est produite. Réessaye plus tard.",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      <Card className="md:col-span-2 bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary" />
            Chatbot éducatif
          </CardTitle>
          <CardDescription>Pose des questions sur l'IA, la programmation ou n'importe quel sujet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Messages */}
            <div className="h-[400px] overflow-y-auto space-y-4 p-4 bg-secondary/30 rounded-lg border border-border">
              {messages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <Brain className="w-12 h-12 mb-4 text-primary/50" />
                  <p className="text-sm">Commence une conversation avec l'IA !</p>
                  <p className="text-xs mt-2">Essaye : "Explique-moi ce qu'est un réseau de neurones"</p>
                </div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.role === "user" ? "bg-primary text-primary-foreground" : "bg-card border border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.content}</p>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border p-3 rounded-lg flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    <span className="text-sm text-muted-foreground">L'IA réfléchit...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Écris ton message..."
                disabled={loading}
                className="flex-1 bg-background border-border"
              />
              <Button type="submit" disabled={loading || !input.trim()} size="icon">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>

      {/* Explanation panel */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Info className="w-5 h-5 text-accent" />
            Comment ça marche ?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <div>
            <h4 className="font-semibold mb-2 text-foreground">Modèle utilisé</h4>
            <p className="text-muted-foreground leading-relaxed">
              Ce chatbot utilise un <span className="text-primary font-semibold">Large Language Model (LLM)</span> comme
              GPT-5, un modèle de langage entraîné sur des milliards de textes.
            </p>
          </div>

          <div className="p-3 bg-secondary rounded-lg">
            <h4 className="font-semibold mb-2 text-secondary-foreground">Processus</h4>
            <ol className="space-y-2 text-secondary-foreground">
              <li className="flex gap-2">
                <span className="text-primary font-bold">1.</span>
                <span>Ton message est tokenisé (découpé en morceaux)</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">2.</span>
                <span>Le modèle prédit la réponse la plus probable</span>
              </li>
              <li className="flex gap-2">
                <span className="text-primary font-bold">3.</span>
                <span>La réponse est générée mot par mot</span>
              </li>
            </ol>
          </div>

          <Alert className="bg-accent/10 border-accent/20">
            <Info className="h-4 w-4 text-accent" />
            <AlertDescription className="text-xs">
              Le modèle ne "comprend" pas vraiment, il prédit les mots les plus probables basés sur ses données
              d'entraînement.
            </AlertDescription>
          </Alert>

          <div>
            <h4 className="font-semibold mb-2 text-foreground">Concepts clés</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>
                • <strong>Tokens</strong> : unités de texte
              </li>
              <li>
                • <strong>Contexte</strong> : historique de la conversation
              </li>
              <li>
                • <strong>Température</strong> : créativité des réponses
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
