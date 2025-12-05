"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, MessageSquare, ImageIcon, ListTree, Sparkles } from "lucide-react"
import ChatbotDemo from "@/components/chatbot-demo"
import ImageClassificationDemo from "@/components/image-classification-demo"
import TextClassificationDemo from "@/components/text-classification-demo"
import IntroSection from "@/components/intro-section"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Brain className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              MiniMind by WEIMARK
            </h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Découvre le monde fascinant de l'intelligence artificielle à travers des expérimentations interactives
          </p>
        </header>

        <Tabs defaultValue="intro" className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-2 bg-card p-2">
            <TabsTrigger
              value="intro"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Sparkles className="w-4 h-4" />
              <span className="hidden sm:inline">Introduction</span>
              <span className="sm:hidden">Intro</span>
            </TabsTrigger>
            <TabsTrigger
              value="chatbot"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chatbot</span>
            </TabsTrigger>
            <TabsTrigger
              value="image"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ImageIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Images</span>
              <span className="sm:hidden">Img</span>
            </TabsTrigger>
            <TabsTrigger
              value="text"
              className="flex items-center gap-2 py-3 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <ListTree className="w-4 h-4" />
              <span className="hidden sm:inline">Classification</span>
              <span className="sm:hidden">Texte</span>
            </TabsTrigger>
          </TabsList>

          <div className="mt-6">
            <TabsContent value="intro" className="mt-0">
              <IntroSection />
            </TabsContent>

            <TabsContent value="chatbot" className="mt-0">
              <ChatbotDemo />
            </TabsContent>

            <TabsContent value="image" className="mt-0">
              <ImageClassificationDemo />
            </TabsContent>

            <TabsContent value="text" className="mt-0">
              <TextClassificationDemo />
            </TabsContent>
          </div>
        </Tabs>

        {/* Footer */}
        <footer className="mt-16 text-center text-muted-foreground text-sm">
          <p>Projet pédagogique - Expérimentation de l'Intelligence Artificielle</p>
        </footer>
      </div>
    </main>
  )
}
