"use client"

import { Suspense } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Importation des composants
import FormationEncoding from "../../components/formation/formation-encoding"
import FormationPlanning from "../../components/formation/formation-planning"
import FormationBudget from "../../components/formation/formation-budget"
import FormationNotifications from "../../components/formation/formation-notifications"
import FormationDashboard from "../../components/formation/formation-dashboard"
import FormationOnboarding from "../../components/formation/formation-onboarding"
import { Chatbox } from "@/components/formation/chatbox"
import FormationATS from "@/components/formation/formation-ats"
import FormationPaie from "@/components/formation/formation-paie"
import CarburantDashboard from "@/components/carburant/carburant-dashboard"
import CarburantTransactions from "@/components/carburant/carburant-transactions"

// Données simulées pour les transactions
const transactionsSimulees = [
  {
    id: "t1",
    date: "2024-03-19",
    stationService: "Total - A6",
    litres: 45,
    prix: 89.55,
    statut: "normal" as const
  },
  {
    id: "t2",
    date: "2024-03-15",
    stationService: "BP - Lyon",
    litres: 50,
    prix: 98.50,
    statut: "normal" as const
  },
  {
    id: "t3",
    date: "2024-03-18",
    stationService: "Shell - Paris",
    litres: 60,
    prix: 118.20,
    statut: "suspect" as const
  }
]

export default function FormationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Outil de Gestion des Formations</h1>
      
      <Tabs defaultValue="encoding" className="w-full">
        <TabsList className="grid grid-cols-11 mb-8">
          <TabsTrigger value="encoding">Encodage</TabsTrigger>
          <TabsTrigger value="planning">Planning Annuel</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="dashboard">Tableaux de Bord</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
          <TabsTrigger value="chat">Assistant IA</TabsTrigger>
          <TabsTrigger value="ats">ATS RH</TabsTrigger>
          <TabsTrigger value="paie">Paie</TabsTrigger>
          <TabsTrigger value="carburant">Carburant</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="encoding">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationEncoding />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="planning">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationPlanning />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="budget">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationBudget />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="notifications">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationNotifications />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationDashboard />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="onboarding">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationOnboarding />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="chat">
          <Suspense fallback={<div>Chargement...</div>}>
            <Chatbox />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="ats">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationATS />
          </Suspense>
        </TabsContent>
        
        <TabsContent value="paie">
          <Suspense fallback={<div>Chargement...</div>}>
            <FormationPaie />
          </Suspense>
        </TabsContent>

        <TabsContent value="carburant">
          <Suspense fallback={<div>Chargement...</div>}>
            <CarburantDashboard />
          </Suspense>
        </TabsContent>

        <TabsContent value="transactions">
          <Suspense fallback={<div>Chargement...</div>}>
            <CarburantTransactions 
              employeId="1"
              employeNom="Marie Dupont"
              transactions={transactionsSimulees}
            />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  )
}
