// app/inventory/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Download, 
  Filter, 
  Package, 
  Plus,
  FileText,
  RefreshCw,
  BarChart
} from "lucide-react"

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [stockFilter, setStockFilter] = useState("Central");
  const [displayMode, setDisplayMode] = useState("Par SN");
  
  // Données fictives pour l'inventaire
  const inventoryData = [
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF18D', qt: '1', dateMvt: '2025-03-04 17:08:13', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF19B', qt: '1', dateMvt: '2025-03-04 17:08:13', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF1A3', qt: '1', dateMvt: '2025-03-04 17:08:13', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20003', produit: 'Livebox 6', sn: 'LB6-123456', qt: '1', dateMvt: '2025-03-05 09:15:22', status: 'Réservé' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20003', produit: 'Livebox 6', sn: 'LB6-123457', qt: '1', dateMvt: '2025-03-05 09:15:22', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20003', produit: 'Livebox 6', sn: 'LB6-123458', qt: '1', dateMvt: '2025-03-05 09:15:22', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20004', produit: 'BBox Miami', sn: 'BBM-987654', qt: '1', dateMvt: '2025-03-06 14:30:45', status: 'En transit' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20004', produit: 'BBox Miami', sn: 'BBM-987655', qt: '1', dateMvt: '2025-03-06 14:30:45', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20005', produit: 'ONT G-240W', sn: 'G240W-001', qt: '1', dateMvt: '2025-03-07 11:22:33', status: 'Disponible' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20006', produit: 'Répéteur Wifi', sn: 'REP-45678', qt: '1', dateMvt: '2025-03-08 16:45:12', status: 'Disponible' },
  ];
  
  // Filtrer les données en fonction du terme de recherche
  const filteredData = inventoryData.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  // Fonction pour obtenir la classe CSS en fonction du statut
  const getStatusClass = (status) => {
    switch (status) {
      case 'Disponible': return 'bg-green-900/30 text-green-400';
      case 'Réservé': return 'bg-blue-900/30 text-blue-400';
      case 'En transit': return 'bg-yellow-900/30 text-yellow-400';
      default: return 'bg-gray-800/50 text-gray-300';
    }
  };
  
  // Statistiques d'inventaire
  const inventoryStats = {
    total: inventoryData.length,
    available: inventoryData.filter(item => item.status === 'Disponible').length,
    reserved: inventoryData.filter(item => item.status === 'Réservé').length,
    inTransit: inventoryData.filter(item => item.status === 'En transit').length,
    productTypes: new Set(inventoryData.map(item => item.ref)).size
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Inventaire</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <OrangeButton 
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Plus className="h-4 w-4" />
                Nouveau produit
              </OrangeButton>
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
              >
                <Download className="h-4 w-4" />
                Exporter
              </OrangeButton>
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
              >
                <BarChart className="h-4 w-4" />
                Statistiques
              </OrangeButton>
            </div>
          </div>
          
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total produits</p>
                  <h3 className="text-xl font-bold text-white">{inventoryStats.total}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-green-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-950/50 text-green-500 p-2 rounded-md">
                  <Package className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Disponibles</p>
                  <h3 className="text-xl font-bold text-white">{inventoryStats.available}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-blue-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-blue-950/50 text-blue-500 p-2 rounded-md">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Réservés</p>
                  <h3 className="text-xl font-bold text-white">{inventoryStats.reserved}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-yellow-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-950/50 text-yellow-500 p-2 rounded-md">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">En transit</p>
                  <h3 className="text-xl font-bold text-white">{inventoryStats.inTransit}</h3>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Stock :</label>
                <select 
                  className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                  value={stockFilter}
                  onChange={(e) => setStockFilter(e.target.value)}
                >
                  <option>Central</option>
                  <option>Regional</option>
                  <option>Local</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Affichage :</label>
                <select 
                  className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                  value={displayMode}
                  onChange={(e) => setDisplayMode(e.target.value)}
                >
                  <option>Par SN</option>
                  <option>Par Reference</option>
                  <option>Par Fournisseur</option>
                </select>
              </div>
              <div className="flex items-end">
                <OrangeButton 
                  className="bg-orange-500 hover:bg-orange-600 text-white w-full flex items-center justify-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Recherche
                </OrangeButton>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-4 mt-8">
              <div className="flex items-center">
                <Filter className="h-4 w-4 text-orange-500 mr-2" />
                <span className="text-sm text-gray-300">Filtre rapide :</span>
                <OrangeButton 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-green-400 hover:bg-green-950/20"
                >
                  Disponibles
                </OrangeButton>
                <OrangeButton 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-blue-400 hover:bg-blue-950/20"
                >
                  Réservés
                </OrangeButton>
                <OrangeButton 
                  variant="ghost" 
                  size="sm" 
                  className="ml-2 text-yellow-400 hover:bg-yellow-950/20"
                >
                  En transit
                </OrangeButton>
              </div>
              
              <div className="flex items-center">
                <label className="text-sm mr-2 text-gray-300">Rechercher :</label>
                <Input 
                  type="text" 
                  className="max-w-xs bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Rechercher..."
                />
              </div>
            </div>
            
            <div className="overflow-x-auto mt-4 rounded-md border border-orange-800/30 bg-gray-800/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-800/30 bg-orange-950/30">
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Fournisseur</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Stock</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Ref</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">SN</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">QT</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Date Dernier Mvt</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item, index) => (
                    <tr key={index} className="border-b border-gray-800 hover:bg-orange-950/20">
                      <td className="px-4 py-3 text-gray-300">{item.fournisseur}</td>
                      <td className="px-4 py-3 text-gray-300">{item.stock}</td>
                      <td className="px-4 py-3 text-gray-300">{item.ref}</td>
                      <td className="px-4 py-3 text-gray-300">{item.produit}</td>
                      <td className="px-4 py-3 text-gray-300">{item.sn}</td>
                      <td className="px-4 py-3 text-gray-300">{item.qt}</td>
                      <td className="px-4 py-3 text-gray-300">{item.dateMvt}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <div>
                Affichage de {filteredData.length} sur {inventoryData.length} produits
              </div>
              <div className="flex space-x-2">
                <OrangeButton size="sm" variant="outline" className="border-orange-800/30 text-gray-300 hover:bg-orange-950/30">
                  Précédent
                </OrangeButton>
                <OrangeButton size="sm" variant="outline" className="border-orange-800/30 text-gray-300 hover:bg-orange-950/30">
                  Suivant
                </OrangeButton>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
