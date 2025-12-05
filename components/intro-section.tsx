import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, Zap, Target, Book } from "lucide-react"

export default function IntroSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/20 rounded-lg">
              <Brain className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Qu'est-ce que l'IA ?</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            L'Intelligence Artificielle (IA) est un domaine de l'informatique qui permet aux machines d'apprendre et de
            prendre des décisions de manière autonome.
          </p>
          <div className="p-4 bg-secondary rounded-lg">
            <h4 className="font-semibold mb-2 text-secondary-foreground">Comment ça fonctionne ?</h4>
            <ul className="space-y-2 text-sm text-secondary-foreground">
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">1.</span>
                <span>L'IA apprend à partir de grandes quantités de données</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">2.</span>
                <span>Elle identifie des motifs et des patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent font-bold">3.</span>
                <span>Elle fait des prédictions ou génère du contenu</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-accent/20 rounded-lg">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <CardTitle>Objectifs pédagogiques</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Cette application te permet d'expérimenter trois concepts fondamentaux de l'IA :
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-primary/10 rounded-lg">
              <Zap className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Chatbot conversationnel</h4>
                <p className="text-xs text-muted-foreground">Comprendre le traitement du langage naturel</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-accent/10 rounded-lg">
              <Zap className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Reconnaissance d'images</h4>
                <p className="text-xs text-muted-foreground">Découvrir la vision par ordinateur</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-chart-3/10 rounded-lg">
              <Zap className="w-5 h-5 text-chart-3 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-sm">Classification de texte</h4>
                <p className="text-xs text-muted-foreground">Explorer l'analyse de sentiments</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 bg-gradient-to-br from-primary/10 to-accent/10 border-border">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-background/50 rounded-lg">
              <Book className="w-6 h-6 text-primary" />
            </div>
            <CardTitle>Comment utiliser cette application</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg mb-3">
                1
              </div>
              <h4 className="font-semibold mb-2">Choisis un onglet</h4>
              <p className="text-sm text-muted-foreground">Sélectionne l'expérimentation que tu veux essayer</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg mb-3">
                2
              </div>
              <h4 className="font-semibold mb-2">Interagis avec l'IA</h4>
              <p className="text-sm text-muted-foreground">Pose des questions, envoie des images, écris du texte</p>
            </div>
            <div className="flex flex-col items-center text-center p-4 bg-background/50 rounded-lg">
              <div className="w-12 h-12 rounded-full bg-chart-3 flex items-center justify-center text-background font-bold text-lg mb-3">
                3
              </div>
              <h4 className="font-semibold mb-2">Observe les résultats</h4>
              <p className="text-sm text-muted-foreground">Comprends comment l'IA analyse et répond</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
