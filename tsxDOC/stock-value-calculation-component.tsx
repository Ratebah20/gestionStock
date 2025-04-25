import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CreditCard, Download, Filter, Calculator, RefreshCw } from 'lucide-react';

const StockValueCalculation = () => {
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
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <CreditCard className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Calcul de la valeur du stock</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? 'Masquer les détails' : 'Afficher les détails'}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Méthode de calcul</label>
            <select 
              className="w-full rounded-md border border-gray-300 py-2 px-3"
              value={calculationMethod}
              onChange={(e) => setCalculationMethod(e.target.value)}
            >
              {calculationMethods.map(method => (
                <option key={method.id} value={method.id}>{method.name}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500">{getMethodDescription(calculationMethod)}</p>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Période</label>
            <div className="flex space-x-2">
              <Button 
                variant={timeframe === 'month' ? 'default' : 'outline'} 
                className={timeframe === 'month' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setTimeframe('month')}
                size="sm"
              >
                6 mois
              </Button>
              <Button 
                variant={timeframe === 'quarter' ? 'default' : 'outline'} 
                className={timeframe === 'quarter' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setTimeframe('quarter')}
                size="sm"
              >
                4 trimestres
              </Button>
              <Button 
                variant={timeframe === 'year' ? 'default' : 'outline'} 
                className={timeframe === 'year' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setTimeframe('year')}
                size="sm"
              >
                2 ans
              </Button>
            </div>
          </div>
          <div className="flex items-end">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full">
              <Calculator className="mr-2 h-4 w-4" />
              Recalculer
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Valeur totale du stock</h3>
            <div className="flex items-center justify-center h-40">
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500">{formatCurrency(totalStockValue)}</div>
                <div className="text-sm text-gray-500 mt-2">au 24/04/2025</div>
                <div className="text-sm text-green-600 mt-1 flex items-center justify-center">
                  <RefreshCw className="h-3 w-3 mr-1" />
                  +5.8% vs mois précédent
                </div>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Méthode utilisée:</span>
                <span className="font-medium">{calculationMethods.find(m => m.id === calculationMethod).name}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-gray-600">Dernière mise à jour:</span>
                <span className="font-medium">24/04/2025 08:45</span>
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Évolution de la valeur</h3>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stockValueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis 
                    tickFormatter={(value) => new Intl.NumberFormat('fr-FR', {
                      notation: 'compact',
                      compactDisplay: 'short',
                      currency: 'EUR'
                    }).format(value)}
                  />
                  <Tooltip 
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
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-4">Répartition par catégorie</h3>
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
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Top 5 produits par valeur</h3>
              <Button variant="outline" size="sm">Voir tout</Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-2 py-2 text-left">Référence</th>
                    <th className="px-2 py-2 text-left">Produit</th>
                    <th className="px-2 py-2 text-right">Quantité</th>
                    <th className="px-2 py-2 text-right">Prix unitaire</th>
                    <th className="px-2 py-2 text-right">Valeur totale</th>
                  </tr>
                </thead>
                <tbody>
                  {topValueProducts.map((product) => (
                    <tr key={product.id} className="border-b">
                      <td className="px-2 py-2">{product.reference}</td>
                      <td className="px-2 py-2">{product.name}</td>
                      <td className="px-2 py-2 text-right">{product.quantity}</td>
                      <td className="px-2 py-2 text-right">{formatCurrency(product.unitPrice)}</td>
                      <td className="px-2 py-2 text-right font-medium">{formatCurrency(product.totalValue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        
        {showDetails && (
          <div>
            <h3 className="text-lg font-medium mt-8 mb-4">Détails des méthodes de calcul</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {calculationMethods.map((method) => (
                <Card key={method.id} className={`p-4 ${method.id === calculationMethod ? 'border-orange-500 border-2' : ''}`}>
                  <h4 className="font-medium">{method.name}</h4>
                  <p className="text-sm text-gray-600 mt-2">{method.description}</p>
                  <div className="mt-4">
                    <Button 
                      variant={method.id === calculationMethod ? 'default' : 'outline'}
                      className={method.id === calculationMethod ? 'bg-orange-500 hover:bg-orange-600 w-full' : 'w-full'}
                      onClick={() => setCalculationMethod(method.id)}
                    >
                      {method.id === calculationMethod ? 'Méthode sélectionnée' : 'Sélectionner'}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-md">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300 mb-2">Impact des méthodes de calcul</h3>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                En période d'inflation, la méthode FIFO tend à montrer des profits plus élevés car le coût des articles anciens est généralement plus bas.
                La méthode LIFO, à l'inverse, reflète mieux les coûts de remplacement actuels, mais peut sous-évaluer le stock au bilan.
                Le coût moyen pondéré offre un équilibre entre ces approches.
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">À propos du calcul de la valeur du stock</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Le calcul de la valeur du stock est essentiel pour le suivi financier et comptable de l'entreprise.
            Il permet d'évaluer le capital immobilisé dans les stocks et d'optimiser les décisions d'achat et de réapprovisionnement.
            Différentes méthodes de calcul sont disponibles selon les besoins comptables et les réglementations.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StockValueCalculation;