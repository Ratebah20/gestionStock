// app/stock-alerts/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Bell, 
  Settings, 
  Save, 
  PlusCircle, 
  Trash2,
  Download,
  RefreshCw,
  Info
} from "lucide-react"

export default function StockAlerts() {
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
  
  // Statistiques d'alertes
  const alertStats = {
    total: products.length,
    critical: products.filter(p => p.status === 'critical').length,
    warning: products.filter(p => p.status === 'warning').length,
    normal: products.filter(p => p.status === 'normal').length
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Alertes de stock</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <OrangeButton 
                onClick={toggleEditMode}
                className={editMode 
                  ? "bg-green-500 hover:bg-green-600 text-white flex items-center gap-2" 
                  : "bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                }
              >
                {editMode ? (
                  <>
                    <Save className="h-4 w-4" />
                    Sauvegarder
                  </>
                ) : (
                  <>
                    <Settings className="h-4 w-4" />
                    Configurer les seuils
                  </>
                )}
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
          
          {/* Cartes de statistiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total produits</p>
                  <h3 className="text-xl font-bold text-white">{alertStats.total}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-red-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-red-950/50 text-red-500 p-2 rounded-md">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Niveau critique</p>
                  <h3 className="text-xl font-bold text-white">{alertStats.critical}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-yellow-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-yellow-950/50 text-yellow-500 p-2 rounded-md">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">En alerte</p>
                  <h3 className="text-xl font-bold text-white">{alertStats.warning}</h3>
                </div>
              </div>
            </Card>
            <Card className="p-4 border-green-800/30 bg-gray-800/50">
              <div className="flex items-center gap-3">
                <div className="bg-green-950/50 text-green-500 p-2 rounded-md">
                  <Bell className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Niveau normal</p>
                  <h3 className="text-xl font-bold text-white">{alertStats.normal}</h3>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <Bell className="h-6 w-6 text-orange-500 mr-2" />
                <h2 className="text-xl font-semibold text-white">Alertes de stock paramétrables</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-400">Dernière mise à jour: </span>
                <span className="text-sm text-white">27/04/2025 14:30</span>
                <OrangeButton 
                  variant="ghost" 
                  size="sm" 
                  className="text-orange-500 hover:bg-orange-950/50"
                >
                  <RefreshCw className="h-4 w-4" />
                </OrangeButton>
              </div>
            </div>

            <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-orange-800/30 bg-orange-950/30">
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Référence</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Stock actuel</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Seuil d'alerte</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">Seuil critique</th>
                    <th className="px-4 py-3 text-left font-medium text-orange-500">État</th>
                    {editMode && <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>}
                  </tr>
                </thead>
                <tbody>
                  {(editMode ? editedProducts : products).map((product) => (
                    <tr key={product.id} className={
                      product.status === 'critical' ? 'border-b border-gray-800 bg-red-950/20 hover:bg-red-950/30' : 
                      product.status === 'warning' ? 'border-b border-gray-800 bg-yellow-950/20 hover:bg-yellow-950/30' : 
                      'border-b border-gray-800 hover:bg-orange-950/20'
                    }>
                      <td className="px-4 py-3 text-gray-300">{product.reference}</td>
                      <td className="px-4 py-3 text-gray-300">{product.name}</td>
                      <td className="px-4 py-3 text-gray-300">{product.currentStock}</td>
                      <td className="px-4 py-3">
                        {editMode ? (
                          <Input 
                            type="number" 
                            value={product.minThreshold} 
                            onChange={(e) => handleThresholdChange(product.id, 'minThreshold', e.target.value)}
                            className="w-20 bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white"
                          />
                        ) : (
                          <span className="text-gray-300">{product.minThreshold}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        {editMode ? (
                          <Input 
                            type="number" 
                            value={product.criticalThreshold} 
                            onChange={(e) => handleThresholdChange(product.id, 'criticalThreshold', e.target.value)}
                            className="w-20 bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white"
                          />
                        ) : (
                          <span className="text-gray-300">{product.criticalThreshold}</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          product.status === 'critical' ? 'bg-red-900/30 text-red-400' :
                          product.status === 'warning' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-green-900/30 text-green-400'
                        }`}>
                          {product.status === 'critical' ? 'Critique' :
                           product.status === 'warning' ? 'Alerte' : 'Normal'}
                        </span>
                      </td>
                      {editMode && (
                        <td className="px-4 py-3">
                          <OrangeButton 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeProductAlert(product.id)}
                            className="text-red-400 hover:bg-red-950/30 h-8 w-8 p-0"
                          >
                            <Trash2 className="h-4 w-4" />
                          </OrangeButton>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {editMode && (
              <div className="mt-4 flex justify-end">
                <OrangeButton 
                  onClick={addNewProductAlert}
                  className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                >
                  <PlusCircle className="h-4 w-4" />
                  Ajouter un produit
                </OrangeButton>
              </div>
            )}
            
            <Card className="mt-6 p-4 border-orange-800/30 bg-gray-800/50">
              <div className="flex items-start gap-3">
                <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-orange-500 mb-2">À propos des alertes de stock</h3>
                  <ul className="text-sm text-gray-300 list-disc pl-5 space-y-1">
                    <li>Le seuil d'alerte déclenche une notification pour prévenir d'une baisse de stock.</li>
                    <li>Le seuil critique indique un besoin urgent de réapprovisionnement.</li>
                    <li>Vous pouvez personnaliser ces seuils pour chaque produit en fonction de sa rotation.</li>
                    <li>Les notifications sont envoyées selon vos préférences (email, SMS, application).</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Card>
          
          {/* Section des actions recommandées */}
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 mt-6">
            <h2 className="text-xl font-semibold text-white mb-4">Actions recommandées</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-4 border-red-800/30 bg-red-950/10">
                <h3 className="font-medium text-red-400 mb-2">Produits en niveau critique</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {products.filter(p => p.status === 'critical').map(product => (
                    <li key={product.id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="font-medium text-red-400">Stock: {product.currentStock}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <OrangeButton 
                    className="w-full bg-red-500/80 hover:bg-red-600 text-white"
                  >
                    Commander maintenant
                  </OrangeButton>
                </div>
              </Card>
              
              <Card className="p-4 border-yellow-800/30 bg-yellow-950/10">
                <h3 className="font-medium text-yellow-400 mb-2">Produits en alerte</h3>
                <ul className="text-sm text-gray-300 space-y-2">
                  {products.filter(p => p.status === 'warning').map(product => (
                    <li key={product.id} className="flex justify-between">
                      <span>{product.name}</span>
                      <span className="font-medium text-yellow-400">Stock: {product.currentStock}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <OrangeButton 
                    className="w-full bg-yellow-500/80 hover:bg-yellow-600 text-white"
                  >
                    Planifier commande
                  </OrangeButton>
                </div>
              </Card>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
