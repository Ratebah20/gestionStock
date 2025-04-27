// app/shipment-tracking/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Calendar, FileDown, Eye, Truck } from "lucide-react"

export default function ShipmentTracking() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Données fictives pour les expéditions
  const shipmentData = [
    {
      id: "EXP-2023-001",
      supplier: "Orange Telecom",
      custId: "CL-2023-001",
      client: "Jean Dupont",
      address: "123 Rue de Paris, 75001 Paris",
      ref: "20002",
      product: "ONT XS-010X-Q Post Orange",
      sn: "SN2023456789",
      quantity: 1,
      bt: "BT-0045",
      shipDate: "18/04/2025",
      status: "Livré"
    },
    {
      id: "EXP-2023-002",
      supplier: "Orange Telecom",
      custId: "CL-2023-002",
      client: "Marie Martin",
      address: "456 Avenue des Champs, 75008 Paris",
      ref: "20003",
      product: "Livebox 6 Orange",
      sn: "SN2023456790",
      quantity: 1,
      bt: "BT-0046",
      shipDate: "19/04/2025",
      status: "En cours"
    },
    {
      id: "EXP-2023-003",
      supplier: "Orange Telecom",
      custId: "CL-2023-003",
      client: "Pierre Durand",
      address: "789 Boulevard Haussmann, 75009 Paris",
      ref: "20004",
      product: "Répéteur WiFi Orange",
      sn: "SN2023456791",
      quantity: 2,
      bt: "BT-0047",
      shipDate: "20/04/2025",
      status: "Expédié"
    },
    {
      id: "EXP-2023-004",
      supplier: "Orange Telecom",
      custId: "CL-2023-004",
      client: "Sophie Petit",
      address: "101 Rue de Rivoli, 75001 Paris",
      ref: "20002",
      product: "ONT XS-010X-Q Post Orange",
      sn: "SN2023456792",
      quantity: 1,
      bt: "BT-0048",
      shipDate: "21/04/2025",
      status: "En cours"
    },
    {
      id: "EXP-2023-005",
      supplier: "Orange Telecom",
      custId: "CL-2023-005",
      client: "Lucas Bernard",
      address: "202 Avenue Montaigne, 75008 Paris",
      ref: "20003",
      product: "Livebox 6 Orange",
      sn: "SN2023456793",
      quantity: 1,
      bt: "BT-0049",
      shipDate: "22/04/2025",
      status: "Expédié"
    }
  ];
  
  // Filtrer les données en fonction du terme de recherche
  const filteredData = shipmentData.filter(item => 
    Object.values(item).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  
  // Fonction pour obtenir la classe CSS en fonction du statut
  const getStatusClass = (status) => {
    switch (status) {
      case 'Livré': return 'bg-green-900/30 text-green-400';
      case 'En cours': return 'bg-blue-900/30 text-blue-400';
      case 'Expédié': return 'bg-yellow-900/30 text-yellow-400';
      default: return 'bg-gray-800/50 text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Suivi des expéditions</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <OrangeButton 
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Truck className="h-4 w-4" />
              Nouvelle expédition
            </OrangeButton>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Date Intervention :</label>
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex">
                    <Input 
                      type="text" 
                      defaultValue="17/04/2025" 
                      placeholder="jj/mm/aaaa" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                    <OrangeButton 
                      variant="ghost" 
                      size="icon" 
                      className="ml-1 text-orange-500 hover:bg-orange-950/50"
                    >
                      <Calendar className="h-4 w-4" />
                    </OrangeButton>
                  </div>
                  <div className="flex">
                    <Input 
                      type="text" 
                      defaultValue="01/05/2025" 
                      placeholder="jj/mm/aaaa" 
                      className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                    />
                    <OrangeButton 
                      variant="ghost" 
                      size="icon" 
                      className="ml-1 text-orange-500 hover:bg-orange-950/50"
                    >
                      <Calendar className="h-4 w-4" />
                    </OrangeButton>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Référence :</label>
                <Input 
                  type="text" 
                  className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">État :</label>
                <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                  <option>Tous</option>
                  <option>En cours</option>
                  <option>Expédié</option>
                  <option>Livré</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <OrangeButton className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2">
                <Search className="h-4 w-4" />
                Recherche
              </OrangeButton>
            </div>
            
            <div className="mt-8 flex justify-between items-center mb-4">
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
              >
                <FileDown className="h-4 w-4" />
                Exporter
              </OrangeButton>
              
              <div className="flex items-center">
                <label className="text-sm mr-2 text-gray-300">Rechercher :</label>
                <Input 
                  type="text" 
                  className="max-w-xs bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="overflow-x-auto mt-4 rounded-md border border-orange-800/30 bg-gray-800/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-800/30 bg-orange-950/30">
                    <th className="px-4 py-3 text-left font-medium text-orange-500">ID</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Fournisseur</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">CUST ID</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Client</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Adresse</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Ref</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">SN</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">QT</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">BT</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Date Expe</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">État</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => (
                      <tr key={index} className="border-b border-gray-800 hover:bg-orange-950/20">
                        <td className="px-4 py-3 text-gray-300">{item.id}</td>
                        <td className="px-4 py-3 text-gray-300">{item.supplier}</td>
                        <td className="px-4 py-3 text-gray-300">{item.custId}</td>
                        <td className="px-4 py-3 text-gray-300">{item.client}</td>
                        <td className="px-4 py-3 text-gray-300">{item.address}</td>
                        <td className="px-4 py-3 text-gray-300">{item.ref}</td>
                        <td className="px-4 py-3 text-gray-300">{item.product}</td>
                        <td className="px-4 py-3 text-gray-300">{item.sn}</td>
                        <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                        <td className="px-4 py-3 text-gray-300">{item.bt}</td>
                        <td className="px-4 py-3 text-gray-300">{item.shipDate}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusClass(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex space-x-2">
                            <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                              <Eye className="h-4 w-4" />
                            </OrangeButton>
                            <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-400 hover:bg-orange-950/50">
                              <Truck className="h-4 w-4" />
                            </OrangeButton>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={13} className="text-center py-4 text-gray-400">
                        Aucune donnée disponible dans le tableau
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
              <div>
                Affichage de {filteredData.length} sur {shipmentData.length} expéditions
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
