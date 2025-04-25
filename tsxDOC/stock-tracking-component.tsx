import React, { useState } from 'react';
import { Select } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const StockTracking = () => {
  // Données fictives basées sur l'image 2
  const stockData = [
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF18D', qt: '1', dateMvt: '2025-03-04 17:08:13' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF19B', qt: '1', dateMvt: '2025-03-04 17:08:13' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF1A3', qt: '1', dateMvt: '2025-03-04 17:08:13' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF236', qt: '1', dateMvt: '2025-03-04 17:08:17' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF274', qt: '1', dateMvt: '2025-03-04 17:08:19' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF276', qt: '1', dateMvt: '2025-03-04 17:08:19' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF301', qt: '1', dateMvt: '2025-03-04 17:08:35' },
    { fournisseur: 'Orange', stock: 'STOCK_CENTRAL', ref: '20002', produit: 'ONT XS-010X-Q Post Orange', sn: 'ALCLFDABF307', qt: '1', dateMvt: '2025-03-04 17:08:35' },
  ];
  
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl text-blue-600 font-medium mb-6 text-center">Suivi du Stock</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Stock :</label>
            <select className="w-full rounded-md border border-gray-300 py-2 px-3">
              <option>Central</option>
              <option>Regional</option>
              <option>Local</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Affichage :</label>
            <select className="w-full rounded-md border border-gray-300 py-2 px-3">
              <option>Par SN</option>
              <option>Par Reference</option>
              <option>Par Fournisseur</option>
            </select>
          </div>
          <div className="flex items-end">
            <Button className="bg-green-600 hover:bg-green-700 w-full">
              <Search className="mr-2 h-4 w-4" />
              Recherche
            </Button>
          </div>
        </div>
        
        <div className="mt-8 flex justify-end mb-2">
          <div className="flex items-center">
            <label className="text-sm mr-2">Rechercher :</label>
            <Input type="text" className="max-w-xs" />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Fournisseur</th>
                <th className="px-4 py-3 text-left">Stock</th>
                <th className="px-4 py-3 text-left">Ref</th>
                <th className="px-4 py-3 text-left">Produit</th>
                <th className="px-4 py-3 text-left">SN</th>
                <th className="px-4 py-3 text-left">QT</th>
                <th className="px-4 py-3 text-left">Date Dernier Mvt</th>
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-700' : ''}>
                  <td className="px-4 py-3">{item.fournisseur}</td>
                  <td className="px-4 py-3">{item.stock}</td>
                  <td className="px-4 py-3">{item.ref}</td>
                  <td className="px-4 py-3">{item.produit}</td>
                  <td className="px-4 py-3">{item.sn}</td>
                  <td className="px-4 py-3">{item.qt}</td>
                  <td className="px-4 py-3">{item.dateMvt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StockTracking;