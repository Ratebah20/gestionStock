// app/stock-rotation/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { 
  ArrowUpDown, 
  Download, 
  Filter, 
  BarChart2, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from "lucide-react"

export default function StockRotation() {
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
    if (index >= 0.7) return 'bg-green-900/30 text-green-400';
    if (index >= 0.4) return 'bg-blue-900/30 text-blue-400';
    return 'bg-red-900/30 text-red-400';
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
  
  // Fonction pour obtenir la classe CSS en fonction de la catégorie
  const getCategoryClass = (category) => {
    switch (category) {
      case 'A': return 'bg-green-900/30 text-green-400';
      case 'B': return 'bg-blue-900/30 text-blue-400';
      case 'C': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-800/50 text-gray-300';
    }
  };
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };
  
  const toggleChartView = () => {
    setChartView(chartView === 'bar' ? 'pie' : 'bar');
  };
  
  // Statistiques de rotation
  const rotationStats = {
    categoryA: rotationData.filter(item => item.category === 'A').length,
    categoryB: rotationData.filter(item => item.category === 'B').length,
    categoryC: rotationData.filter(item => item.category === 'C').length,
    total: rotationData.length
  };
  
  // Pourcentages par catégorie
  const categoryAPercent = Math.round((rotationStats.categoryA / rotationStats.total) * 100);
  const categoryBPercent = Math.round((rotationStats.categoryB / rotationStats.total) * 100);
  const categoryCPercent = Math.round((rotationStats.categoryC / rotationStats.total) * 100);

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Rotation des stocks</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                onClick={toggleChartView}
              >
                <BarChart2 className="h-4 w-4" />
                {chartView === 'bar' ? 'Vue camembert' : 'Vue barres'}
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
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-3xl font-bold text-orange-500">8.7</div>
                <div className="text-sm text-gray-300">Taux de rotation global</div>
                <div className="text-xs text-green-400 mt-1 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +1.2 vs période précédente
                </div>
              </div>
            </Card>
            <Card className="p-4 border-green-800/30 bg-gray-800/50">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-3xl font-bold text-green-500">{categoryAPercent}%</div>
                <div className="text-sm text-gray-300">Produits à forte rotation</div>
                <div className="text-xs text-green-400 mt-1">Catégorie A</div>
              </div>
            </Card>
            <Card className="p-4 border-red-800/30 bg-gray-800/50">
              <div className="flex flex-col items-center justify-center h-full">
                <div className="text-3xl font-bold text-red-500">{categoryCPercent}%</div>
                <div className="text-sm text-gray-300">Produits à faible rotation</div>
                <div className="text-xs text-red-400 mt-1 flex items-center">
                  <ArrowDownRight className="h-3 w-3 mr-1" />
                  Catégorie C
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <ArrowUpDown className="h-6 w-6 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">Analyse de la rotation des stocks</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Dernière mise à jour: </span>
                <span className="text-sm text-white">28/04/2025 00:00</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-orange-400">Période d'analyse</label>
                <div className="flex space-x-2">
                  <OrangeButton 
                    variant={periodFilter === 'month' ? 'default' : 'outline'} 
                    className={periodFilter === 'month' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setPeriodFilter('month')}
                  >
                    Mois
                  </OrangeButton>
                  <OrangeButton 
                    variant={periodFilter === 'quarter' ? 'default' : 'outline'} 
                    className={periodFilter === 'quarter' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setPeriodFilter('quarter')}
                  >
                    Trimestre
                  </OrangeButton>
                  <OrangeButton 
                    variant={periodFilter === 'year' ? 'default' : 'outline'} 
                    className={periodFilter === 'year' 
                      ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                      : 'border-orange-500 text-orange-500 hover:bg-orange-950/30'}
                    onClick={() => setPeriodFilter('year')}
                  >
                    Année
                  </OrangeButton>
                  <OrangeButton 
                    variant="outline" 
                    className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                  >
                    <Calendar className="h-4 w-4" />
                    Personnalisé
                  </OrangeButton>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Catégorie de produit</label>
                <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                  <option value="">Toutes les catégories</option>
                  <option value="telecom">Télécommunications</option>
                  <option value="network">Réseau</option>
                  <option value="accessories">Accessoires</option>
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
              <div className="h-80">
                {chartView === 'bar' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sortedData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="product" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#ff7900', color: '#fff' }}
                      />
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
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#1f2937', borderColor: '#ff7900', color: '#fff' }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-white">Détails de rotation par produit</h3>
                <OrangeButton 
                  variant="ghost" 
                  onClick={toggleSortOrder} 
                  className="text-sm text-orange-500 hover:bg-orange-950/30"
                >
                  Trier par {sortOrder === 'desc' ? '↓' : '↑'}
                </OrangeButton>
              </div>
              <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-orange-800/30 bg-orange-950/30">
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Référence</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Stock</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Ventes</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Indice de rotation</th>
                      <th className="px-4 py-3 text-left font-medium text-orange-500">Catégorie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.map((item) => (
                      <tr key={item.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="px-4 py-3 text-gray-300">{item.reference}</td>
                        <td className="px-4 py-3 text-gray-300">{item.product}</td>
                        <td className="px-4 py-3 text-gray-300">{item.stock}</td>
                        <td className="px-4 py-3 text-gray-300">{item.sales}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getRotationClass(item.rotationIndex)}`}>
                            {item.rotationIndex.toFixed(2)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getCategoryClass(item.category)}`}>
                            {item.category} - {getCategoryDescription(item.category)}
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
            <h2 className="text-xl font-semibold text-white mb-4">Recommandations d'optimisation</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 border-green-800/30 bg-green-950/10">
                <h3 className="font-medium text-green-400 mb-2">Produits à forte rotation (A)</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {rotationData
                    .filter(item => item.category === 'A')
                    .map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.product}</span>
                        <span className="font-medium text-green-400">{item.rotationIndex.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Recommandation: Optimisez la disponibilité et les niveaux de réapprovisionnement.</p>
                </div>
              </Card>
              
              <Card className="p-4 border-blue-800/30 bg-blue-950/10">
                <h3 className="font-medium text-blue-400 mb-2">Produits à rotation moyenne (B)</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {rotationData
                    .filter(item => item.category === 'B')
                    .map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.product}</span>
                        <span className="font-medium text-blue-400">{item.rotationIndex.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Recommandation: Maintenez un stock équilibré et surveillez les tendances.</p>
                </div>
              </Card>
              
              <Card className="p-4 border-red-800/30 bg-red-950/10">
                <h3 className="font-medium text-red-400 mb-2">Produits à faible rotation (C)</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {rotationData
                    .filter(item => item.category === 'C')
                    .map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span>{item.product}</span>
                        <span className="font-medium text-red-400">{item.rotationIndex.toFixed(2)}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-4 text-xs text-gray-400">
                  <p>Recommandation: Réduisez les stocks ou envisagez des promotions pour accélérer l'écoulement.</p>
                </div>
              </Card>
            </div>
          </Card>
          
          <Card className="mt-6 p-4 border-orange-800/30 bg-gray-800/50">
            <div className="flex items-start gap-3">
              <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-orange-500 mb-2">Comment interpréter les données</h3>
                <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                  <li><strong>Indice de rotation</strong> : Ratio entre les ventes et le stock moyen sur la période.</li>
                  <li><strong>Catégorie A</strong> : Produits à forte rotation (indice ≥ 0.7) - Optimisez leur disponibilité.</li>
                  <li><strong>Catégorie B</strong> : Produits à rotation moyenne (indice entre 0.4 et 0.7) - Stock équilibré.</li>
                  <li><strong>Catégorie C</strong> : Produits à faible rotation (indice ≤ 0.4) - Réduisez les stocks ou envisagez des promotions.</li>
                </ul>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
