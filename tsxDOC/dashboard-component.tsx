import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { BarChart3, Package, TrendingUp, Clock, UserCheck, AlertTriangle } from 'lucide-react';

const Dashboard = () => {
  // Données fictives pour les graphiques
  const stockMovementData = [
    { date: '01/03', entrees: 24, sorties: 18 },
    { date: '02/03', entrees: 13, sorties: 22 },
    { date: '03/03', entrees: 28, sorties: 19 },
    { date: '04/03', entrees: 39, sorties: 27 },
    { date: '05/03', entrees: 34, sorties: 42 },
    { date: '06/03', entrees: 51, sorties: 28 },
    { date: '07/03', entrees: 47, sorties: 45 },
  ];

  const stockByProductData = [
    { name: 'ONT XS-010X', stock: 136 },
    { name: 'Livebox 6', stock: 98 },
    { name: 'BBox Miami', stock: 86 },
    { name: 'ONT G-240W', stock: 62 },
    { name: 'Répéteur Wifi', stock: 41 },
  ];

  // Données des KPIs
  const kpis = [
    { 
      title: "Articles en stock", 
      value: "423", 
      change: "+5% ce mois", 
      icon: <Package className="text-blue-500" />,
      color: "bg-blue-50 dark:bg-blue-900/20"
    },
    { 
      title: "Sorties récentes", 
      value: "45", 
      change: "Dernières 24h", 
      icon: <TrendingUp className="text-green-500" />,
      color: "bg-green-50 dark:bg-green-900/20"
    },
    { 
      title: "Commandes en attente", 
      value: "12", 
      change: "5 prioritaires", 
      icon: <Clock className="text-orange-500" />,
      color: "bg-orange-50 dark:bg-orange-900/20"
    },
    { 
      title: "Alertes de stock", 
      value: "3", 
      change: "Produits à commander", 
      icon: <AlertTriangle className="text-red-500" />,
      color: "bg-red-50 dark:bg-red-900/20"
    },
  ];

  // Données des interventions récentes
  const recentInterventions = [
    { id: "INT-2504", client: "Dupont Jean", produit: "ONT XS-010X-Q", date: "24/04/2025", status: "Terminée" },
    { id: "INT-2502", client: "Martin Sophie", produit: "Livebox 6", date: "23/04/2025", status: "En cours" },
    { id: "INT-2498", client: "Petit Thomas", produit: "BBox Miami", date: "22/04/2025", status: "En attente" },
    { id: "INT-2495", client: "Richard Marie", produit: "ONT G-240W", date: "22/04/2025", status: "Terminée" },
  ];

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Tableau de bord</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, index) => (
          <div key={index} className={`p-6 rounded-lg shadow ${kpi.color}`}>
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-700 dark:text-gray-200">{kpi.title}</h3>
                <p className="text-3xl font-bold mt-2">{kpi.value}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{kpi.change}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center">
                {kpi.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Mouvements de stock</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
                <span className="text-sm">Entrées</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-orange-500 mr-1"></div>
                <span className="text-sm">Sorties</span>
              </div>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockMovementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="entrees" stroke="#3b82f6" strokeWidth={2} />
                <Line type="monotone" dataKey="sorties" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
          <div className="flex items-center mb-4">
            <BarChart3 className="text-orange-500 mr-2" />
            <h3 className="text-lg font-medium">Stock par produit</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockByProductData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#ff7900" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Interventions récentes */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mt-8">
        <div className="flex items-center mb-4">
          <UserCheck className="text-blue-500 mr-2" />
          <h3 className="text-lg font-medium">Interventions récentes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Produit</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Statut</th>
                <th className="px-4 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {recentInterventions.map((intervention, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                  <td className="px-4 py-3">{intervention.id}</td>
                  <td className="px-4 py-3">{intervention.client}</td>
                  <td className="px-4 py-3">{intervention.produit}</td>
                  <td className="px-4 py-3">{intervention.date}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      intervention.status === 'Terminée' ? 'bg-green-100 text-green-800' :
                      intervention.status === 'En cours' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {intervention.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="text-blue-500 hover:text-blue-700">Détails</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;