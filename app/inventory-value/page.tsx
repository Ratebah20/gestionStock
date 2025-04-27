// app/inventory-value/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { 
  CreditCard, 
  Download, 
  Filter, 
  Calculator, 
  RefreshCw,
  Info
} from "lucide-react"

export default function InventoryValue() {
  const [calculationMethod, setCalculationMethod] = useState('fifo');
  const [timeframe, setTimeframe] = useState('month');
  const [showDetails, setShowDetails] = useState(false);
  
  // Données fictives pour la valeur du stock
  const stockValueData = [
    { date: 'Jan', value: 268500 },
    { date: 'Fév', value: 295200 },
    { date: 'Mar', value: 287400 },
    { date: 'Avr', value: 312000 },
    { date: 'Mai', value: 328500 },
    { date: 'Juin', value: 340200 },
  ];
  
  // Données fictives pour la répartition de la valeur par catégorie
  const categoryValueData = [
    { name: 'Équipements réseau', value: 185000 },
    { name: 'Terminaux', value: 95000 },
    { name: 'Accessoires', value: 42000 },
    { name: 'Pièces détachées', value: 18200 },
  ];
  
  // Données fictives pour les produits de plus grande valeur
  const topValueProducts = [
    { id: 1, reference: '20002', name: 'ONT XS-010X-Q Post Orange', quantity: 136, unitPrice: 380, totalValue: 51680 },
    { id: 2, reference: '20003', name: 'Livebox 6', quantity: 98, unitPrice: 420, totalValue: 41160 },
    { id: 3, reference: '20004', name: 'BBox Miami', quantity: 86, unitPrice: 350, totalValue: 30100 },
    { id: 4, reference: '20005', name: 'ONT G-240W', quantity: 62, unitPrice: 310, totalValue: 19220 },
    { id: 5, reference: '20006', name: 'Répéteur Wifi', quantity: 41, unitPrice: 85, totalValue: 3485 },
  ];
  
  const COLORS = ['#ff7900', '#4f46e5', '#10b981', '#f97316', '#8b5cf6'];
  
  // Méthodes de calcul disponibles
  const calculationMethods = [
    { id: 'fifo', name: 'FIFO (Premier entré, premier sorti)', description: 'Utilise le coût des articles les plus anciens en premier' },
    { id: 'lifo', name: 'LIFO (Dernier entré, premier sorti)', description: 'Utilise le coût des articles les plus récents en premier' },
    { id: 'average', name: 'Coût moyen pondéré', description: 'Utilise la moyenne des coûts de tous les articles' },
  ];
  
  const getMethodDescription = (methodId) => {
    return calculationMethods.find(method => method.id === methodId)?.description;
  };
  
  // Formater les valeurs monétaires
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  };
  
  // Total de la valeur du stock
  const totalStockValue = categoryValueData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Valeur du stock</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <OrangeButton 
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Download className="h-4 w-4" />
              Exporter les données
            </OrangeButton>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <CreditCard className="h-6 w-6 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">Calcul de la valeur du stock</h2>
              </div>
              <div className="flex space-x-2">
                <OrangeButton 
                  variant="outline" 
                  className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                  onClick={() => setShowDetails(!showDetails)}
                >
                  {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
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
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Méthode de calcul</label>
                <select 
                  className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                  value={calculationMethod}
                  onChange={(e) => setCalculationMethod(e.target.value)}
                >
                  {calculationMethods.map(method => (
                    <option key={method.id} value={method.id}>{method.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-400">{getMethodDescription(calculationMethod)}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Période</label>
                <div className="flex space-x-2">
                  <OrangeButton 
                    variant={timeframe === 'month' ? 'default' : 'outline'} 
                    className={timeframe === 'month' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setTimeframe('month')}
                    size="sm"
                  >
                    6 mois
                  </OrangeButton>
                  <OrangeButton 
                    variant={timeframe === 'quarter' ? 'default' : 'outline'} 
                    className={timeframe === 'quarter' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setTimeframe('quarter')}
                    size="sm"
                  >
                    4 trimestres
                  </OrangeButton>
                  <OrangeButton 
                    variant={timeframe === 'year' ? 'default' : 'outline'} 
                    className={timeframe === 'year' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setTimeframe('year')}
                    size="sm"
                  >
                    2 ans
                  </OrangeButton>
                </div>
              </div>
              <div className="flex items-end">
                <OrangeButton 
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <Calculator className="h-4 w-4" />
                  Recalculer
                </OrangeButton>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 border-orange-800/30 bg-gray-800/50">
                <h3 className="text-lg font-medium mb-4 text-white">Valeur totale du stock</h3>
                <div className="flex items-center justify-center h-40">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">{formatCurrency(totalStockValue)}</div>
                    <div className="text-sm text-gray-400 mt-2">au 24/04/2025</div>
                    <div className="text-sm text-green-400 mt-1 flex items-center justify-center">
                      <RefreshCw className="h-3 w-3 mr-1" />
                      +5.8% vs mois précédent
                    </div>
                  </div>
                </div>
                <div className="border-t border-orange-800/30 pt-4 mt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Méthode utilisée:</span>
                    <span className="font-medium text-white">{calculationMethods.find(m => m.id === calculationMethod).name}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-gray-400">Dernière mise à jour:</span>
                    <span className="font-medium text-white">24/04/2025 08:45</span>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 border-orange-800/30 bg-gray-800/50">
                <h3 className="text-lg font-medium mb-4 text-white">Évolution de la valeur</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockValueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9ca3af" />
                      <YAxis 
                        stroke="#9ca3af"
                        tickFormatter={(value) => new Intl.NumberFormat('fr-FR', {
                          notation: 'compact',
                          compactDisplay: 'short',
                          currency: 'EUR'
                        }).format(value)}
                      />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#ff7900', color: '#fff' }}
                        formatter={(value) => new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(value)}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#ff7900" 
                        strokeWidth={2} 
                        name="Valeur du stock" 
                        dot={{ fill: '#ff7900' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <Card className="p-6 border-orange-800/30 bg-gray-800/50">
                <h3 className="text-lg font-medium mb-4 text-white">Répartition par catégorie</h3>
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryValueData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryValueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#ff7900', color: '#fff' }}
                        formatter={(value) => new Intl.NumberFormat('fr-FR', {
                          style: 'currency',
                          currency: 'EUR'
                        }).format(value)}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </Card>
              
              <Card className="p-6 border-orange-800/30 bg-gray-800/50">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-white">Top 5 produits par valeur</h3>
                  <OrangeButton 
                    variant="outline" 
                    size="sm" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                  >
                    Voir tout
                  </OrangeButton>
                </div>
                <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-800/30 bg-orange-950/30">
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Référence</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                        <th className="px-4 py-3 text-right font-medium text-orange-500">Quantité</th>
                        <th className="px-4 py-3 text-right font-medium text-orange-500">Prix unitaire</th>
                        <th className="px-4 py-3 text-right font-medium text-orange-500">Valeur totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topValueProducts.map((product) => (
                        <tr key={product.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                          <td className="px-4 py-3 text-gray-300">{product.reference}</td>
                          <td className="px-4 py-3 text-gray-300">{product.name}</td>
                          <td className="px-4 py-3 text-right text-gray-300">{product.quantity}</td>
                          <td className="px-4 py-3 text-right text-gray-300">{formatCurrency(product.unitPrice)}</td>
                          <td className="px-4 py-3 text-right font-medium text-white">{formatCurrency(product.totalValue)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            </div>
            
            {showDetails && (
              <div>
                <h3 className="text-lg font-medium mt-8 mb-4 text-white">Détails des méthodes de calcul</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {calculationMethods.map((method) => (
                    <Card 
                      key={method.id} 
                      className={`p-4 border-orange-800/30 bg-gray-800/50 ${method.id === calculationMethod ? 'ring-2 ring-orange-500' : ''}`}
                    >
                      <h4 className="font-medium text-white">{method.name}</h4>
                      <p className="text-sm text-gray-300 mt-2">{method.description}</p>
                      <div className="mt-4">
                        <OrangeButton 
                          variant={method.id === calculationMethod ? 'default' : 'outline'}
                          className={method.id === calculationMethod 
                            ? 'bg-orange-500 hover:bg-orange-600 text-white w-full' 
                            : 'border-orange-500 text-orange-500 hover:bg-orange-950/30 w-full'}
                          onClick={() => setCalculationMethod(method.id)}
                        >
                          {method.id === calculationMethod ? 'Méthode sélectionnée' : 'Sélectionner'}
                        </OrangeButton>
                      </div>
                    </Card>
                  ))}
                </div>
                
                <Card className="mt-6 p-4 border-yellow-800/30 bg-yellow-950/20">
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-950/50 text-yellow-500 p-2 rounded-md mt-0.5">
                      <Info className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-yellow-500 mb-2">Impact des méthodes de calcul</h3>
                      <p className="text-sm text-yellow-300">
                        En période d'inflation, la méthode FIFO tend à montrer des profits plus élevés car le coût des articles anciens est généralement plus bas.
                        La méthode LIFO, à l'inverse, reflète mieux les coûts de remplacement actuels, mais peut sous-évaluer le stock au bilan.
                        Le coût moyen pondéré offre un équilibre entre ces approches.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            )}
            
            <Card className="mt-6 p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-start gap-3">
                <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-orange-500 mb-2">À propos du calcul de la valeur du stock</h3>
                  <p className="text-sm text-gray-300">
                    Le calcul de la valeur du stock est essentiel pour le suivi financier et comptable de l'entreprise.
                    Il permet d'évaluer le capital immobilisé dans les stocks et d'optimiser les décisions d'achat et de réapprovisionnement.
                    Différentes méthodes de calcul sont disponibles selon les besoins comptables et les réglementations.
                  </p>
                </div>
              </div>
            </Card>
          </Card>
        </main>
      </div>
    </div>
  );
}
