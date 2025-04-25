import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText, Download, Mail, Clock, Edit2, Trash2, Eye, PlayCircle, PauseCircle } from 'lucide-react';

const AutomatedReports = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  
  // Données fictives pour les rapports programmés
  const scheduledReports = [
    { 
      id: 1, 
      name: 'Rapport hebdomadaire de stock', 
      type: 'Inventaire', 
      format: 'PDF', 
      frequency: 'Hebdomadaire', 
      lastSent: '18/04/2025', 
      nextSend: '25/04/2025', 
      recipients: ['responsable.stock@orange.fr', 'directeur@orange.fr'],
      active: true
    },
    { 
      id: 2, 
      name: 'Rapport mensuel de rotation', 
      type: 'Analyse', 
      format: 'Excel', 
      frequency: 'Mensuel', 
      lastSent: '31/03/2025', 
      nextSend: '30/04/2025', 
      recipients: ['responsable.stock@orange.fr', 'analyse@orange.fr'],
      active: true
    },
    { 
      id: 3, 
      name: 'Alerte produits faible rotation', 
      type: 'Alerte', 
      format: 'Email', 
      frequency: 'Quotidien', 
      lastSent: '23/04/2025', 
      nextSend: '24/04/2025', 
      recipients: ['responsable.stock@orange.fr'],
      active: false
    },
  ];
  
  // Données fictives pour les modèles de rapports
  const reportTemplates = [
    { id: 1, name: 'État du stock complet', description: 'Inventaire détaillé de tous les produits', type: 'Inventaire', formats: ['PDF', 'Excel'] },
    { id: 2, name: 'Analyse de rotation', description: 'Analyse des produits par taux de rotation', type: 'Analyse', formats: ['PDF', 'Excel'] },
    { id: 3, name: 'Mouvement de stock', description: 'Entrées et sorties sur une période donnée', type: 'Mouvement', formats: ['PDF', 'Excel'] },
    { id: 4, name: 'Alerte stock minimum', description: 'Liste des produits atteignant le seuil critique', type: 'Alerte', formats: ['Email', 'PDF'] },
    { id: 5, name: 'Prévisions de stock', description: 'Projection des besoins en stock sur 3 mois', type: 'Prévision', formats: ['PDF', 'Excel'] },
  ];
  
  // Fonction pour obtenir la classe CSS en fonction du type de rapport
  const getReportTypeClass = (type) => {
    switch (type) {
      case 'Inventaire': return 'bg-blue-100 text-blue-800';
      case 'Analyse': return 'bg-green-100 text-green-800';
      case 'Mouvement': return 'bg-purple-100 text-purple-800';
      case 'Alerte': return 'bg-red-100 text-red-800';
      case 'Prévision': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Fonction pour formater les formats disponibles
  const formatAvailableFormats = (formats) => {
    return formats.join(', ');
  };
  
  // Modal pour créer un nouveau rapport (simulation)
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <FileText className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Rapports automatisés</h2>
          </div>
          <Button 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setShowModal(true)}
          >
            <Clock className="mr-2 h-4 w-4" />
            Programmer un rapport
          </Button>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'scheduled' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('scheduled')}
            >
              Rapports programmés
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'templates' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('templates')}
            >
              Modèles disponibles
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'history' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab('history')}
            >
              Historique des envois
            </button>
          </nav>
        </div>
        
        {activeTab === 'scheduled' && (
          <div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Nom du rapport</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Format</th>
                    <th className="px-4 py-3 text-left">Fréquence</th>
                    <th className="px-4 py-3 text-left">Dernier envoi</th>
                    <th className="px-4 py-3 text-left">Prochain envoi</th>
                    <th className="px-4 py-3 text-left">Statut</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledReports.map((report) => (
                    <tr key={report.id} className="border-b">
                      <td className="px-4 py-3 font-medium">{report.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getReportTypeClass(report.type)}`}>
                          {report.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">{report.format}</td>
                      <td className="px-4 py-3">{report.frequency}</td>
                      <td className="px-4 py-3">{report.lastSent}</td>
                      <td className="px-4 py-3">{report.nextSend}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          report.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {report.active ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit2 className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            {report.active ? (
                              <PauseCircle className="h-4 w-4 text-yellow-500" />
                            ) : (
                              <PlayCircle className="h-4 w-4 text-green-500" />
                            )}
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Mail className="h-4 w-4 text-purple-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-4 text-sm text-gray-500">
              <p>Total : {scheduledReports.length} rapport(s) programmé(s), {scheduledReports.filter(r => r.active).length} actif(s)</p>
            </div>
          </div>
        )}
        
        {activeTab === 'templates' && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTemplates.map((template) => (
                <div key={template.id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-medium">{template.name}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs ${getReportTypeClass(template.type)}`}>
                      {template.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{template.description}</p>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">Formats: {formatAvailableFormats(template.formats)}</span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye className="h-4 w-4 text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-orange-500">
                        Programmer
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'history' && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2 w-1/3">
                <Input type="text" placeholder="Rechercher dans l'historique" />
                <Button className="bg-blue-600 hover:bg-blue-700">Rechercher</Button>
              </div>
              <div className="space-x-2">
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Exporter l'historique
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Date d'envoi</th>
                    <th className="px-4 py-3 text-left">Rapport</th>
                    <th className="px-4 py-3 text-left">Type</th>
                    <th className="px-4 py-3 text-left">Format</th>
                    <th className="px-4 py-3 text-left">Destinataires</th>
                    <th className="px-4 py-3 text-left">Statut</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">18/04/2025 08:00</td>
                    <td className="px-4 py-3 font-medium">Rapport hebdomadaire de stock</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                        Inventaire
                      </span>
                    </td>
                    <td className="px-4 py-3">PDF</td>
                    <td className="px-4 py-3">2 destinataires</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Envoyé
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3">31/03/2025 23:30</td>
                    <td className="px-4 py-3 font-medium">Rapport mensuel de rotation</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Analyse
                      </span>
                    </td>
                    <td className="px-4 py-3">Excel</td>
                    <td className="px-4 py-3">2 destinataires</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        Envoyé
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4 text-blue-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Download className="h-4 w-4 text-green-500" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Mail className="h-4 w-4 text-purple-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">À propos des rapports automatisés</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Les rapports automatisés permettent de générer et d'envoyer des informations importantes à intervalles réguliers, 
            sans intervention manuelle. Vous pouvez programmer des rapports quotidiens, hebdomadaires, mensuels ou personnalisés
            et les distribuer automatiquement aux destinataires concernés par email.
          </p>
        </div>
      </div>
      
      {/* Modal pour créer un nouveau rapport (simple affichage) */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-semibold mb-4">Programmer un nouveau rapport</h3>
            <p className="text-gray-600 mb-4">Configurez les paramètres du rapport automatisé</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom du rapport</label>
                <Input type="text" placeholder="Saisissez un nom" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Type de rapport</label>
                <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                  <option value="">Sélectionnez un type</option>
                  <option value="inventory">Inventaire</option>
                  <option value="analysis">Analyse</option>
                  <option value="movement">Mouvement</option>
                  <option value="alert">Alerte</option>
                  <option value="forecast">Prévision</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Format</label>
                <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Fréquence</label>
                <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Destinataires</label>
                <Input type="text" placeholder="email1@orange.fr, email2@orange.fr" />
                <p className="text-xs text-gray-500">Séparez les adresses email par des virgules</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button variant="outline" onClick={() => setShowModal(false)}>
                Annuler
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowModal(false)}>
                Programmer le rapport
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AutomatedReports;