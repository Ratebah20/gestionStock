import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { TrendingUp, Calendar, Filter, Download } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const StockPredictions = () => {
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
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <TrendingUp className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Prévisions de stock</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Planning
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Produit</label>
            <select 
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              {productOptions.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Période de prévision</label>
            <select 
              className="w-full rounded-md border border-gray-300 py-2 px-3"
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
            <Button className="bg-orange-500 hover:bg-orange-600 w-full">
              <Filter className="mr-2 h-4 w-4" />
              Appliquer les filtres
            </Button>
          </div>
        </div>
        
        <div className="h-80 mb-8">
          <h3 className="text-md font-medium mb-4">Évolution et prédiction des niveaux de stock</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={stockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="stock" 
                stroke="#ff7900" 
                strokeWidth={2} 
                dot={{ r: 6 }}
                activeDot={{ r: 8 }}
                connectNulls
                name="Niveau de stock"
                strokeDasharray={(d) => d.type === 'prévision' ? "5 5" : "0"}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div>
          <h3 className="text-md font-medium mb-4">Sorties prévues pour les prochains mois</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Produit</th>
                  <th className="px-4 py-3 text-left">Avril</th>
                  <th className="px-4 py-3 text-left">Mai</th>
                  <th className="px-4 py-3 text-left">Juin</th>
                  <th className="px-4 py-3 text-left">Juillet</th>
                  <th className="px-4 py-3 text-left">À commander</th>
                </tr>
              </thead>
              <tbody>
                {outboundPredictions.map((item, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                    <td className="px-4 py-3 font-medium">{item.produit}</td>
                    <td className="px-4 py-3">{item.avril}</td>
                    <td className="px-4 py-3">{item.mai}</td>
                    <td className="px-4 py-3">{item.juin}</td>
                    <td className="px-4 py-3">{item.juillet}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        (item.avril + item.mai) > 70 ? 'bg-red-100 text-red-800' :
                        (item.avril + item.mai) > 50 ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {(item.avril + item.mai) > 70 ? 'Urgent' :
                         (item.avril + item.mai) > 50 ? 'À prévoir' : 'Stock suffisant'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Méthodologie de prévision</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Les prévisions sont calculées en utilisant un algorithme analysant l'historique des mouvements de stock sur les 12 derniers mois,
            en tenant compte des tendances saisonnières et des pics de demande. La précision augmente avec la quantité de données historiques disponibles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockPredictions;