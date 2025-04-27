// app/notifications/page.tsx
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
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X, 
  Check, 
  Edit2, 
  MessageSquare,
  Download,
  Smartphone,
  Mail
} from "lucide-react"

export default function Notifications() {
  const [activeTab, setActiveTab] = useState('center');
  const [showConfig, setShowConfig] = useState(false);
  
  // Données fictives pour les notifications
  const notifications = [
    { 
      id: 1, 
      title: 'Stock critique', 
      message: 'ONT XS-010X-Q : seuil d\'alerte atteint (10 restants)', 
      type: 'warning', 
      date: '24/04/2025 09:15', 
      read: false,
      priority: 'high'
    },
    { 
      id: 2, 
      title: 'Commande expédiée', 
      message: 'Commande #54892 expédiée avec succès au client Dupont Jean', 
      type: 'success', 
      date: '23/04/2025 14:32', 
      read: true,
      priority: 'normal'
    },
    { 
      id: 3, 
      title: 'Nouvel approvisionnement', 
      message: 'Livraison prévue de 50 Livebox 6 le 26/04/2025', 
      type: 'info', 
      date: '23/04/2025 11:05', 
      read: true,
      priority: 'normal'
    },
    { 
      id: 4, 
      title: 'Stock épuisé', 
      message: 'Répéteur Wifi : stock épuisé, 5 commandes en attente', 
      type: 'error', 
      date: '22/04/2025 17:48', 
      read: false,
      priority: 'high'
    }
  ];
  
  // Données fictives pour les préférences de notifications
  const notificationPreferences = [
    { id: 1, type: 'stock_alert', name: 'Alertes de stock', email: true, sms: true, app: true, priority: 'high' },
    { id: 2, type: 'order_status', name: 'Statut des commandes', email: true, sms: false, app: true, priority: 'normal' },
    { id: 3, type: 'delivery', name: 'Livraisons prévues', email: true, sms: false, app: true, priority: 'normal' },
    { id: 4, type: 'stock_movement', name: 'Mouvements de stock', email: false, sms: false, app: true, priority: 'low' },
    { id: 5, type: 'task_reminder', name: 'Rappels de tâches', email: true, sms: true, app: true, priority: 'high' },
  ];
  
  // Données fictives pour les rappels programmés
  const scheduledReminders = [
    { id: 1, title: 'Inventaire mensuel', date: '30/04/2025 09:00', recurring: true, period: 'Mensuel', assignedTo: ['Martin T.', 'Sophie D.'], status: 'pending' },
    { id: 2, title: 'Commander stocks ONT', date: '26/04/2025 14:00', recurring: false, period: null, assignedTo: ['Thomas P.'], status: 'pending' },
    { id: 3, title: 'Vérifier expéditions en attente', date: '24/04/2025 16:30', recurring: true, period: 'Quotidien', assignedTo: ['Sophie D.'], status: 'completed' },
  ];
  
  // Fonction pour obtenir l'icône en fonction du type de notification
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'info': return <Info className="h-5 w-5 text-blue-500" />;
      case 'error': return <AlertTriangle className="h-5 w-5 text-red-500" />;
      default: return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  // Fonction pour marquer une notification comme lue
  const markAsRead = (id) => {
    // Dans une application réelle, cela mettrait à jour l'état
    console.log(`Notification ${id} marked as read`);
  };
  
  // Fonction pour supprimer une notification
  const deleteNotification = (id) => {
    // Dans une application réelle, cela supprimerait la notification
    console.log(`Notification ${id} deleted`);
  };
  
  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Système de notifications</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex gap-3">
              <OrangeButton 
                variant="outline" 
                className="flex items-center gap-2 border-orange-500 text-orange-500 hover:bg-orange-950/30"
                onClick={() => setShowConfig(!showConfig)}
              >
                <Settings className="h-4 w-4" />
                Configurer
              </OrangeButton>
              <OrangeButton className="flex items-center gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white">
                <Download className="h-4 w-4" />
                Exporter
              </OrangeButton>
            </div>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur">
            {!showConfig ? (
              <div>
                <div className="border-b border-orange-800/30">
                  <nav className="flex space-x-8 px-6">
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'center' 
                          ? 'border-orange-500 text-orange-500' 
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                      }`}
                      onClick={() => setActiveTab('center')}
                    >
                      Centre de notifications
                    </button>
                    <button
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === 'reminders' 
                          ? 'border-orange-500 text-orange-500' 
                          : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-orange-800/50'
                      }`}
                      onClick={() => setActiveTab('reminders')}
                    >
                      Rappels et tâches
                    </button>
                  </nav>
                </div>
                
                <div className="p-6">
                  {activeTab === 'center' && (
                    <div>
                      <div className="flex justify-between mb-6">
                        <div>
                          <OrangeButton variant="ghost" size="sm" className="text-orange-500 hover:bg-orange-950/30">
                            Tout marquer comme lu
                          </OrangeButton>
                        </div>
                        <div className="flex space-x-2">
                          <select className="rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-1 px-3 focus:border-orange-500 text-sm">
                            <option value="all">Toutes</option>
                            <option value="unread">Non lues</option>
                            <option value="high">Haute priorité</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        {notifications.map((notification) => (
                          <Card 
                            key={notification.id} 
                            className={`p-4 border border-orange-800/30 ${
                              !notification.read 
                                ? 'bg-orange-950/20' 
                                : 'bg-gray-800/30'
                            }`}
                          >
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-1">
                                {getNotificationIcon(notification.type)}
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="flex items-center justify-between">
                                  <p className={`text-sm font-medium ${
                                    !notification.read 
                                      ? 'text-orange-400' 
                                      : 'text-gray-300'
                                  }`}>
                                    {notification.title}
                                  </p>
                                  <div className="flex space-x-2">
                                    {!notification.read && (
                                      <OrangeButton variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => markAsRead(notification.id)}>
                                        <Check className="h-4 w-4 text-green-500" />
                                      </OrangeButton>
                                    )}
                                    <OrangeButton variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => deleteNotification(notification.id)}>
                                      <X className="h-4 w-4 text-red-500" />
                                    </OrangeButton>
                                  </div>
                                </div>
                                <p className={`text-sm ${
                                  !notification.read 
                                    ? 'text-gray-300' 
                                    : 'text-gray-400'
                                }`}>
                                  {notification.message}
                                </p>
                                <div className="mt-1 flex items-center">
                                  <p className="text-xs text-gray-500">
                                    {notification.date}
                                  </p>
                                  {notification.priority === 'high' && (
                                    <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-900/30 text-red-400">
                                      Priorité haute
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                      
                      {notifications.length === 0 && (
                        <div className="text-center py-12">
                          <Bell className="h-12 w-12 text-gray-500 mx-auto mb-4" />
                          <h3 className="text-lg font-medium text-white mb-1">Aucune notification</h3>
                          <p className="text-gray-400">Vous n'avez pas de nouvelles notifications pour le moment</p>
                        </div>
                      )}
                      
                      <div className="mt-6 flex justify-center">
                        <OrangeButton variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-950/30">
                          Voir toutes les notifications
                        </OrangeButton>
                      </div>
                    </div>
                  )}
                  
                  {activeTab === 'reminders' && (
                    <div>
                      <div className="flex justify-between mb-6">
                        <OrangeButton className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white">
                          <Calendar className="h-4 w-4" />
                          Nouveau rappel
                        </OrangeButton>
                      </div>
                      
                      <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-orange-800/30 bg-orange-950/30">
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Tâche</th>
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Date</th>
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Récurrence</th>
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Assigné à</th>
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Statut</th>
                              <th className="px-4 py-3 text-left font-medium text-orange-500">Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {scheduledReminders.map((reminder) => (
                              <tr key={reminder.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                                <td className="px-4 py-3 font-medium text-gray-300">{reminder.title}</td>
                                <td className="px-4 py-3 text-gray-300">{reminder.date}</td>
                                <td className="px-4 py-3">
                                  {reminder.recurring ? (
                                    <span className="px-2 py-1 rounded-full text-xs bg-purple-900/30 text-purple-400">
                                      {reminder.period}
                                    </span>
                                  ) : <span className="text-gray-300">Unique</span>}
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex flex-wrap gap-1">
                                    {reminder.assignedTo.map((person, index) => (
                                      <span key={index} className="px-2 py-1 rounded-full text-xs bg-blue-900/30 text-blue-400">
                                        {person}
                                      </span>
                                    ))}
                                  </div>
                                </td>
                                <td className="px-4 py-3">
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    reminder.status === 'completed' 
                                      ? 'bg-green-900/30 text-green-400' 
                                      : 'bg-yellow-900/30 text-yellow-400'
                                  }`}>
                                    {reminder.status === 'completed' ? 'Terminé' : 'À faire'}
                                  </span>
                                </td>
                                <td className="px-4 py-3">
                                  <div className="flex space-x-2">
                                    <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-orange-500 hover:bg-orange-950/50">
                                      <Edit2 className="h-4 w-4" />
                                    </OrangeButton>
                                    {reminder.status !== 'completed' && (
                                      <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-green-500 hover:bg-green-950/50">
                                        <Check className="h-4 w-4" />
                                      </OrangeButton>
                                    )}
                                    <OrangeButton variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-500 hover:bg-red-950/50">
                                      <X className="h-4 w-4" />
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
              </div>
            ) : (
              <div className="p-6">
                <h3 className="text-lg font-medium text-orange-500 mb-6">Configuration des notifications</h3>
                
                <div className="overflow-x-auto rounded-md border border-orange-800/30 bg-gray-800/30 mb-6">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-orange-800/30 bg-orange-950/30">
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Type de notification</th>
                        <th className="px-4 py-3 text-center font-medium text-orange-500">Email</th>
                        <th className="px-4 py-3 text-center font-medium text-orange-500">SMS</th>
                        <th className="px-4 py-3 text-center font-medium text-orange-500">Application</th>
                        <th className="px-4 py-3 text-left font-medium text-orange-500">Priorité</th>
                      </tr>
                    </thead>
                    <tbody>
                      {notificationPreferences.map((pref) => (
                        <tr key={pref.id} className="border-b border-gray-800 hover:bg-orange-950/20">
                          <td className="px-4 py-3 text-gray-300">{pref.name}</td>
                          <td className="px-4 py-3 text-center">
                            <input type="checkbox" defaultChecked={pref.email} className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500" />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input type="checkbox" defaultChecked={pref.sms} className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500" />
                          </td>
                          <td className="px-4 py-3 text-center">
                            <input type="checkbox" defaultChecked={pref.app} className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500" />
                          </td>
                          <td className="px-4 py-3">
                            <select 
                              className="rounded-md border border-orange-800/30 bg-gray-800/70 text-white py-1 px-3 focus:border-orange-500 text-sm"
                              defaultValue={pref.priority}
                            >
                              <option value="high">Haute</option>
                              <option value="normal">Normale</option>
                              <option value="low">Basse</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="p-4 border-orange-800/30 bg-gray-800/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Mail className="h-5 w-5 text-orange-500" />
                      <h4 className="text-md font-medium text-orange-500">Paramètres Email</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1">Email de réception</label>
                        <Input 
                          type="email" 
                          defaultValue="responsable.stock@orange.fr" 
                          className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="digest" 
                          className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500 mr-2" 
                        />
                        <label htmlFor="digest" className="text-sm text-gray-300">Recevoir un résumé quotidien</label>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border-orange-800/30 bg-gray-800/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="h-5 w-5 text-orange-500" />
                      <h4 className="text-md font-medium text-orange-500">Paramètres SMS</h4>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-300 block mb-1">Numéro de téléphone</label>
                        <Input 
                          type="tel" 
                          defaultValue="+33612345678" 
                          className="bg-gray-800/70 border-orange-800/30 focus:border-orange-500 text-white"
                        />
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="important_only" 
                          className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500 mr-2" 
                        />
                        <label htmlFor="important_only" className="text-sm text-gray-300">Uniquement les alertes importantes</label>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border-orange-800/30 bg-gray-800/50">
                    <div className="flex items-center gap-2 mb-4">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <h4 className="text-md font-medium text-orange-500">Paramètres application</h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="push" 
                          className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500 mr-2" 
                        />
                        <label htmlFor="push" className="text-sm text-gray-300">Activer les notifications push</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="sound" 
                          className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500 mr-2" 
                        />
                        <label htmlFor="sound" className="text-sm text-gray-300">Activer les sons</label>
                      </div>
                      <div className="flex items-center">
                        <input 
                          type="checkbox" 
                          id="desktop" 
                          className="h-4 w-4 text-orange-500 border-orange-500 bg-gray-800 focus:ring-orange-500 mr-2" 
                        />
                        <label htmlFor="desktop" className="text-sm text-gray-300">Notifications sur le bureau</label>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <div className="flex justify-end mt-6 space-x-3">
                  <OrangeButton 
                    variant="outline" 
                    className="border-orange-500 text-orange-500 hover:bg-orange-950/30"
                    onClick={() => setShowConfig(false)}
                  >
                    Annuler
                  </OrangeButton>
                  <OrangeButton 
                    className="bg-orange-500 hover:bg-orange-600 text-white" 
                    onClick={() => setShowConfig(false)}
                  >
                    Enregistrer les préférences
                  </OrangeButton>
                </div>
              </div>
            )}
          </Card>
          
          <Card className="p-6 border-orange-800/30 bg-gray-800/50 backdrop-blur mt-8">
            <div className="flex items-start gap-3">
              <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md mt-0.5">
                <MessageSquare className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-orange-500 mb-2">À propos des notifications</h3>
                <p className="text-gray-300">
                  Le système de notifications vous permet de rester informé des événements importants liés à la gestion de stock.
                  Configurez vos préférences pour recevoir les alertes via email, SMS ou directement dans l'application, selon le niveau de priorité de chaque type d'événement.
                </p>
              </div>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
}
