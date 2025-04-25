import React, { useState } from 'react';
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Printer, Download, Copy, Scan, QrCode, Barcode, Search } from 'lucide-react';

const QRBarcodeManager = () => {
  const [activeTab, setActiveTab] = useState('generate');
  const [selectedType, setSelectedType] = useState('qr');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  
  // Données fictives pour les produits
  const products = [
    { id: '20002', name: 'ONT XS-010X-Q Post Orange', serialNumbers: ['ALCLFDABF18D', 'ALCLFDABF19B', 'ALCLFDABF1A3'] },
    { id: '20003', name: 'Livebox 6', serialNumbers: ['LB6-123456', 'LB6-123457', 'LB6-123458'] },
    { id: '20004', name: 'BBox Miami', serialNumbers: ['BBM-987654', 'BBM-987655', 'BBM-987656'] },
  ];
  
  // Données fictives des codes scannés récemment
  const recentScans = [
    { id: 1, type: 'QR Code', value: 'ONT XS-010X-Q Post Orange - ALCLFDABF18D', timestamp: '24/04/2025 14:32:15', user: 'Martin T.' },
    { id: 2, type: 'Code-barres', value: '20003 - Livebox 6', timestamp: '24/04/2025 11:17:43', user: 'Sophie D.' },
    { id: 3, type: 'QR Code', value: 'Répéteur Wifi - REP-45678', timestamp: '23/04/2025 16:05:22', user: 'Thomas P.' },
  ];

  // Générer un code QR (représenté par une image placeholder)
  const QRCodePlaceholder = ({ value }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
        <div className="h-48 w-48 bg-white p-4 flex items-center justify-center">
          <QrCode className="h-40 w-40 text-gray-800" />
        </div>
        <p className="mt-2 text-sm text-center text-gray-600">{value || 'Aucune donnée sélectionnée'}</p>
      </div>
    );
  };
  
  // Générer un code-barres (représenté par une image placeholder)
  const BarcodePlaceholder = ({ value }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-gray-300 rounded-md">
        <div className="h-32 w-64 bg-white p-4 flex items-center justify-center">
          <Barcode className="h-20 w-56 text-gray-800" />
        </div>
        <p className="mt-2 text-sm text-center text-gray-600">{value || 'Aucune donnée sélectionnée'}</p>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-6">Gestion des QR Codes et Codes-barres</h2>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'generate' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('generate')}
            >
              Générer
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scan' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('scan')}
            >
              Scanner
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Historique
            </button>
          </nav>
        </div>
        
        {activeTab === 'generate' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type de code</label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="qr">QR Code</option>
                  <option value="barcode">Code-barres</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Produit</label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                  value={selectedProduct}
                  onChange={(e) => setSelectedProduct(e.target.value)}
                >
                  <option value="">Sélectionner un produit</option>
                  {products.map(product => (
                    <option key={product.id} value={product.id}>{product.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Numéro de série</label>
                <select 
                  className="w-full rounded-md border border-gray-300 py-2 px-3"
                  disabled={!selectedProduct}
                >
                  <option value="">Sélectionner un S/N</option>
                  {selectedProduct && 
                    products
                      .find(p => p.id === selectedProduct)?.serialNumbers
                      .map((sn, index) => (
                        <option key={index} value={sn}>{sn}</option>
                      ))}
                </select>
              </div>
            </div>
            
            <div className="flex justify-center my-8">
              {selectedType === 'qr' ? (
                <QRCodePlaceholder 
                  value={selectedProduct ? 
                    products.find(p => p.id === selectedProduct)?.name : ''} 
                />
              ) : (
                <BarcodePlaceholder 
                  value={selectedProduct ? 
                    `${selectedProduct} - ${products.find(p => p.id === selectedProduct)?.name}` : ''} 
                />
              )}
            </div>
            
            <div className="flex justify-center space-x-4">
              <Button 
                variant="outline" 
                className="flex items-center"
                disabled={!selectedProduct}
              >
                <Printer className="mr-2 h-4 w-4" />
                Imprimer
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                disabled={!selectedProduct}
              >
                <Download className="mr-2 h-4 w-4" />
                Télécharger
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center"
                disabled={!selectedProduct}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copier
              </Button>
            </div>
          </div>
        )}
        
        {activeTab === 'scan' && (
          <div>
            <div className="mb-6 text-center">
              <p className="text-gray-600 mb-4">Utilisez votre caméra pour scanner un QR code ou un code-barres</p>
              <div className="bg-gray-100 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center mb-4">
                <Scan className="h-16 w-16 text-gray-400" />
              </div>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Scan className="mr-2 h-4 w-4" />
                Commencer à scanner
              </Button>
            </div>
            
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">ou</p>
              <div className="mt-4 max-w-md mx-auto">
                <label className="text-sm font-medium">Saisir manuellement</label>
                <div className="flex mt-2">
                  <Input 
                    type="text" 
                    placeholder="Entrez un code manuellement"
                    value={barcodeValue}
                    onChange={(e) => setBarcodeValue(e.target.value)}
                  />
                  <Button className="ml-2 bg-blue-600 hover:bg-blue-700">
                    <Search className="mr-2 h-4 w-4" />
                    Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <h3 className="text-lg font-medium mb-4">Historique des scans récents</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Valeur</th>
                    <th className="px-4 py-3 text-left">Date/Heure</th>
                    <th className="px-4 py-3 text-left">Utilisateur</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentScans.map((scan) => (
                    <tr key={scan.id} className="border-b">
                      <td className="px-4 py-3">
                        {scan.type === 'QR Code' ? 
                          <QrCode className="h-5 w-5 text-blue-500" /> : 
                          <Barcode className="h-5 w-5 text-green-500" />}
                      </td>
                      <td className="px-4 py-3">{scan.value}</td>
                      <td className="px-4 py-3">{scan.timestamp}</td>
                      <td className="px-4 py-3">{scan.user}</td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Search className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Astuce</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Les QR codes sont idéaux pour stocker des informations détaillées sur les produits, tandis que les codes-barres 
            sont mieux adaptés pour les références simples. Pour un inventaire rapide, utilisez l'application mobile 
            pour scanner plusieurs articles à la suite.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QRBarcodeManager;