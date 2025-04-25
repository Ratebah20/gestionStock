import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar } from "lucide-react";

const ShipmentTracking = () => {
  // Données fictives basées sur l'image 3 (vide dans l'exemple)
  const shipmentData = [];
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Date Intervention :</label>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex">
                <Input type="text" value="04/17/2025" placeholder="mm/dd/yyyy" />
                <Button variant="ghost" size="icon" className="ml-1">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex">
                <Input type="text" value="05/01/2025" placeholder="mm/dd/yyyy" />
                <Button variant="ghost" size="icon" className="ml-1">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Reference :</label>
            <Input type="text" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-blue-600">Etat :</label>
            <select className="w-full rounded-md border border-gray-300 py-2 px-3">
              <option>...</option>
              <option>En cours</option>
              <option>Expédié</option>
              <option>Livré</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end">
          <Button className="bg-green-600 hover:bg-green-700">
            <Search className="mr-2 h-4 w-4" />
            Recherche
          </Button>
        </div>
        
        <div className="mt-8 flex justify-end mb-2">
          <div className="flex items-center">
            <label className="text-sm mr-2">Rechercher :</label>
            <Input type="text" className="max-w-xs" />
          </div>
        </div>
        
        <div className="overflow-x-auto mt-4">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Fournisseur</th>
                <th className="px-4 py-3 text-left">CUST ID</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Adresse</th>
                <th className="px-4 py-3 text-left">Ref</th>
                <th className="px-4 py-3 text-left">Produit</th>
                <th className="px-4 py-3 text-left">SN</th>
                <th className="px-4 py-3 text-left">QT</th>
                <th className="px-4 py-3 text-left">BT</th>
                <th className="px-4 py-3 text-left">Date Expe</th>
                <th className="px-4 py-3 text-left">Etat</th>
              </tr>
            </thead>
            <tbody>
              {shipmentData.length > 0 ? (
                shipmentData.map((item, index) => (
                  <tr key={index}>
                    {/* Données mappées ici */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="text-center py-4">
                    Aucune donnée disponible dans le tableau
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShipmentTracking;