import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  isUser: boolean
  timestamp: Date
}

const reponsesSimulees = {
  "bonjour": "Bonjour ! Je suis votre assistant IA pour la gestion des formations. Comment puis-je vous aider aujourd'hui ?",
  "où trouver mes fiches de paie": "Les fiches de paie sont accessibles dans l'applicatin machin débrouille toi tout seul.",
  "budget": "Le budget des formations est accessible dans l'onglet 'Budget'. Vous y trouverez un aperçu complet des coûts, des dépenses et des allocations pour chaque formation.",
  "planning": "Le planning annuel des formations se trouve dans l'onglet 'Planning Annuel'. Vous pouvez y voir toutes les formations prévues, les dates et les salles attribuées.",
  "notifications": "Les notifications sont gérées dans l'onglet 'Notifications'. Vous pouvez y configurer les alertes pour les dates importantes, les changements de planning et les rappels.",
  "default": "Je ne suis pas sûr de comprendre votre question. Pourriez-vous la reformuler ? Je peux vous aider avec :\n- La création de formations\n- La gestion du budget\n- Le planning annuel\n- Les notifications\n- Les tableaux de bord"
}

export function Chatbox() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const simulerReponseIA = async (message: string) => {
    setIsLoading(true)
    // Simuler un délai de réponse
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const messageLower = message.toLowerCase()
    let reponse = reponsesSimulees.default

    // Chercher une correspondance dans les réponses prédéfinies
    for (const [motCle, reponsePredefinie] of Object.entries(reponsesSimulees)) {
      if (messageLower.includes(motCle)) {
        reponse = reponsePredefinie
        break
      }
    }

    const messageIA: Message = {
      id: Date.now().toString(),
      content: reponse,
      isUser: false,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, messageIA])
    setIsLoading(false)
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, newMessage])
    setInputMessage("")
    await simulerReponseIA(inputMessage)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto h-[600px] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Assistant IA</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <p className="text-sm whitespace-pre-line">{message.content}</p>
                <span className="text-xs opacity-70">
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-muted rounded-lg p-3">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Posez votre question ici..."
            className="min-h-[60px]"
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSendMessage()
              }
            }}
          />
          <Button onClick={handleSendMessage} disabled={isLoading}>
            {isLoading ? "Envoi..." : "Envoyer"}
          </Button>
        </div>
      </div>
    </Card>
  )
} 