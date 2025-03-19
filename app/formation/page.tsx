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

export default function FormationPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Outil de Gestion des Formations</h1>
      
      <Tabs defaultValue="encoding" className="w-full">
        <TabsList className="grid grid-cols-6 mb-8">
          <TabsTrigger value="encoding">Encodage</TabsTrigger>
          <TabsTrigger value="planning">Planning Annuel</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="dashboard">Tableaux de Bord</TabsTrigger>
          <TabsTrigger value="onboarding">Onboarding</TabsTrigger>
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
      </Tabs>
    </div>
  )
}
