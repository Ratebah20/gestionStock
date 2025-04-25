import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Map, PlusCircle, Edit2, Trash2, Search, Grid, MapPin } from 'lucide-react';

const LocationManagement = () => {
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
    <div className="border border-gray-300 rounded-lg p-4 h-96 relative bg-gray-50">
      <div className="grid grid-cols-4 grid-rows-3 gap-2 h-full">
        {/* Zone A */}
        <div className="col-span-3 row-span-2 border-2 border-blue-500 p-2 rounded">
          <div className="font-medium text-blue-600 mb-2">Zone A</div>
          <div className="grid grid-cols-2 gap-2 h-5/6">
            <div className="border border-gray-400 p-1 bg-white rounded flex flex-col">
              <div className="text-sm font-medium">Allée A1</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1 w-full">
                  <div className="bg-orange-100 rounded p-1 text-xs">A1-1</div>
                  <div className="bg-green-100 rounded p-1 text-xs">A1-2</div>
                </div>
              </div>
            </div>
            <div className="border border-gray-400 p-1 bg-white rounded flex flex-col">
              <div className="text-sm font-medium">Allée A2</div>
              <div className="flex-1 flex items-center justify-center">
                <div className="grid grid-cols-1 gap-1 w-full">
                  <div className="bg-blue-100 rounded p-1 text-xs">A2-1</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Zone B */}
        <div className="col-span-1 row-span-2 border-2 border-green-500 p-2 rounded">
          <div className="font-medium text-green-600 mb-2">Zone B</div>
          <div className="h-5/6 border border-gray-400 p-1 bg-white rounded flex flex-col">
            <div className="text-sm font-medium">Allée B1</div>
            <div className="flex-1 flex items-center justify-center">
              <div className="grid grid-cols-1 gap-1 w-full">
                <div className="bg-yellow-100 rounded p-1 text-xs">B1-1</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Légende */}
        <div className="col-span-4 row-span-1 border border-gray-300 p-2 rounded bg-white">
          <div className="font-medium text-gray-600 mb-1">Légende</div>
          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-orange-100 mr-1"></div>
              <span>ONT XS-010X-Q</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-100 mr-1"></div>
              <span>Livebox 6</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-100 mr-1"></div>
              <span>BBox Miami</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-yellow-100 mr-1"></div>
              <span>Répéteur Wifi</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <MapPin className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Gestion des emplacements</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleAddLocation}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Ajouter un emplacement
            </Button>
          </div>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'list' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('list')}
            >
              Liste des emplacements
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'map' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('map')}
            >
              Carte de l'entrepôt
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('products')}
            >
              Produits par emplacement
            </button>
          </nav>
        </div>
        
        {activeTab === 'list' && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2 w-1/3">
                <Input type="text" placeholder="Rechercher un emplacement" />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <Button variant="outline" className="flex items-center" onClick={() => setEditMode(!editMode)}>
                  <Edit2 className="mr-2 h-4 w-4" />
                  {editMode ? 'Terminer l\'édition' : 'Modifier'}
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Entrepôt</th>
                    <th className="px-4 py-3 text-left">Zone</th>
                    <th className="px-4 py-3 text-left">Allée</th>
                    <th className="px-4 py-3 text-left">Étagère</th>
                    <th className="px-4 py-3 text-left">Niveau</th>
                    <th className="px-4 py-3 text-left">Code complet</th>
                    {editMode && <th className="px-4 py-3 text-left">Actions</th>}
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
                              <tr key={`${shelf.id}-${levelIndex}`} className="border-b">
                                <td className="px-4 py-3">{warehouse.name}</td>
                                <td className="px-4 py-3">{zone.name}</td>
                                <td className="px-4 py-3">{aisle.name}</td>
                                <td className="px-4 py-3">{shelf.name}</td>
                                <td className="px-4 py-3">{level}</td>
                                <td className="px-4 py-3">
                                  <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                                    {locationCode}
                                  </span>
                                </td>
                                {editMode && (
                                  <td className="px-4 py-3">
                                    <div className="flex space-x-2">
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-500">
                                        <Edit2 className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
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
            <div className="flex justify-between mb-4">
              <div className="space-y-2 w-1/3">
                <label className="text-sm font-medium">Sélectionner un entrepôt</label>
                <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                  <option value="1">Entrepôt Principal</option>
                  <option value="2">Entrepôt Secondaire</option>
                </select>
              </div>
              <div>
                <Button className="flex items-center">
                  <Grid className="mr-2 h-4 w-4" />
                  Afficher la grille
                </Button>
              </div>
            </div>
            
            <WarehouseMap />
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Cliquez sur un emplacement dans la carte pour voir les détails des produits stockés.</p>
            </div>
          </div>
        )}
        
        {activeTab === 'products' && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2 w-1/3">
                <Input type="text" placeholder="Rechercher un produit ou emplacement" />
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Search className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-x-2">
                <select className="rounded-md border border-gray-300 py-2 px-3">
                  <option value="">Filtrer par produit</option>
                  <option value="20002">ONT XS-010X-Q Post Orange</option>
                  <option value="20003">Livebox 6</option>
                  <option value="20004">BBox Miami</option>
                </select>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Code emplacement</th>
                    <th className="px-4 py-3 text-left">Référence</th>
                    <th className="px-4 py-3 text-left">Produit</th>
                    <th className="px-4 py-3 text-left">Quantité</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {locationProducts.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                          {item.location}
                        </span>
                      </td>
                      <td className="px-4 py-3">{item.reference}</td>
                      <td className="px-4 py-3">{item.product}</td>
                      <td className="px-4 py-3">{item.quantity}</td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" className="text-blue-500">
                          Détails
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Organisation optimale</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Une bonne organisation des emplacements permet d'optimiser le picking et le rangement des produits. 
            Placez les articles à forte rotation près des zones d'expédition pour réduire les temps de déplacement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LocationManagement;