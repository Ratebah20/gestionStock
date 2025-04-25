import React from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from "lucide-react";

const InterventionSearch = () => {
  // Données fictives basées sur l'image 1
  const interventionData = [];
  
  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 p-6">
        <div className="pb-3">
          <h3 className="text-xl text-orange-500 font-medium">Recherche Intervention</h3>
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Order ID :</label>
              <Input type="text" placeholder="Entrer Order ID" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Product ID :</label>
              <Input type="text" placeholder="Entrer Product ID" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Nom :</label>
              <Input type="text" placeholder="Entrer Nom" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Phone Number :</label>
              <Input type="tel" placeholder="Entrer Phone Number" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Numero Intervention :</label>
              <Input type="text" placeholder="Entrer Numero Intervention" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-blue-600">Date Intervention :</label>
              <div className="flex">
                <Input type="text" placeholder="mm/dd/yyyy" />
                <Button variant="ghost" size="icon" className="ml-1">
                  <Calendar className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Search className="mr-2 h-4 w-4" />
              Recherche
            </Button>
          </div>
        </div>
      </Card>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Intervention</th>
                <th className="px-4 py-3 text-left">Client</th>
                <th className="px-4 py-3 text-left">Nom</th>
                <th className="px-4 py-3 text-left">Adresse</th>
                <th className="px-4 py-3 text-left">Reference</th>
                <th className="px-4 py-3 text-left">Etat</th>
                <th className="px-4 py-3 text-left">Date Creation</th>
                <th className="px-4 py-3 text-left">Date Intervention</th>
                <th className="px-4 py-3 text-left">Technicien</th>
                <th className="px-4 py-3 text-left">PV</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colSpan={10} className="text-center py-4">
                  Aucune donnée disponible dans le tableau
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InterventionSearch;