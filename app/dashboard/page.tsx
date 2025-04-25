// app/dashboard/page.tsx
"use client"

import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { MetricsCard } from "@/components/metrics-card"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { 
  Package, 
  Plus, 
  ArrowUpRight, 
  BarChart3, 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  UserCheck 
} from "lucide-react"
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend 
} from "recharts"

export default function Dashboard() {
  // Données fictives pour les graphiques
  const stockMovementData = [
    { date: '01/04', entrees: 24, sorties: 18 },
    { date: '02/04', entrees: 13, sorties: 22 },
    { date: '03/04', entrees: 28, sorties: 19 },
    { date: '04/04', entrees: 39, sorties: 27 },
    { date: '05/04', entrees: 34, sorties: 42 },
    { date: '06/04', entrees: 51, sorties: 28 },
    { date: '07/04', entrees: 47, sorties: 45 },
  ];

  const stockByProductData = [
    { name: 'ONT XS-010X', stock: 136 },
    { name: 'Livebox 6', stock: 98 },
    { name: 'BBox Miami', stock: 86 },
    { name: 'ONT G-240W', stock: 62 },
    { name: 'Répéteur Wifi', stock: 41 },
  ];

  // Données des interventions récentes
  const recentInterventions = [
    { id: "INT-2504", client: "Dupont Jean", produit: "ONT XS-010X-Q", date: "24/04/2025", status: "Terminée" },
    { id: "INT-2502", client: "Martin Sophie", produit: "Livebox 6", date: "23/04/2025", status: "En cours" },
    { id: "INT-2498", client: "Petit Thomas", produit: "BBox Miami", date: "22/04/2025", status: "En attente" },
    { id: "INT-2495", client: "Richard Marie", produit: "ONT G-240W", date: "22/04/2025", status: "Terminée" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Tableau de bord</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <OrangeButton className="flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white self-start md:self-auto">
              <Plus className="h-4 w-4" />
              Nouveau Produit
            </OrangeButton>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="p-5 rounded-lg border border-orange-800/30 bg-gray-800/50 backdrop-blur hover:shadow-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-300">Articles en stock</h3>
                  <p className="text-2xl font-bold text-white mt-2">423</p>
                  <p className="text-sm text-orange-500 mt-1">+5% ce mois</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-950/50 flex items-center justify-center">
                  <Package className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-lg border border-orange-800/30 bg-gray-800/50 backdrop-blur hover:shadow-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-300">Sorties récentes</h3>
                  <p className="text-2xl font-bold text-white mt-2">45</p>
                  <p className="text-sm text-gray-400 mt-1">Dernières 24h</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-950/50 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-lg border border-orange-800/30 bg-gray-800/50 backdrop-blur hover:shadow-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-300">Commandes en attente</h3>
                  <p className="text-2xl font-bold text-white mt-2">12</p>
                  <p className="text-sm text-gray-400 mt-1">5 prioritaires</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-950/50 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
            
            <div className="p-5 rounded-lg border border-orange-800/30 bg-gray-800/50 backdrop-blur hover:shadow-lg">
              <div className="flex justify-between">
                <div>
                  <h3 className="text-base font-medium text-gray-300">Alertes de stock</h3>
                  <p className="text-2xl font-bold text-white mt-2">3</p>
                  <p className="text-sm text-gray-400 mt-1">Produits à commander</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-orange-950/50 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Graphiques */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card className="p-6 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-orange-500">Mouvements de stock</h2>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                    <span className="text-gray-300">Entrées</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-300 mr-1"></div>
                    <span className="text-gray-300">Sorties</span>
                  </div>
                </div>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockMovementData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="date" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }} 
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Line type="monotone" dataKey="entrees" stroke="#FF7900" strokeWidth={2} />
                    <Line type="monotone" dataKey="sorties" stroke="#FFA366" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <Card className="p-6 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center mb-4">
                <BarChart3 className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-orange-500">Stock par produit</h2>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockByProductData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                    <XAxis dataKey="name" stroke="#999" />
                    <YAxis stroke="#999" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#333', borderColor: '#555', color: '#fff' }} 
                      itemStyle={{ color: '#fff' }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="stock" fill="#FF7900" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Tableaux */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="col-span-1 lg:col-span-2 p-6 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center mb-4">
                <UserCheck className="text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-orange-500">Interventions récentes</h2>
              </div>
              
              <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-800/30 bg-orange-950/30">
                      <th className="py-3 px-4 text-left font-medium text-orange-500">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-orange-500">Client</th>
                      <th className="py-3 px-4 text-left font-medium text-orange-500">Produit</th>
                      <th className="py-3 px-4 text-left font-medium text-orange-500">Date</th>
                      <th className="py-3 px-4 text-left font-medium text-orange-500">Statut</th>
                      <th className="py-3 px-4 text-left font-medium text-orange-500">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInterventions.map((intervention, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="py-3 px-4 text-gray-300">{intervention.id}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.client}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.produit}</td>
                        <td className="py-3 px-4 text-gray-300">{intervention.date}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${intervention.status === 'Terminée' ? 'bg-green-900/30 text-green-400' : intervention.status === 'En cours' ? 'bg-blue-900/30 text-blue-400' : 'bg-yellow-900/30 text-yellow-400'}`}>
                            {intervention.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <OrangeButton variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 p-0 h-auto">
                            Détails
                          </OrangeButton>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            <Card className="p-6 border-orange-800/30 bg-gray-800/50">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-orange-500">Top Produits</h2>
                <OrangeButton variant="ghost" size="sm" className="gap-1 text-orange-500 hover:bg-orange-950/50 hover:text-orange-400">
                  Voir tout <ArrowUpRight className="h-3 w-3" />
                </OrangeButton>
              </div>
              
              <div className="space-y-4">
                {stockByProductData.map((product, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-orange-950/30 border border-transparent hover:border-orange-800/30 transition-colors">
                    <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                      <Package className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-200">{product.name}</h4>
                      <p className="text-sm text-gray-400">{product.stock} unités</p>
                    </div>
                    <div className="text-right">
                      <span className="font-medium text-orange-500">
                        <TrendingUp className="h-4 w-4 inline-block mr-1" />
                        {Math.floor(product.stock / 10)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
