import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowUpDown, Download, Filter, BarChart2, Calendar } from 'lucide-react';

const StockRotationAnalysis = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [chartView, setChartView] = useState('bar');
  const [sortOrder, setSortOrder] = useState('desc'); // 'desc' ou 'asc'
  
  // Données fictives pour l'analyse de rotation
  const rotationData = [
    { id: 1, product: 'ONT XS-010X-Q', reference: '20002', stock: 136, sales: 87, rotationIndex: 0.64, category: 'A' },
    { id: 2, product: 'Livebox 6', reference: '20003', stock: 98, sales: 45, rotationIndex: 0.46, category: 'B' },
    { id: 3, product: 'BBox Miami', reference: '20004', stock: 86, sales: 26, rotationIndex: 0.30, category: 'C' },
    { id: 4, product: 'ONT G-240W', reference: '20005', stock: 62, sales: 52, rotationIndex: 0.84, category: 'A' },
    { id: 5, product: 'Répéteur Wifi', reference: '20006', stock: 41, sales: 38, rotationIndex: 0.93, category: 'A' },
    { id: 6, product: 'Câble fibre 5m', reference: '20007', stock: 120, sales: 35, rotationIndex: 0.29, category: 'C' },
    { id: 7, product: 'Adaptateur RJ45', reference: '20008', stock: 75, sales: 42, rotationIndex: 0.56, category: 'B' },
    { id: 8, product: 'Switch 8 ports', reference: '20009', stock: 35, sales: 18, rotationIndex: 0.51, category: 'B' },
  ];
  
  // Trier les données en fonction de l'indice de rotation
  const sortedData = [...rotationData].sort((a, b) => {
    if (sortOrder === 'desc') {
      return b.rotationIndex - a.rotationIndex;
    } else {
      return a.rotationIndex - b.rotationIndex;
    }
  });
  
  // Données pour le graphique en camembert par catégorie
  const getCategoryData = () => {
    const categories = { A: 0, B: 0, C: 0 };
    rotationData.forEach(item => {
      categories[item.category] += item.stock;
    });
    return Object.entries(categories).map(([name, value]) => ({ name, value }));
  };
  
  const COLORS = ['#ff7900', '#4f46e5', '#10b981'];
  
  // Fonction pour déterminer la classe CSS en fonction de l'indice de rotation
  const getRotationClass = (index) => {
    if (index >= 0.7) return 'bg-green-100 text-green-800';
    if (index >= 0.4) return 'bg-blue-100 text-blue-800';
    return 'bg-red-100 text-red-800';
  };
  
  // Fonction pour obtenir la description de la catégorie
  const getCategoryDescription = (category) => {
    switch (category) {
      case 'A': return 'Forte rotation';
      case 'B': return 'Rotation moyenne';
      case 'C': return 'Faible rotation';
      default: return '';
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  const toggleChartView = () => {
    setChartView(chartView === 'bar' ? 'pie' : 'bar');
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <ArrowUpDown className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Analyse de la rotation des stocks</h2>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" className="flex items-center" onClick={toggleChartView}>
              <BarChart2 className="mr-2 h-4 w-4" />
              {chartView === 'bar' ? 'Vue camembert' : 'Vue barres'}
            </Button>
            <Button variant="outline" className="flex items-center">
              <Download className="mr-2 h-4 w-4" />
              Exporter
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="md:col-span-2 space-y-2">
            <label className="text-sm font-medium">Période d'analyse</label>
            <div className="flex space-x-2">
              <Button 
                variant={periodFilter === 'month' ? 'default' : 'outline'} 
                className={periodFilter === 'month' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPeriodFilter('month')}
              >
                Mois
              </Button>
              <Button 
                variant={periodFilter === 'quarter' ? 'default' : 'outline'} 
                className={periodFilter === 'quarter' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPeriodFilter('quarter')}
              >
                Trimestre
              </Button>
              <Button 
                variant={periodFilter === 'year' ? 'default' : 'outline'} 
                className={periodFilter === 'year' ? 'bg-orange-500 hover:bg-orange-600' : ''}
                onClick={() => setPeriodFilter('year')}
              >
                Année
              </Button>
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Personnalisé
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Catégorie de produit</label>
            <select className="w-full rounded-md border border-gray-300 py-2 px-3">
              <option value="">Toutes les catégories</option>
              <option value="telecom">Télécommunications</option>
              <option value="network">Réseau</option>
              <option value="accessories">Accessoires</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="bg-blue-600 hover:bg-blue-700 w-full">
              <Filter className="mr-2 h-4 w-4" />
              Appliquer les filtres
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-blue-600">8.7</div>
            <div className="text-sm text-blue-700">Taux de rotation global</div>
            <div className="text-xs text-blue-600 mt-1">+1.2 vs période précédente</div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-md flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-green-600">37%</div>
            <div className="text-sm text-green-700">Produits à forte rotation</div>
            <div className="text-xs text-green-600 mt-1">Catégorie A</div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-md flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-red-600">25%</div>
            <div className="text-sm text-red-700">Produits à faible rotation</div>
            <div className="text-xs text-red-600 mt-1">Catégorie C</div>
          </div>
        </div>
        
        <div className="h-80 mb-8">
          {chartView === 'bar' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sortedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar name="Indice de rotation" dataKey="rotationIndex" fill="#ff7900" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={getCategoryData()}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {getCategoryData().map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Détails de rotation par produit</h3>
            <Button variant="ghost" onClick={toggleSortOrder} className="text-sm text-gray-600">
              Trier par {sortOrder === 'desc' ? '↓' : '↑'}
            </Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">Référence</th>
                  <th className="px-4 py-3 text-left">Produit</th>
                  <th className="px-4 py-3 text-left">Stock</th>
                  <th className="px-4 py-3 text-left">Ventes</th>
                  <th className="px-4 py-3 text-left">Indice de rotation</th>
                  <th className="px-4 py-3 text-left">Catégorie</th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="px-4 py-3">{item.reference}</td>
                    <td className="px-4 py-3">{item.product}</td>
                    <td className="px-4 py-3">{item.stock}</td>
                    <td className="px-4 py-3">{item.sales}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${getRotationClass(item.rotationIndex)}`}>
                        {item.rotationIndex.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        item.category === 'A' ? 'bg-green-100 text-green-800' :
                        item.category === 'B' ? 'bg-blue-100 text-blue-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.category} - {getCategoryDescription(item.category)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Comment interpréter les données</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc pl-5 space-y-1">
            <li><strong>Indice de rotation</strong> : Ratio entre les ventes et le stock moyen sur la période.</li>
            <li><strong>Catégorie A</strong> : Produits à forte rotation (indice ≥ 0.7) - Optimisez leur disponibilité.</li>
            <li><strong>Catégorie B</strong> : Produits à rotation moyenne (indice entre 0.4 et 0.7) - Stock équilibré.</li>
            <li><strong>Catégorie C</strong> : Produits à faible rotation (indice ≤ 0.4) - Réduisez les stocks ou envisagez des promotions.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StockRotationAnalysis;