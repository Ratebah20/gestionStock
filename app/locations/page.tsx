// app/locations/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  MapPin, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  Search, 
  Grid, 
  Info,
  Download
} from "lucide-react"

export default function Locations() {
  const [activeTab, setActiveTab] = useState('list');
  const [editMode, setEditMode] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  // Données fictives pour les emplacements de stockage
  const [locations, setLocations] = useState([
    { id: 1, name: 'Entrepôt Principal', code: 'EP', zones: [
      { id: 1, name: 'Zone A', aisles: [
        { id: 1, name: 'Allée A1', shelves: [
          { id: 1, name: 'Étagère A1-1', levels: ['Niveau 1', 'Niveau 2', 'Niveau 3'] },
          { id: 2, name: 'Étagère A1-2', levels: ['Niveau 1', 'Niveau 2'] }
        ]},
        { id: 2, name: 'Allée A2', shelves: [
          { id: 3, name: 'Étagère A2-1', levels: ['Niveau 1', 'Niveau 2', 'Niveau 3'] }
        ]}
      ]},
      { id: 2, name: 'Zone B', aisles: [
        { id: 3, name: 'Allée B1', shelves: [
          { id: 4, name: 'Étagère B1-1', levels: ['Niveau 1', 'Niveau 2'] }
        ]}
      ]}
    ]},
    { id: 2, name: 'Entrepôt Secondaire', code: 'ES', zones: [
      { id: 3, name: 'Zone S', aisles: [
        { id: 4, name: 'Allée S1', shelves: [
          { id: 5, name: 'Étagère S1-1', levels: ['Niveau 1', 'Niveau 2'] }
        ]}
      ]}
    ]}
  ]);
  
  // Produits associés aux emplacements (données fictives)
  const locationProducts = [
    { location: 'EP-A-A1-A1-1-N1', product: 'ONT XS-010X-Q Post Orange', quantity: 15, reference: '20002' },
    { location: 'EP-A-A1-A1-1-N2', product: 'Livebox 6', quantity: 28, reference: '20003' },
    { location: 'EP-A-A1-A1-2-N1', product: 'BBox Miami', quantity: 12, reference: '20004' },
    { location: 'EP-A-A2-A2-1-N3', product: 'ONT G-240W', quantity: 8, reference: '20005' },
    { location: 'EP-B-B1-B1-1-N1', product: 'Répéteur Wifi', quantity: 32, reference: '20006' },
    { location: 'ES-S-S1-S1-1-N1', product: 'ONT XS-010X-Q Post Orange', quantity: 22, reference: '20002' },
  ];
  
  const handleAddLocation = () => {
    // Logique pour ajouter un nouvel emplacement
  };
  
  const handleEditLocation = (location) => {
    setSelectedLocation(location);
    setEditMode(true);
  };
  
  // Rendu d'une carte simplifiée de l'entrepôt
  const WarehouseMap = () => (
    <div className="border border-orange-800/30 rounded-lg p-4 h-96 relative bg-gray-800/30 backdrop-blur">
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
        {/* Zone A */}
        <div className="col-span-3 row-span-2 border-2 border-orange-500/70 p-2 rounded">
          <div className="font-medium text-orange-500 mb-2">Zone A</div>
          <div className="grid grid-cols-2 gap-2 h-5/6">
            <div className="border border-gray-700 p-1 bg-gray-800/50 rounded flex flex-col">
              <div className="text-sm font-medium text-gray-300">Allée A1</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 w-full">
                  <div className="bg-orange-950/50 text-orange-400 rounded p-1 text-xs">A1-1</div>
                  <div className="bg-green-950/50 text-green-400 rounded p-1 text-xs">A1-2</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-700 p-1 bg-gray-800/50 rounded flex flex-col">
              <div className="text-sm font-medium text-gray-300">Allée A2</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 gap-1 w-full">
                  <div className="bg-blue-950/50 text-blue-400 rounded p-1 text-xs">A2-1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Zone B */}
        <div className="col-span-1 row-span-2 border-2 border-green-500/70 p-2 rounded">
          <div className="font-medium text-green-400 mb-2">Zone B</div>
          <div className="h-5/6 border border-gray-700 p-1 bg-gray-800/50 rounded flex flex-col">
            <div className="text-sm font-medium text-gray-300">Allée B1</div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-1 gap-1 w-full">
                <div className="bg-yellow-950/50 text-yellow-400 rounded p-1 text-xs">B1-1</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Légende */}
        <div className="col-span-4 row-span-1 border border-orange-800/30 p-2 rounded bg-gray-800/50">
          <div className="font-medium text-orange-500 mb-1">Légende</div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-500/70 mr-1"></div>
              <span className="text-gray-300">ONT XS-010X-Q</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500/70 mr-1"></div>
              <span className="text-gray-300">Livebox 6</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-500/70 mr-1"></div>
              <span className="text-gray-300">BBox Miami</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-500/70 mr-1"></div>
              <span className="text-gray-300">Répéteur Wifi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Gestion des emplacements</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex gap-3">
              <OrangeButton 
                className="flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white self-start md:self-auto"
                onClick={handleAddLocation}
              >
                <PlusCircle className="h-4 w-4" />
                Ajouter un emplacement
              </OrangeButton>
            </div>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur mb-8">
            <div className="border-b border-orange-800/30">
              <nav className="flex space-x-8 px-6">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'list' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('list')}
                >
                  Liste des emplacements
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'map' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('map')}
                >
                  Carte de l'entrepôt
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'products' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('products')}
                >
                  Produits par emplacement
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'list' && (
                <div>
                  <div className="flex justify-between mb-6">
                    <div className="flex space-x-2 w-1/3">
                      <Input 
                        type="text" 
                        placeholder="Rechercher un emplacement" 
                        className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                      <OrangeButton className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Search className="h-4 w-4" />
                      </OrangeButton>
                    </div>
                    <div>
                      <OrangeButton 
                        variant="outline" 
                        className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30" 
                        onClick={() => setEditMode(!editMode)}
                      >
                        <Edit2 className="h-4 w-4" />
                        {editMode ? 'Terminer l\'édition' : 'Modifier'}
                      </OrangeButton>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-800/30 bg-orange-950/30">
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Entrepôt</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Zone</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Allée</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Étagère</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Niveau</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Code complet</th>
                          {editMode && <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {locations.flatMap(warehouse => 
                          warehouse.zones.flatMap(zone => 
                            zone.aisles.flatMap(aisle => 
                              aisle.shelves.flatMap(shelf => 
                                shelf.levels.map((level, levelIndex) => {
                                  const locationCode = `${warehouse.code}-${zone.name.split(' ')[1]}-${aisle.name.split(' ')[1]}-${shelf.name.split(' ')[1]}-${level.replace('Niveau ', 'N')}`;
                                  return (
                                    <tr key={`${shelf.id}-${levelIndex}`} className="border-b border-gray-800 hover:bg-orange-950/20">
                                      <td className="px-4 py-3 text-gray-300">{warehouse.name}</td>
                                      <td className="px-4 py-3 text-gray-300">{zone.name}</td>
                                      <td className="px-4 py-3 text-gray-300">{aisle.name}</td>
                                      <td className="px-4 py-3 text-gray-300">{shelf.name}</td>
                                      <td className="px-4 py-3 text-gray-300">{level}</td>
                                      <td className="px-4 py-3">
                                        <span className="px-2 py-1 bg-orange-950/30 rounded font-mono text-xs text-orange-400">
                                          {locationCode}
                                        </span>
                                      </td>
                                      {editMode && (
                                        <td className="px-4 py-3">
                                          <div className="flex space-x-2">
                                            <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                              <Edit2 className="h-4 w-4" />
                                            </OrangeButton>
                                            <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:bg-red-950/50">
                                              <Trash2 className="h-4 w-4" />
                                            </OrangeButton>
                                          </div>
                                        </td>
                                      )}
                                    </tr>
                                  );
                                })
                              )
                            )
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
              
              {activeTab === 'map' && (
                <div>
                  <div className="flex justify-between mb-6">
                    <div className="space-y-2 w-1/3">
                      <label className="text-sm font-medium text-orange-400">Sélectionner un entrepôt</label>
                      <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                        <option value="1">Entrepôt Principal</option>
                        <option value="2">Entrepôt Secondaire</option>
                      </select>
                    </div>
                    <div>
                      <OrangeButton className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                        <Grid className="h-4 w-4" />
                        Afficher la grille
                      </OrangeButton>
                    </div>
                  </div>
                  
                  <WarehouseMap />
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <p>Cliquez sur un emplacement dans la carte pour voir les détails des produits stockés.</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'products' && (
                <div>
                  <div className="flex justify-between mb-6">
                    <div className="flex space-x-2 w-1/3">
                      <Input 
                        type="text" 
                        placeholder="Rechercher un produit ou emplacement" 
                        className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                      <OrangeButton className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Search className="h-4 w-4" />
                      </OrangeButton>
                    </div>
                    <div className="flex items-center gap-3">
                      <select className="rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                        <option value="">Filtrer par produit</option>
                        <option value="20002">ONT XS-010X-Q Post Orange</option>
                        <option value="20003">Livebox 6</option>
                        <option value="20004">BBox Miami</option>
                      </select>
                      <OrangeButton variant="outline" className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30">
                        <Download className="h-4 w-4" />
                        Exporter
                      </OrangeButton>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-800/30 bg-orange-950/30">
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Code emplacement</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Référence</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Produit</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Quantité</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {locationProducts.map((item, index) => (
                          <tr key={index} className="border-b border-gray-800 hover:bg-orange-950/20">
                            <td className="px-4 py-3">
                              <span className="px-2 py-1 bg-orange-950/30 rounded font-mono text-xs text-orange-400">
                                {item.location}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{item.reference}</td>
                            <td className="px-4 py-3 text-gray-300">{item.product}</td>
                            <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                            <td className="px-4 py-3">
                              <OrangeButton variant="ghost" size="sm" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 p-0 h-auto">
                                Détails
                              </OrangeButton>
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
          
          <Card className="p-6 border-orange-800/30 bg-gray-800/50 backdrop-blur">
            <div className="flex items-start gap-3">
              <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                <Info className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-orange-500 mb-2">Organisation optimale</h3>
                <p className="text-gray-300">
                  Une bonne organisation des emplacements permet d'optimiser le picking et le rangement des produits. 
                  Placez les articles à forte rotation près des zones d'expédition pour réduire les temps de déplacement.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
