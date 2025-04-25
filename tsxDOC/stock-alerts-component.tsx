import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Settings, Save, PlusCircle, Trash2 } from "lucide-react";

const StockAlerts = () => {
  // Données fictives pour les produits et leurs seuils d'alerte
  const [products, setProducts] = useState([
    { id: 1, reference: '20002', name: 'ONT XS-010X-Q Post Orange', currentStock: 136, minThreshold: 30, criticalThreshold: 10, status: 'normal' },
    { id: 2, reference: '20003', name: 'Livebox 6', currentStock: 28, minThreshold: 40, criticalThreshold: 15, status: 'warning' },
    { id: 3, reference: '20004', name: 'BBox Miami', currentStock: 8, minThreshold: 25, criticalThreshold: 10, status: 'critical' },
    { id: 4, reference: '20005', name: 'ONT G-240W', currentStock: 62, minThreshold: 20, criticalThreshold: 5, status: 'normal' },
    { id: 5, reference: '20006', name: 'Répéteur Wifi', currentStock: 12, minThreshold: 15, criticalThreshold: 5, status: 'warning' },
  ]);

  const [editMode, setEditMode] = useState(false);
  const [editedProducts, setEditedProducts] = useState(products);

  // Gestion de l'édition des seuils
  const toggleEditMode = () => {
    if (editMode) {
      // Sauvegarder les modifications
      setProducts(editedProducts);
    }
    setEditMode(!editMode);
  };

  const handleThresholdChange = (id, field, value) => {
    const updatedProducts = editedProducts.map(product => 
      product.id === id ? { ...product, [field]: parseInt(value) || 0 } : product
    );
    setEditedProducts(updatedProducts);
  };

  // Ajout d'un nouveau produit à surveiller
  const addNewProductAlert = () => {
    const newProduct = {
      id: editedProducts.length + 1,
      reference: '',
      name: 'Nouveau produit',
      currentStock: 0,
      minThreshold: 20,
      criticalThreshold: 5,
      status: 'normal'
    };
    setEditedProducts([...editedProducts, newProduct]);
  };

  // Suppression d'une alerte
  const removeProductAlert = (id) => {
    const updatedProducts = editedProducts.filter(product => product.id !== id);
    setEditedProducts(updatedProducts);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Alertes de stock paramétrables</h2>
          </div>
          <Button 
            onClick={toggleEditMode}
            className={editMode ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}
          >
            {editMode ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Sauvegarder
              </>
            ) : (
              <>
                <Settings className="mr-2 h-4 w-4" />
                Configurer les seuils
              </>
            )}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">Référence</th>
                <th className="px-4 py-3 text-left">Produit</th>
                <th className="px-4 py-3 text-left">Stock actuel</th>
                <th className="px-4 py-3 text-left">Seuil d'alerte</th>
                <th className="px-4 py-3 text-left">Seuil critique</th>
                <th className="px-4 py-3 text-left">État</th>
                {editMode && <th className="px-4 py-3 text-left">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {(editMode ? editedProducts : products).map((product) => (
                <tr key={product.id} className={
                  product.status === 'critical' ? 'bg-red-50 dark:bg-red-900/20' : 
                  product.status === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20' : 
                  ''
                }>
                  <td className="px-4 py-3">{product.reference}</td>
                  <td className="px-4 py-3">{product.name}</td>
                  <td className="px-4 py-3">{product.currentStock}</td>
                  <td className="px-4 py-3">
                    {editMode ? (
                      <Input 
                        type="number" 
                        value={product.minThreshold} 
                        onChange={(e) => handleThresholdChange(product.id, 'minThreshold', e.target.value)}
                        className="w-20"
                      />
                    ) : (
                      product.minThreshold
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {editMode ? (
                      <Input 
                        type="number" 
                        value={product.criticalThreshold} 
                        onChange={(e) => handleThresholdChange(product.id, 'criticalThreshold', e.target.value)}
                        className="w-20"
                      />
                    ) : (
                      product.criticalThreshold
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      product.status === 'critical' ? 'bg-red-100 text-red-800' :
                      product.status === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {product.status === 'critical' ? 'Critique' :
                       product.status === 'warning' ? 'Alerte' : 'Normal'}
                    </span>
                  </td>
                  {editMode && (
                    <td className="px-4 py-3">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => removeProductAlert(product.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {editMode && (
          <div className="mt-4 flex justify-end">
            <Button 
              onClick={addNewProductAlert}
              className="bg-orange-500 hover:bg-orange-600"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un produit
            </Button>
          </div>
        )}

        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">À propos des alertes de stock</h3>
          <ul className="text-sm text-blue-700 dark:text-blue-400 list-disc pl-5 space-y-1">
            <li>Le seuil d'alerte déclenche une notification pour prévenir d'une baisse de stock.</li>
            <li>Le seuil critique indique un besoin urgent de réapprovisionnement.</li>
            <li>Vous pouvez personnaliser ces seuils pour chaque produit en fonction de sa rotation.</li>
            <li>Les notifications sont envoyées selon vos préférences (email, SMS, application).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default StockAlerts;