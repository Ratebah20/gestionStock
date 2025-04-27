// app/qr-barcodes/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Printer, 
  Download, 
  Copy, 
  Scan, 
  QrCode, 
  Barcode, 
  Search,
  Info
} from "lucide-react"

export default function QRBarcodes() {
  const [activeTab, setActiveTab] = useState('generate');
  const [selectedType, setSelectedType] = useState('qr');
  const [selectedProduct, setSelectedProduct] = useState('');
  const [barcodeValue, setBarcodeValue] = useState('');
  
  // Données fictives pour les produits
  const products = [
    { id: '20002', name: 'ONT XS-010X-Q Post Orange', serialNumbers: ['ALCLFDABF18D', 'ALCLFDABF19B', 'ALCLFDABF1A3'] },
    { id: '20003', name: 'Livebox 6', serialNumbers: ['LB6-123456', 'LB6-123457', 'LB6-123458'] },
    { id: '20004', name: 'BBox Miami', serialNumbers: ['BBM-987654', 'BBM-987655', 'BBM-987656'] },
    { id: '20005', name: 'ONT G-240W', serialNumbers: ['G240W-001', 'G240W-002', 'G240W-003'] },
    { id: '20006', name: 'Répéteur Wifi', serialNumbers: ['REP-45678', 'REP-45679', 'REP-45680'] },
  ];
  
  // Données fictives des codes scannés récemment
  const recentScans = [
    { id: 1, type: 'QR Code', value: 'ONT XS-010X-Q Post Orange - ALCLFDABF18D', timestamp: '24/04/2025 14:32:15', user: 'Martin T.' },
    { id: 2, type: 'Code-barres', value: '20003 - Livebox 6', timestamp: '24/04/2025 11:17:43', user: 'Sophie D.' },
    { id: 3, type: 'QR Code', value: 'Répéteur Wifi - REP-45678', timestamp: '23/04/2025 16:05:22', user: 'Thomas P.' },
    { id: 4, type: 'Code-barres', value: '20005 - ONT G-240W', timestamp: '23/04/2025 09:47:11', user: 'Martin T.' },
    { id: 5, type: 'QR Code', value: 'BBox Miami - BBM-987654', timestamp: '22/04/2025 15:23:58', user: 'Sophie D.' },
  ];

  // Générer un code QR (représenté par une image placeholder)
  const QRCodePlaceholder = ({ value }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-orange-800/30 rounded-md bg-gray-800/50">
        <div className="h-48 w-48 bg-white p-4 flex items-center justify-center rounded-md">
          <QrCode className="h-40 w-40 text-gray-800" />
        </div>
        <p className="mt-2 text-sm text-center text-gray-300">{value || 'Aucune donnée sélectionnée'}</p>
      </div>
    );
  };
  
  // Générer un code-barres (représenté par une image placeholder)
  const BarcodePlaceholder = ({ value }) => {
    return (
      <div className="flex flex-col items-center justify-center p-4 border border-orange-800/30 rounded-md bg-gray-800/50">
        <div className="h-32 w-64 bg-white p-4 flex items-center justify-center rounded-md">
          <Barcode className="h-20 w-56 text-gray-800" />
        </div>
        <p className="mt-2 text-sm text-center text-gray-300">{value || 'Aucune donnée sélectionnée'}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">QR Codes & Codes-barres</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur">
            <div className="border-b border-orange-800/30">
              <nav className="flex space-x-8 px-6">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'generate' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('generate')}
                >
                  Générer
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'scan' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('scan')}
                >
                  Scanner
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Historique
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'generate' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-orange-400">Type de code</label>
                      <select 
                        className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        <option value="qr">QR Code</option>
                        <option value="barcode">Code-barres</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-orange-400">Produit</label>
                      <select 
                        className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
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
                      <label className="text-sm font-medium text-orange-400">Numéro de série</label>
                      <select 
                        className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500"
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
                    <OrangeButton 
                      variant="outline" 
                      className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                      disabled={!selectedProduct}
                    >
                      <Printer className="h-4 w-4" />
                      Imprimer
                    </OrangeButton>
                    <OrangeButton 
                      variant="outline" 
                      className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                      disabled={!selectedProduct}
                    >
                      <Download className="h-4 w-4" />
                      Télécharger
                    </OrangeButton>
                    <OrangeButton 
                      variant="outline" 
                      className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                      disabled={!selectedProduct}
                    >
                      <Copy className="h-4 w-4" />
                      Copier
                    </OrangeButton>
                  </div>
                </div>
              )}
              
              {activeTab === 'scan' && (
                <div>
                  <div className="mb-6 text-center">
                    <p className="text-gray-300 mb-4">Utilisez votre caméra pour scanner un QR code ou un code-barres</p>
                    <div className="bg-gray-800/70 border border-orange-800/30 h-64 rounded-lg flex items-center justify-center mb-6">
                      <Scan className="h-16 w-16 text-gray-500" />
                    </div>
                    <OrangeButton className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                      <Scan className="h-4 w-4" />
                      Commencer à scanner
                    </OrangeButton>
                  </div>
                  
                  <div className="text-center mt-8">
                    <p className="text-sm text-gray-400">ou</p>
                    <div className="mt-4 max-w-md mx-auto">
                      <label className="text-sm font-medium text-orange-400 text-left block mb-2">Saisir manuellement</label>
                      <div className="flex">
                        <Input 
                          type="text" 
                          placeholder="Entrez un code manuellement"
                          value={barcodeValue}
                          onChange={(e) => setBarcodeValue(e.target.value)}
                          className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                        />
                        <OrangeButton className="ml-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                          <Search className="h-4 w-4" />
                          Rechercher
                        </OrangeButton>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-medium text-orange-500">Historique des scans récents</h3>
                    <OrangeButton variant="outline" className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30">
                      <Download className="h-4 w-4" />
                      Exporter
                    </OrangeButton>
                  </div>
                  
                  <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-800/30 bg-orange-950/30">
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Type</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Valeur</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Date/Heure</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Utilisateur</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentScans.map((scan) => (
                          <tr key={scan.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                            <td className="px-4 py-3 flex items-center">
                              {scan.type === 'QR Code' ? (
                                <div className="flex items-center">
                                  <QrCode className="h-5 w-5 text-blue-400 mr-2" />
                                  <span className="text-gray-300">QR Code</span>
                                </div>
                              ) : (
                                <div className="flex items-center">
                                  <Barcode className="h-5 w-5 text-green-400 mr-2" />
                                  <span className="text-gray-300">Code-barres</span>
                                </div>
                              )}
                            </td>
                            <td className="px-4 py-3 text-gray-300">{scan.value}</td>
                            <td className="px-4 py-3 text-gray-300">{scan.timestamp}</td>
                            <td className="px-4 py-3 text-gray-300">{scan.user}</td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                  <Copy className="h-4 w-4" />
                                </OrangeButton>
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                  <Search className="h-4 w-4" />
                                </OrangeButton>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <Card className="p-6 border-orange-800/30 bg-gray-800/50 backdrop-blur mt-8">
            <div className="flex items-start gap-3">
              <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-orange-500 mb-2">Astuce</h3>
                <p className="text-gray-300">
                  Les QR codes sont idéaux pour stocker des informations détaillées sur les produits, tandis que les codes-barres 
                  sont mieux adaptés pour les références simples. Pour un inventaire rapide, utilisez l'application mobile 
                  pour scanner plusieurs articles à la suite.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
