// app/inventory-forecast/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  TrendingUp, 
  Calendar, 
  Filter, 
  Download,
  ShoppingCart,
  BarChart,
  Info
} from "lucide-react"

export default function InventoryForecast() {
  // Données fictives pour les prévisions
  const [predictionPeriod, setPredictionPeriod] = useState('4');
  const productOptions = ['Tous les produits', 'ONT XS-010X-Q', 'Livebox 6', 'BBox Miami', 'ONT G-240W', 'Répéteur Wifi'];
  const [selectedProduct, setSelectedProduct] = useState(productOptions[0]);
  
  // Données historiques et prévisions
  const stockData = [
    // Données historiques (3 derniers mois)
    { month: 'Jan', stock: 120, type: 'historique' },
    { month: 'Fév', stock: 145, type: 'historique' },
    { month: 'Mar', stock: 132, type: 'historique' },
    // Prévisions (4 prochains mois)
    { month: 'Avr', stock: 128, type: 'prévision' },
    { month: 'Mai', stock: 142, type: 'prévision' },
    { month: 'Juin', stock: 156, type: 'prévision' },
    { month: 'Juil', stock: 138, type: 'prévision' },
  ];
  
  // Sorties prévues pour les mois à venir
  const outboundPredictions = [
    { produit: 'ONT XS-010X-Q', avril: 48, mai: 52, juin: 42, juillet: 55 },
    { produit: 'Livebox 6', avril: 36, mai: 28, juin: 33, juillet: 30 },
    { produit: 'BBox Miami', avril: 22, mai: 18, juin: 25, juillet: 20 },
    { produit: 'ONT G-240W', avril: 15, mai: 22, juin: 18, juillet: 16 },
    { produit: 'Répéteur Wifi', avril: 28, mai: 31, juin: 26, juillet: 33 },
  ];
  
  // Fonction pour obtenir la classe CSS en fonction du statut de commande
  const getOrderStatusClass = (value) => {
    if (value > 70) return 'bg-red-900/30 text-red-400';
    if (value > 50) return 'bg-yellow-900/30 text-yellow-400';
    return 'bg-green-900/30 text-green-400';
  };
  
  // Fonction pour obtenir le texte du statut de commande
  const getOrderStatusText = (value) => {
    if (value > 70) return 'Urgent';
    if (value > 50) return 'À prévoir';
    return 'Stock suffisant';
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Prévisions de stock</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <OrangeButton 
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Calendar className="h-4 w-4" />
                Planning
              </OrangeButton>
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
              >
                <Download className="h-4 w-4" />
                Exporter
              </OrangeButton>
            </div>
          </div>
          
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                  <BarChart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Produits suivis</p>
                  <h3 className="text-xl font-bold text-white">{outboundPredictions.length}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-red-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-950/50 text-red-500 p-2 rounded-md">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Commandes urgentes</p>
                  <h3 className="text-xl font-bold text-white">
                    {outboundPredictions.filter(item => (item.avril + item.mai) > 70).length}
                  </h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-yellow-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-950/50 text-yellow-500 p-2 rounded-md">
                  <ShoppingCart className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Commandes à prévoir</p>
                  <h3 className="text-xl font-bold text-white">
                    {outboundPredictions.filter(item => (item.avril + item.mai) > 50 && (item.avril + item.mai) <= 70).length}
                  </h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-green-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-950/50 text-green-500 p-2 rounded-md">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Stock suffisant</p>
                  <h3 className="text-xl font-bold text-white">
                    {outboundPredictions.filter(item => (item.avril + item.mai) <= 50).length}
                  </h3>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">Prévisions de stock</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Dernière mise à jour: </span>
                <span className="text-sm text-white">27/04/2025 10:15</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-orange-400">Produit</label>
                <select 
                  className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  {productOptions.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Période de prévision</label>
                <select 
                  className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                  value={predictionPeriod}
                  onChange={(e) => setPredictionPeriod(e.target.value)}
                >
                  <option value="1">1 mois</option>
                  <option value="2">2 mois</option>
                  <option value="3">3 mois</option>
                  <option value="4">4 mois</option>
                  <option value="6">6 mois</option>
                  <option value="12">12 mois</option>
                </select>
              </div>
              <div className="flex items-end">
                <OrangeButton 
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <Filter className="h-4 w-4" />
                  Appliquer les filtres
                </OrangeButton>
              </div>
            </div>
            
            <Card className="border-orange-800/30 bg-gray-800/50 p-4 mb-6">
              <h3 className="text-md font-medium mb-4 text-white">Évolution et prédiction des niveaux de stock</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1f2937', borderColor: '#ff7900', color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="stock" 
                      stroke="#ff7900" 
                      strokeWidth={2} 
                      dot={{ r: 6, fill: '#ff7900' }}
                      activeDot={{ r: 8, fill: '#ff7900' }}
                      connectNulls
                      name="Niveau de stock"
                      strokeDasharray={(d) => d.type === 'prévision' ? "5 5" : "0"}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
            
            <div>
              <h3 className="text-md font-medium mb-4 text-white">Sorties prévues pour les prochains mois</h3>
              <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-800/30 bg-orange-950/30">
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Avril</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Mai</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Juin</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Juillet</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">À commander</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outboundPredictions.map((item, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="px-4 py-3 font-medium text-gray-300">{item.produit}</td>
                        <td className="px-4 py-3 text-gray-300">{item.avril}</td>
                        <td className="px-4 py-3 text-gray-300">{item.mai}</td>
                        <td className="px-4 py-3 text-gray-300">{item.juin}</td>
                        <td className="px-4 py-3 text-gray-300">{item.juillet}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getOrderStatusClass(item.avril + item.mai)}`}>
                            {getOrderStatusText(item.avril + item.mai)}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
          
          {/* Section des recommandations */}
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 mb-6">
            <h2 className="text-xl font-semibold text-white mb-4">Recommandations d'approvisionnement</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-red-800/30 bg-red-950/10">
                <h3 className="font-medium text-red-400 mb-2">Commandes urgentes</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {outboundPredictions
                    .filter(item => (item.avril + item.mai) > 70)
                    .map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{item.produit}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-red-400">Besoin: {item.avril + item.mai}</span>
                          <OrangeButton 
                            size="sm" 
                            className="bg-red-500/80 hover:bg-red-600 text-white h-8"
                          >
                            Commander
                          </OrangeButton>
                        </div>
                      </li>
                    ))}
                </ul>
              </Card>
              
              <Card className="p-4 border-yellow-800/30 bg-yellow-950/10">
                <h3 className="font-medium text-yellow-400 mb-2">Commandes à prévoir</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {outboundPredictions
                    .filter(item => (item.avril + item.mai) > 50 && (item.avril + item.mai) <= 70)
                    .map((item, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <span>{item.produit}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-yellow-400">Besoin: {item.avril + item.mai}</span>
                          <OrangeButton 
                            size="sm" 
                            className="bg-yellow-500/80 hover:bg-yellow-600 text-white h-8"
                          >
                            Planifier
                          </OrangeButton>
                        </div>
                      </li>
                    ))}
                </ul>
              </Card>
            </div>
          </Card>
          
          <Card className="mt-6 p-4 border-orange-800/30 bg-gray-800/50">
            <div className="flex items-start gap-3">
              <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-orange-500 mb-2">Méthodologie de prévision</h3>
                <p className="text-sm text-gray-300">
                  Les prévisions sont calculées en utilisant un algorithme analysant l'historique des mouvements de stock sur les 12 derniers mois,
                  en tenant compte des tendances saisonnières et des pics de demande. La précision augmente avec la quantité de données historiques disponibles.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
