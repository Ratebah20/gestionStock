// app/intervention-search/page.tsx
"use client"

import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Calendar, 
  FileText, 
  UserCheck,
  Filter,
  Download
} from "lucide-react"

export default function InterventionSearch() {
  // Données fictives pour les interventions
  const interventions = [
    { 
      id: "INT-2504", 
      client: "Orange Business", 
      nom: "Dupont Jean", 
      adresse: "12 Rue de la Paix, 75001 Paris", 
      reference: "REF-9876", 
      etat: "Terminée", 
      dateCreation: "22/04/2025", 
      dateIntervention: "24/04/2025", 
      technicien: "Martin Thomas", 
      pv: "Disponible" 
    },
    { 
      id: "INT-2502", 
      client: "Orange Pro", 
      nom: "Martin Sophie", 
      adresse: "45 Avenue Victor Hugo, 75016 Paris", 
      reference: "REF-9875", 
      etat: "En cours", 
      dateCreation: "21/04/2025", 
      dateIntervention: "23/04/2025", 
      technicien: "Dubois Pierre", 
      pv: "En attente" 
    },
    { 
      id: "INT-2498", 
      client: "Orange Retail", 
      nom: "Petit Thomas", 
      adresse: "8 Boulevard Haussmann, 75009 Paris", 
      reference: "REF-9870", 
      etat: "En attente", 
      dateCreation: "20/04/2025", 
      dateIntervention: "22/04/2025", 
      technicien: "Leroy Julie", 
      pv: "Non disponible" 
    },
    { 
      id: "INT-2495", 
      client: "Orange Entreprise", 
      nom: "Richard Marie", 
      adresse: "27 Rue des Fleurs, 69001 Lyon", 
      reference: "REF-9865", 
      etat: "Terminée", 
      dateCreation: "19/04/2025", 
      dateIntervention: "22/04/2025", 
      technicien: "Moreau Eric", 
      pv: "Disponible" 
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Recherche d'interventions</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex gap-3">
              <OrangeButton variant="outline" className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30">
                <Filter className="h-4 w-4" />
                Filtres avancés
              </OrangeButton>
              <OrangeButton className="flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white self-start md:self-auto">
                <Download className="h-4 w-4" />
                Exporter
              </OrangeButton>
            </div>
          </div>
          
          {/* Formulaire de recherche */}
          <Card className="p-6 border-orange-800/30 bg-gray-800/50 backdrop-blur mb-8">
            <div className="pb-3 border-b border-orange-800/30 mb-4">
              <h3 className="text-xl text-orange-500 font-medium">Recherche Intervention</h3>
            </div>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Numéro d'intervention :</label>
                  <Input 
                    type="text" 
                    placeholder="Entrer le numéro" 
                    className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Référence produit :</label>
                  <Input 
                    type="text" 
                    placeholder="Entrer la référence" 
                    className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Nom client :</label>
                  <Input 
                    type="text" 
                    placeholder="Entrer le nom" 
                    className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Numéro de téléphone :</label>
                  <Input 
                    type="tel" 
                    placeholder="Entrer le numéro" 
                    className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Client :</label>
                  <Input 
                    type="text" 
                    placeholder="Entrer le client" 
                    className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-orange-400">Date d'intervention :</label>
                  <div className="flex">
                    <Input 
                      type="text" 
                      placeholder="jj/mm/aaaa" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                    <OrangeButton variant="ghost" size="icon" className="ml-1 text-orange-500 hover:bg-orange-950/50">
                      <Calendar className="h-4 w-4" />
                    </OrangeButton>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <OrangeButton className="flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white px-6">
                  <Search className="h-4 w-4" />
                  Rechercher
                </OrangeButton>
              </div>
            </div>
          </Card>

          {/* Tableau des résultats */}
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur">
            <div className="flex items-center px-6 py-4 border-b border-orange-800/30">
              <UserCheck className="text-orange-500 mr-2" />
              <h2 className="text-xl font-semibold text-orange-500">Résultats de recherche</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-800/30 bg-orange-950/30">
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Intervention</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Client</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Nom</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Adresse</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Référence</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">État</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Date création</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Date intervention</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Technicien</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">PV</th>
                    <th className="py-3 px-4 text-left font-medium text-orange-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {interventions.length > 0 ? (
                    interventions.map((intervention, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="py-3 px-4 text-gray-300">{intervention.id}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.client}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.nom}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.adresse}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.reference}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            intervention.etat === 'Terminée' 
                              ? 'bg-green-900/30 text-green-400' 
                              : intervention.etat === 'En cours' 
                                ? 'bg-blue-900/30 text-blue-400' 
                                : 'bg-yellow-900/30 text-yellow-400'
                          }`}>
                            {intervention.etat}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-300">{intervention.dateCreation}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.dateIntervention}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.technicien}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            intervention.pv === 'Disponible' 
                              ? 'bg-green-900/30 text-green-400' 
                              : intervention.pv === 'En attente' 
                                ? 'bg-blue-900/30 text-blue-400' 
                                : 'bg-red-900/30 text-red-400'
                          }`}>
                            {intervention.pv}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <OrangeButton variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 p-0 h-auto">
                            <FileText className="h-4 w-4 mr-1" />
                            Détails
                          </OrangeButton>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="text-center py-6 text-gray-400">
                        Aucune donnée disponible
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </main>
      </div>
    </div>
  )
}
