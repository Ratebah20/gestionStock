import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Calendar, PlusCircle, CheckCircle, Clock, Users, AlertTriangle, Repeat, X, Edit2 } from 'lucide-react';

const TaskReminderSystem = () => {
  const [activeView, setActiveView] = useState('list');
  const [showAddForm, setShowAddForm] = useState(false);
  
  // Données fictives pour les tâches et rappels
  const tasks = [
    { 
      id: 1, 
      title: 'Inventaire mensuel', 
      description: 'Réaliser l\'inventaire complet du stock central',
      dueDate: '30/04/2025 09:00', 
      priority: 'high',
      status: 'pending',
      recurring: true,
      recurrencePattern: 'monthly',
      assignedTo: ['Martin T.', 'Sophie D.'],
      category: 'inventory',
      notes: 'Prévoir 3 heures pour réaliser cette tâche. Vérifier particulièrement les ONT et Livebox.'
    },
    { 
      id: 2, 
      title: 'Commander stocks ONT', 
      description: 'Préparer bon de commande pour réapprovisionner les ONT',
      dueDate: '26/04/2025 14:00', 
      priority: 'medium',
      status: 'pending',
      recurring: false,
      recurrencePattern: null,
      assignedTo: ['Thomas P.'],
      category: 'order',
      notes: 'Commander au moins 50 unités. Vérifier les prix avec le fournisseur avant validation.'
    },
    { 
      id: 3, 
      title: 'Vérifier expéditions en attente', 
      description: 'Examiner les commandes en attente d\'expédition',
      dueDate: '24/04/2025 16:30', 
      priority: 'low',
      status: 'completed',
      completedDate: '24/04/2025 15:45',
      recurring: true,
      recurrencePattern: 'daily',
      assignedTo: ['Sophie D.'],
      category: 'shipping',
      notes: 'Priorité aux clients professionnels. Vérifier que tous les BL sont générés.'
    },
    { 
      id: 4, 
      title: 'Mise à jour tarifs fournisseurs', 
      description: 'Actualiser les prix dans le système',
      dueDate: '28/04/2025 11:00', 
      priority: 'medium',
      status: 'pending',
      recurring: false,
      recurrencePattern: null,
      assignedTo: ['Martin T.', 'Thomas P.'],
      category: 'admin',
      notes: 'Les nouveaux tarifs seront applicables à partir du 01/05/2025.'
    },
    { 
      id: 5, 
      title: 'Vérification des produits périmés', 
      description: 'Identifier et retirer les produits dont la date est dépassée',
      dueDate: '25/04/2025 10:00', 
      priority: 'high',
      status: 'pending',
      recurring: true,
      recurrencePattern: 'weekly',
      assignedTo: ['Sophie D.'],
      category: 'quality',
      notes: 'Établir un rapport des produits retirés pour le service qualité.'
    },
  ];
  
  // Équipe (pour l'assignation des tâches)
  const team = [
    { id: 1, name: 'Martin T.', role: 'Responsable stock' },
    { id: 2, name: 'Sophie D.', role: 'Assistante logistique' },
    { id: 3, name: 'Thomas P.', role: 'Acheteur' },
    { id: 4, name: 'Julie M.', role: 'Responsable expédition' },
  ];
  
  // Catégories de tâches
  const taskCategories = [
    { id: 'inventory', name: 'Inventaire', color: 'blue' },
    { id: 'order', name: 'Commandes', color: 'green' },
    { id: 'shipping', name: 'Expédition', color: 'purple' },
    { id: 'admin', name: 'Administration', color: 'gray' },
    { id: 'quality', name: 'Qualité', color: 'red' },
  ];
  
  // Tâches à venir (prochains jours)
  const upcomingTasks = tasks
    .filter(task => task.status !== 'completed')
    .sort((a, b) => {
      const dateA = new Date(a.dueDate.split(' ')[0].split('/').reverse().join('-'));
      const dateB = new Date(b.dueDate.split(' ')[0].split('/').reverse().join('-'));
      return dateA - dateB;
    })
    .slice(0, 3);
  
  // Fonction pour obtenir la classe CSS en fonction de la priorité
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Fonction pour obtenir la classe CSS en fonction de la catégorie
  const getCategoryClass = (categoryId) => {
    const category = taskCategories.find(c => c.id === categoryId);
    switch (category?.color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';
      case 'red': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Fonction pour marquer une tâche comme terminée
  const completeTask = (id) => {
    // Dans une application réelle, cela mettrait à jour l'état
    console.log(`Task ${id} marked as completed`);
  };
  
  // Fonction pour éditer une tâche
  const editTask = (id) => {
    // Dans une application réelle, cela ouvrirait un formulaire d'édition
    console.log(`Edit task ${id}`);
  };
  
  // Fonction pour supprimer une tâche
  const deleteTask = (id) => {
    // Dans une application réelle, cela supprimerait la tâche
    console.log(`Delete task ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center">
            <Calendar className="h-6 w-6 text-orange-500 mr-2" />
            <h2 className="text-xl font-semibold">Tâches et rappels</h2>
          </div>
          <div className="flex space-x-2">
            <Button 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowAddForm(true)}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Nouvelle tâche
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="p-4 bg-blue-50 dark:bg-blue-900/20">
            <div className="flex justify-center mb-2">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-500">2</div>
              <div className="text-sm text-red-700">Tâches urgentes</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-green-50 dark:bg-green-900/20">
            <div className="flex justify-center mb-2">
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">5</div>
              <div className="text-sm text-blue-700">Tâches à venir</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-purple-50 dark:bg-purple-900/20">
            <div className="flex justify-center mb-2">
              <Repeat className="h-8 w-8 text-purple-500" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-500">3</div>
              <div className="text-sm text-purple-700">Tâches récurrentes</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gray-50 dark:bg-gray-700">
            <div className="flex justify-center mb-2">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-500">1</div>
              <div className="text-sm text-green-700">Tâches terminées aujourd'hui</div>
            </div>
          </Card>
        </div>
        
        <div className="border-b border-gray-200 mb-6">
          <nav className="flex space-x-8">
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'list' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveView('list')}
            >
              Liste des tâches
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'calendar' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveView('calendar')}
            >
              Vue calendrier
            </button>
            <button
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeView === 'team' 
                  ? 'border-orange-500 text-orange-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveView('team')}
            >
              Assignation par personne
            </button>
          </nav>
        </div>
        
        {activeView === 'list' && (
          <div>
            <div className="flex justify-between mb-4">
              <div className="flex space-x-2 w-1/3">
                <Input type="text" placeholder="Rechercher une tâche" />
                <Button className="bg-blue-600 hover:bg-blue-700">Rechercher</Button>
              </div>
              <div className="space-x-2">
                <select className="rounded-md border border-gray-300 py-2 px-3">
                  <option value="all">Tous les statuts</option>
                  <option value="pending">À faire</option>
                  <option value="completed">Terminé</option>
                </select>
                <select className="rounded-md border border-gray-300 py-2 px-3">
                  <option value="all">Toutes catégories</option>
                  {taskCategories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id} className={`p-4 ${task.status === 'completed' ? 'bg-gray-50 dark:bg-gray-700' : ''}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      {task.status === 'completed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-blue-500" />
                      )}
                    </div>
                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <p className={`text-lg font-medium ${task.status === 'completed' ? 'text-gray-500 line-through' : 'text-gray-800 dark:text-gray-200'}`}>
                            {task.title}
                          </p>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getCategoryClass(task.category)}`}>
                            {taskCategories.find(c => c.id === task.category)?.name}
                          </span>
                          <span className={`ml-2 px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                            {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Normal' : 'Faible'}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          {task.status !== 'completed' && (
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => completeTask(task.id)}>
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            </Button>
                          )}
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => editTask(task.id)}>
                            <Edit2 className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => deleteTask(task.id)}>
                            <X className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </div>
                      <p className={`text-sm mt-1 ${task.status === 'completed' ? 'text-gray-500' : 'text-gray-600 dark:text-gray-400'}`}>
                        {task.description}
                      </p>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {task.status === 'completed' ? 
                            `Terminé le ${task.completedDate}` : 
                            `Échéance: ${task.dueDate}`}
                        </div>
                        
                        {task.recurring && (
                          <div className="flex items-center">
                            <Repeat className="h-4 w-4 mr-1" />
                            {task.recurrencePattern === 'daily' ? 'Quotidien' : 
                              task.recurrencePattern === 'weekly' ? 'Hebdomadaire' : 
                              task.recurrencePattern === 'monthly' ? 'Mensuel' : 'Récurrent'}
                          </div>
                        )}
                        
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {task.assignedTo.join(', ')}
                        </div>
                      </div>
                      
                      {task.notes && (
                        <div className="mt-2 text-sm italic text-gray-500 border-t pt-2">
                          {task.notes}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {activeView === 'calendar' && (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">Vue calendrier</h3>
            <p className="text-gray-500">L'affichage calendrier sera disponible prochainement</p>
          </div>
        )}
        
        {activeView === 'team' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {team.map((member) => (
              <Card key={member.id} className="p-4">
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-gray-500">{member.role}</p>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                    {tasks.filter(task => task.assignedTo.includes(member.name) && task.status !== 'completed').length} tâches
                  </div>
                </div>
                
                <div className="space-y-2">
                  {tasks
                    .filter(task => task.assignedTo.includes(member.name) && task.status !== 'completed')
                    .map((task) => (
                      <div key={task.id} className="border-t pt-2 pb-1">
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <span className={`w-2 h-2 rounded-full ${getPriorityClass(task.priority).replace('bg-', 'bg-').replace('text-', '')}`}></span>
                            <span className="ml-2 text-sm font-medium">{task.title}</span>
                          </div>
                          <span className="text-xs text-gray-500">{task.dueDate.split(' ')[0]}</span>
                        </div>
                      </div>
                    ))}
                </div>
                
                {tasks.filter(task => task.assignedTo.includes(member.name) && task.status !== 'completed').length === 0 && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    Aucune tâche en cours
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
        
        {/* Formulaire d'ajout de tâche (affiché conditionnellement) */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">Nouvelle tâche</h3>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => setShowAddForm(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Titre</label>
                  <Input type="text" placeholder="Titre de la tâche" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                    rows={3}
                    placeholder="Description détaillée de la tâche"
                  ></textarea>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Date d'échéance</label>
                  <Input type="date" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Heure</label>
                  <Input type="time" />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                    {taskCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priorité</label>
                  <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                    <option value="high">Haute</option>
                    <option value="medium">Moyenne</option>
                    <option value="low">Basse</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Récurrence</label>
                  <select className="w-full rounded-md border border-gray-300 py-2 px-3">
                    <option value="none">Aucune</option>
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                    <option value="custom">Personnalisée</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Assigner à</label>
                  <select className="w-full rounded-md border border-gray-300 py-2 px-3" multiple>
                    {team.map(member => (
                      <option key={member.id} value={member.name}>{member.name} ({member.role})</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500">Maintenez Ctrl pour sélectionner plusieurs personnes</p>
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium">Notes</label>
                  <textarea 
                    className="w-full rounded-md border border-gray-300 py-2 px-3"
                    rows={2}
                    placeholder="Notes additionnelles (optionnel)"
                  ></textarea>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Annuler
                </Button>
                <Button className="bg-orange-500 hover:bg-orange-600" onClick={() => setShowAddForm(false)}>
                  Créer la tâche
                </Button>
              </div>
            </Card>
          </div>
        )}
        
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300 mb-2">Gérer efficacement vos tâches</h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Le système de tâches et rappels vous permet d'organiser votre travail et celui de votre équipe, avec des notifications automatiques 
            aux échéances. Utilisez la récurrence pour les tâches régulières et assignez-les aux membres concernés pour un suivi optimal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TaskReminderSystem;