// app/order-form/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { PlusCircle, Calendar, CheckCircle } from "lucide-react"

export default function OrderForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const goToNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Formulaire de commande</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 max-w-4xl mx-auto">
            <h2 className="text-xl text-center font-semibold text-orange-500 mb-6">
              ORANGE - Nouvelle Commande Client
            </h2>
            
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step === currentStep 
                        ? 'bg-orange-500 text-white' 
                        : step < currentStep 
                          ? 'bg-green-500/80 text-white' 
                          : 'bg-gray-700 text-gray-400'
                    }`}>
                      {step < currentStep ? <CheckCircle className="h-5 w-5" /> : step}
                    </div>
                    <div className="text-sm mt-2 text-center font-medium text-gray-300">
                      {step === 1 ? 'Création client' : step === 2 ? 'Commande' : 'Expédition'}
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative mt-2">
                <div className="absolute w-full top-0 h-1 bg-gray-700 z-0"></div>
                <div 
                  className="absolute top-0 h-1 bg-orange-500 z-10 transition-all duration-300"
                  style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {currentStep === 1 && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-orange-400">Étape 1 : création client</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Cust ID</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Prénom - Nom</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Adresse</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Code Postal</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Ville</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Téléphone client</label>
                    <Input 
                      type="tel" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Email</label>
                    <Input 
                      type="email" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Tracking ID</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <OrangeButton 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={goToNextStep}
                  >
                    Suivant
                  </OrangeButton>
                </div>
              </div>
            )}
            
            {currentStep === 2 && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-orange-400">Étape 2 : Commande</h3>
                <div className="border border-orange-800/30 bg-gray-800/30 p-4 mb-4 rounded-md">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-300">Référence</label>
                      <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 mt-1 focus:border-orange-500">
                        <option>...</option>
                        <option>20002 - ONT XS-010X-Q Post Orange</option>
                        <option>20003 - Livebox 6 Orange</option>
                        <option>20004 - Répéteur WiFi Orange</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">SN</label>
                      <Input 
                        type="text" 
                        className="mt-1 bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-300">QT</label>
                      <Input 
                        type="number" 
                        defaultValue="1" 
                        className="mt-1 bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <OrangeButton 
                      size="sm" 
                      className="bg-orange-500 hover:bg-orange-600 text-white"
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Ajouter
                    </OrangeButton>
                  </div>
                </div>
                
                <div className="rounded-md border border-orange-800/30 bg-gray-800/30 overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-800/30 bg-orange-950/30">
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Référence</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">SN</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Quantité</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Prix unitaire</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="px-4 py-3 text-gray-300">20002 - ONT XS-010X-Q Post Orange</td>
                        <td className="px-4 py-3 text-gray-300">SN2023456789</td>
                        <td className="px-4 py-3 text-gray-300">1</td>
                        <td className="px-4 py-3 text-gray-300">89,00 €</td>
                        <td className="px-4 py-3 text-gray-300">89,00 €</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr className="bg-orange-950/30">
                        <td colSpan={4} className="px-4 py-3 text-right font-medium text-orange-400">Total</td>
                        <td className="px-4 py-3 font-medium text-white">89,00 €</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
                
                <div className="flex justify-between mt-6">
                  <OrangeButton 
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                    onClick={goToPreviousStep}
                  >
                    Retour
                  </OrangeButton>
                  <OrangeButton 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                    onClick={goToNextStep}
                  >
                    Suivant
                  </OrangeButton>
                </div>
              </div>
            )}
            
            {currentStep === 3 && (
              <div>
                <h3 className="text-lg font-medium mb-4 text-orange-400">Étape 3 : Expédition</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Bon Transport</label>
                    <Input 
                      type="text" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300">Date Expédition</label>
                    <div className="flex">
                      <Input 
                        type="text" 
                        placeholder="jj/mm/aaaa" 
                        className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                      <OrangeButton 
                        variant="ghost" 
                        size="icon" 
                        className="ml-1 text-orange-500 hover:bg-orange-950/50"
                      >
                        <Calendar className="h-4 w-4" />
                      </OrangeButton>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 border border-orange-800/30 bg-gray-800/30 rounded-md">
                    <h4 className="font-medium text-orange-400 mb-3">Récapitulatif de la commande</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Informations client</h5>
                        <div className="text-sm text-gray-300">
                          <p>Cust ID: CL-2023-001</p>
                          <p>Jean Dupont</p>
                          <p>123 Rue de Paris</p>
                          <p>75001 Paris</p>
                          <p>Tél: 06 12 34 56 78</p>
                          <p>Email: jean.dupont@example.com</p>
                        </div>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-gray-400 mb-2">Détails de la commande</h5>
                        <div className="text-sm text-gray-300">
                          <p>Produit: ONT XS-010X-Q Post Orange</p>
                          <p>Quantité: 1</p>
                          <p>Prix total: 89,00 €</p>
                          <p>Date de commande: 24/04/2025</p>
                          <p>Tracking ID: TR-2023-0045</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <OrangeButton 
                    variant="outline"
                    className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                    onClick={goToPreviousStep}
                  >
                    Retour
                  </OrangeButton>
                  <OrangeButton 
                    className="bg-orange-500 hover:bg-orange-600 text-white"
                  >
                    Confirmer l'expédition
                  </OrangeButton>
                </div>
              </div>
            )}
          </Card>
        </main>
      </div>
    </div>
  );
}
