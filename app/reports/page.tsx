// app/reports/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  FileText, 
  Download, 
  Mail, 
  Clock, 
  Edit2, 
  Trash2, 
  Eye, 
  PlayCircle, 
  PauseCircle,
  Info
} from "lucide-react"

export default function Reports() {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showModal, setShowModal] = useState(false);
  
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
      case 'Inventaire': return 'bg-blue-900/30 text-blue-400';
      case 'Analyse': return 'bg-green-900/30 text-green-400';
      case 'Mouvement': return 'bg-purple-900/30 text-purple-400';
      case 'Alerte': return 'bg-red-900/30 text-red-400';
      case 'Prévision': return 'bg-yellow-900/30 text-yellow-400';
      default: return 'bg-gray-800/50 text-gray-300';
    }
  };
  
  // Fonction pour formater les formats disponibles
  const formatAvailableFormats = (formats) => {
    return formats.join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Rapports automatisés</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <OrangeButton 
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white"
              onClick={() => setShowModal(true)}
            >
              <Clock className="h-4 w-4" />
              Programmer un rapport
            </OrangeButton>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur">
            <div className="border-b border-orange-800/30">
              <nav className="flex space-x-8 px-6">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'scheduled' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('scheduled')}
                >
                  Rapports programmés
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'templates' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('templates')}
                >
                  Modèles disponibles
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'history' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                  }`}
                  onClick={() => setActiveTab('history')}
                >
                  Historique des envois
                </button>
              </nav>
            </div>
            
            <div className="p-6">
              {activeTab === 'scheduled' && (
                <div>
                  <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-800/30 bg-orange-950/30">
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Nom du rapport</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Type</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Format</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Fréquence</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Dernier envoi</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Prochain envoi</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Statut</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {scheduledReports.map((report) => (
                          <tr key={report.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                            <td className="px-4 py-3 font-medium text-gray-300">{report.name}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${getReportTypeClass(report.type)}`}>
                                {report.type}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-gray-300">{report.format}</td>
                            <td className="px-4 py-3 text-gray-300">{report.frequency}</td>
                            <td className="px-4 py-3 text-gray-300">{report.lastSent}</td>
                            <td className="px-4 py-3 text-gray-300">{report.nextSend}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                report.active ? 'bg-green-900/30 text-green-400' : 'bg-gray-800/50 text-gray-400'
                              }`}>
                                {report.active ? 'Actif' : 'Inactif'}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex space-x-2">
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                  <Edit2 className="h-4 w-4" />
                                </OrangeButton>
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-orange-950/50">
                                  {report.active ? (
                                    <PauseCircle className="h-4 w-4 text-yellow-400" />
                                  ) : (
                                    <PlayCircle className="h-4 w-4 text-green-400" />
                                  )}
                                </OrangeButton>
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-400 hover:bg-orange-950/50">
                                  <Mail className="h-4 w-4" />
                                </OrangeButton>
                                <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-400 hover:bg-orange-950/50">
                                  <Trash2 className="h-4 w-4" />
                                </OrangeButton>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="mt-4 text-sm text-gray-400">
                    <p>Total : {scheduledReports.length} rapport(s) programmé(s), {scheduledReports.filter(r => r.active).length} actif(s)</p>
                  </div>
                </div>
              )}
              
              {activeTab === 'templates' && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {reportTemplates.map((template) => (
                      <Card key={template.id} className="p-4 border-orange-800/30 bg-gray-800/50">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="font-medium text-white">{template.name}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs ${getReportTypeClass(template.type)}`}>
                            {template.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300 mb-4">{template.description}</p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-400">Formats: {formatAvailableFormats(template.formats)}</span>
                          <div className="flex space-x-2">
                            <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                              <Eye className="h-4 w-4" />
                            </OrangeButton>
                            <OrangeButton variant="ghost" size="sm" className="text-orange-500 hover:bg-orange-950/50">
                              Programmer
                            </OrangeButton>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              
              {activeTab === 'history' && (
                <div>
                  <div className="flex justify-between mb-6">
                    <div className="flex space-x-2 w-1/3">
                      <Input 
                        type="text" 
                        placeholder="Rechercher dans l'historique" 
                        className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                      />
                      <OrangeButton className="bg-orange-500 hover:bg-orange-600 text-white">
                        Rechercher
                      </OrangeButton>
                    </div>
                    <div className="space-x-2">
                      <OrangeButton variant="outline" className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30">
                        <Download className="h-4 w-4" />
                        Exporter l'historique
                      </OrangeButton>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-orange-800/30 bg-orange-950/30">
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Date d'envoi</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Rapport</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Type</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Format</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Destinataires</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Statut</th>
                          <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-gray-800 hover:bg-orange-950/20">
                          <td className="px-4 py-3 text-gray-300">18/04/2025 08:00</td>
                          <td className="px-4 py-3 font-medium text-gray-300">Rapport hebdomadaire de stock</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400">
                              Inventaire
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">PDF</td>
                          <td className="px-4 py-3 text-gray-300">2 destinataires</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                              Envoyé
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                <Eye className="h-4 w-4" />
                              </OrangeButton>
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-400 hover:bg-orange-950/50">
                                <Download className="h-4 w-4" />
                              </OrangeButton>
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-400 hover:bg-orange-950/50">
                                <Mail className="h-4 w-4" />
                              </OrangeButton>
                            </div>
                          </td>
                        </tr>
                        <tr className="border-b border-gray-800 hover:bg-orange-950/20">
                          <td className="px-4 py-3 text-gray-300">31/03/2025 23:30</td>
                          <td className="px-4 py-3 font-medium text-gray-300">Rapport mensuel de rotation</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                              Analyse
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-300">Excel</td>
                          <td className="px-4 py-3 text-gray-300">2 destinataires</td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 rounded-full text-xs bg-green-900/30 text-green-400">
                              Envoyé
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                <Eye className="h-4 w-4" />
                              </OrangeButton>
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-400 hover:bg-orange-950/50">
                                <Download className="h-4 w-4" />
                              </OrangeButton>
                              <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-blue-400 hover:bg-orange-950/50">
                                <Mail className="h-4 w-4" />
                              </OrangeButton>
                            </div>
                          </td>
                        </tr>
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
                <h3 className="text-lg font-medium text-orange-500 mb-2">À propos des rapports automatisés</h3>
                <p className="text-gray-300">
                  Les rapports automatisés permettent de générer et d'envoyer des informations importantes à intervalles réguliers, 
                  sans intervention manuelle. Vous pouvez programmer des rapports quotidiens, hebdomadaires, mensuels ou personnalisés
                  et les distribuer automatiquement aux destinataires concernés par email.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
      
      {/* Modal pour créer un nouveau rapport */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <Card className="p-6 border-orange-800/30 bg-gray-800/50 backdrop-blur max-w-2xl w-full">
            <h3 className="text-xl font-semibold text-orange-500 mb-4">Programmer un nouveau rapport</h3>
            <p className="text-gray-300 mb-6">Configurez les paramètres du rapport automatisé</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Nom du rapport</label>
                <Input 
                  type="text" 
                  placeholder="Saisissez un nom" 
                  className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Type de rapport</label>
                <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                  <option value="">Sélectionnez un type</option>
                  <option value="inventory">Inventaire</option>
                  <option value="analysis">Analyse</option>
                  <option value="movement">Mouvement</option>
                  <option value="alert">Alerte</option>
                  <option value="forecast">Prévision</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Format</label>
                <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="email">Email</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-orange-400">Fréquence</label>
                <select className="w-full rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-2 px-3 focus:border-orange-500">
                  <option value="daily">Quotidien</option>
                  <option value="weekly">Hebdomadaire</option>
                  <option value="monthly">Mensuel</option>
                  <option value="custom">Personnalisé</option>
                </select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-orange-400">Destinataires</label>
                <Input 
                  type="text" 
                  placeholder="email1@orange.fr, email2@orange.fr" 
                  className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white placeholder:text-gray-500"
                />
                <p className="text-xs text-gray-400">Séparez les adresses email par des virgules</p>
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <OrangeButton 
                variant="outline" 
                className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                onClick={() => setShowModal(false)}
              >
                Annuler
              </OrangeButton>
              <OrangeButton 
                className="bg-orange-500 hover:bg-orange-600 text-white" 
                onClick={() => setShowModal(false)}
              >
                Programmer le rapport
              </OrangeButton>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
