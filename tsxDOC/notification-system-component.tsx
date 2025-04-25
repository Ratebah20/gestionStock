import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Bell, Settings, Smartphone, Mail, Calendar, AlertTriangle, CheckCircle, Info, X, Check, Edit2, MessageSquare } from 'lucide-react';

const NotificationSystem = () => {
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
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Bell className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Système de notifications</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center"
              onClick={() => setShowConfig(!showConfig)}
            >
              <Settings className="mr-2 h-4 w-4" />
              Configurer
            </Button>
          </div>
        </div>
        
        {!showConfig ? (
          <div>
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'center' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('center')}
                >
                  Centre de notifications
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'reminders' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveTab('reminders')}
                >
                  Rappels et tâches
                </button>
              </nav>
            </div>
            
            {activeTab === 'center' && (
              <div>
                <div className="flex justify-between mb-4">
                  <div>
                    <Button variant="ghost" size="sm" className="text-blue-600">
                      Tout marquer comme lu
                    </Button>
                  </div>
                  <div className="flex space-x-2">
                    <select className="rounded-md border border-gray-300 py-1 px-2 text-sm">
                      <option value="all">Toutes</option>
                      <option value="unread">Non lues</option>
                      <option value="high">Haute priorité</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <Card key={notification.id} className={`p-4 ${!notification.read ? 'bg-blue-50 dark:bg-blue-900/10' : ''}`}>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${!notification.read ? 'text-blue-800 dark:text-blue-200' : 'text-gray-800 dark:text-gray-200'}`}>
                              {notification.title}
                            </p>
                            <div className="flex space-x-2">
                              {!notification.read && (
                                <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => markAsRead(notification.id)}>
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => deleteNotification(notification.id)}>
                                <X className="h-4 w-4 text-red-500" />
                              </Button>
                            </div>
                          </div>
                          <p className={`text-sm ${!notification.read ? 'text-blue-700 dark:text-blue-300' : 'text-gray-600 dark:text-gray-400'}`}>
                            {notification.message}
                          </p>
                          <div className="mt-1 flex items-center">
                            <p className="text-xs text-gray-500">
                              {notification.date}
                            </p>
                            {notification.priority === 'high' && (
                              <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-800">
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
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Aucune notification</h3>
                    <p className="text-gray-500">Vous n'avez pas de nouvelles notifications pour le moment</p>
                  </div>
                )}
                
                <div className="mt-4 flex justify-center">
                  <Button variant="outline">Voir toutes les notifications</Button>
                </div>
              </div>
            )}
            
            {activeTab === 'reminders' && (
              <div>
                <div className="flex justify-between mb-4">
                  <Button className="bg-orange-500 hover:bg-orange-600">
                    <Calendar className="mr-2 h-4 w-4" />
                    Nouveau rappel
                  </Button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left">Tâche</th>
                        <th className="px-4 py-3 text-left">Date</th>
                        <th className="px-4 py-3 text-left">Récurrence</th>
                        <th className="px-4 py-3 text-left">Assigné à</th>
                        <th className="px-4 py-3 text-left">Statut</th>
                        <th className="px-4 py-3 text-left">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scheduledReminders.map((reminder) => (
                        <tr key={reminder.id} className="border-b">
                          <td className="px-4 py-3 font-medium">{reminder.title}</td>
                          <td className="px-4 py-3">{reminder.date}</td>
                          <td className="px-4 py-3">
                            {reminder.recurring ? (
                              <span className="px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800">
                                {reminder.period}
                              </span>
                            ) : 'Unique'}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1">
                              {reminder.assignedTo.map((person, index) => (
                                <span key={index} className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                                  {person}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              reminder.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {reminder.status === 'completed' ? 'Terminé' : 'À faire'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Edit2 className="h-4 w-4 text-blue-500" />
                              </Button>
                              {reminder.status !== 'completed' && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Check className="h-4 w-4 text-green-500" />
                                </Button>
                              )}
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <X className="h-4 w-4 text-red-500" />
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
          </div>
        ) : (
          <div>
            <h3 className="text-lg font-medium mb-4">Configuration des notifications</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="px-4 py-3 text-left">Type de notification</th>
                    <th className="px-4 py-3 text-center">Email</th>
                    <th className="px-4 py-3 text-center">SMS</th>
                    <th className="px-4 py-3 text-center">Application</th>
                    <th className="px-4 py-3 text-left">Priorité</th>
                  </tr>
                </thead>
                <tbody>
                  {notificationPreferences.map((pref) => (
                    <tr key={pref.id} className="border-b">
                      <td className="px-4 py-3">{pref.name}</td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={pref.email} className="h-4 w-4 text-orange-500" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={pref.sms} className="h-4 w-4 text-orange-500" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={pref.app} className="h-4 w-4 text-orange-500" />
                      </td>
                      <td className="px-4 py-3">
                        <select 
                          className="rounded-md border border-gray-300 py-1 px-2 text-sm"
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
              <div>
                <h4 className="text-md font-medium mb-2">Paramètres Email</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Email de réception</label>
                    <Input type="email" defaultValue="responsable.stock@orange.fr" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="digest" className="h-4 w-4 text-orange-500 mr-2" />
                    <label htmlFor="digest" className="text-sm">Recevoir un résumé quotidien</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Paramètres SMS</h4>
                <div className="space-y-2">
                  <div>
                    <label className="text-sm font-medium">Numéro de téléphone</label>
                    <Input type="tel" defaultValue="+33612345678" />
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="important_only" className="h-4 w-4 text-orange-500 mr-2" />
                    <label htmlFor="important_only" className="text-sm">Uniquement les alertes importantes</label>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-medium mb-2">Paramètres application</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input type="checkbox" id="push" className="h-4 w-4 text-orange-500 mr-2" />
                    <label htmlFor="push" className="text-sm">Activer les notifications push</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="sound" className="h-4 w-4 text-orange-500 mr-2" />
                    <label htmlFor="sound" className="text-sm">Activer les sons</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="desktop" className="h-4 w-4 text-orange-500 mr-2" />
                    <label htmlFor="desktop" className="text-sm">Notifications sur le bureau</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <Button variant="outline" onClick={() => setShowConfig(false)}>
                Annuler
              </Button>
              <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowConfig(false)}>
                Enregistrer les préférences
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">À propos des notifications</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Le système de notifications vous permet de rester informé des événements importants liés à la gestion de stock.
            Configurez vos préférences pour recevoir les alertes via email, SMS ou directement dans l'application, selon le niveau de priorité de chaque type d'événement.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationSystem;