// app/tasks/page.tsx
"use client"

import { useState } from "react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { 
  Calendar, 
  PlusCircle, 
  CheckCircle, 
  Clock, 
  Users, 
  AlertTriangle, 
  Repeat, 
  X, 
  Edit2,
  Info
} from "lucide-react"

export default function Tasks() {
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
      case 'high': return 'bg-red-900/30 text-red-400';
      case 'medium': return 'bg-yellow-900/30 text-yellow-400';
      case 'low': return 'bg-green-900/30 text-green-400';
      default: return 'bg-gray-800/50 text-gray-300';
    }
  };
  
  // Fonction pour obtenir la classe CSS en fonction de la catégorie
  const getCategoryClass = (categoryId) => {
    const category = taskCategories.find(c => c.id === categoryId);
    switch (category?.color) {
      case 'blue': return 'bg-blue-900/30 text-blue-400';
      case 'green': return 'bg-green-900/30 text-green-400';
      case 'purple': return 'bg-purple-900/30 text-purple-400';
      case 'red': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-800/50 text-gray-300';
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
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Tâches et rappels</h1>
              <p className="text-gray-400">Gestion de stock Orange</p>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <OrangeButton 
                className="bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-2"
                onClick={() => setShowAddForm(true)}
              >
                <PlusCircle className="h-4 w-4" />
                Nouvelle tâche
              </OrangeButton>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card className="p-4 border-red-800/30 bg-gray-800/50">
              <div className="flex justify-center mb-2">
                <AlertTriangle className="h-8 w-8 text-red-500" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {tasks.filter(task => task.priority === 'high' && task.status !== 'completed').length}
                </div>
                <div className="text-sm text-gray-300">Tâches urgentes</div>
              </div>
            </Card>
            
            <Card className="p-4 border-blue-800/30 bg-gray-800/50">
              <div className="flex justify-center mb-2">
                <Clock className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-500">
                  {tasks.filter(task => task.status !== 'completed').length}
                </div>
                <div className="text-sm text-gray-300">Tâches à venir</div>
              </div>
            </Card>
            
            <Card className="p-4 border-purple-800/30 bg-gray-800/50">
              <div className="flex justify-center mb-2">
                <Repeat className="h-8 w-8 text-purple-500" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-500">
                  {tasks.filter(task => task.recurring).length}
                </div>
                <div className="text-sm text-gray-300">Tâches récurrentes</div>
              </div>
            </Card>
            
            <Card className="p-4 border-green-800/30 bg-gray-800/50">
              <div className="flex justify-center mb-2">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-500">
                  {tasks.filter(task => task.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-300">Tâches terminées</div>
              </div>
            </Card>
          </div>
          
          <Card className="border-orange-800/30 bg-gray-800/50 backdrop-blur p-6 mb-6">
            <div className="border-b border-gray-700 mb-6">
              <nav className="flex space-x-8">
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeView === 'list' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                  onClick={() => setActiveView('list')}
                >
                  Liste des tâches
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeView === 'calendar' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                  onClick={() => setActiveView('calendar')}
                >
                  Vue calendrier
                </button>
                <button
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeView === 'team' 
                      ? 'border-orange-500 text-orange-500' 
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                  onClick={() => setActiveView('team')}
                >
                  Assignation par personne
                </button>
              </nav>
            </div>
            
            {activeView === 'list' && (
              <div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-4">
                  <div className="flex space-x-2 w-full md:w-1/3">
                    <Input 
                      type="text" 
                      placeholder="Rechercher une tâche" 
                      className="bg-gray-800/70 border-gray-700 text-white"
                    />
                    <OrangeButton className="bg-orange-500 hover:bg-orange-600 text-white">
                      Rechercher
                    </OrangeButton>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <select className="rounded-md border border-gray-700 bg-gray-800/70 text-white py-2 px-3">
                      <option value="all">Tous les statuts</option>
                      <option value="pending">À faire</option>
                      <option value="completed">Terminé</option>
                    </select>
                    <select className="rounded-md border border-gray-700 bg-gray-800/70 text-white py-2 px-3">
                      <option value="all">Toutes catégories</option>
                      {taskCategories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  {tasks.map((task) => (
                    <Card 
                      key={task.id} 
                      className={`p-4 border-gray-700 ${
                        task.status === 'completed' 
                          ? 'bg-gray-800/30 opacity-70' 
                          : 'bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          {task.status === 'completed' ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <Clock className="h-5 w-5 text-orange-500" />
                          )}
                        </div>
                        <div className="ml-3 flex-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className={`text-lg font-medium ${
                                task.status === 'completed' 
                                  ? 'text-gray-500 line-through' 
                                  : 'text-white'
                              }`}>
                                {task.title}
                              </p>
                              <span className={`px-2 py-1 rounded-full text-xs ${getCategoryClass(task.category)}`}>
                                {taskCategories.find(c => c.id === task.category)?.name}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityClass(task.priority)}`}>
                                {task.priority === 'high' ? 'Urgent' : task.priority === 'medium' ? 'Normal' : 'Faible'}
                              </span>
                            </div>
                            <div className="flex space-x-2">
                              {task.status !== 'completed' && (
                                <OrangeButton 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 w-8 p-0 hover:bg-green-900/30" 
                                  onClick={() => completeTask(task.id)}
                                >
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                </OrangeButton>
                              )}
                              <OrangeButton 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-blue-900/30" 
                                onClick={() => editTask(task.id)}
                              >
                                <Edit2 className="h-4 w-4 text-blue-500" />
                              </OrangeButton>
                              <OrangeButton 
                                variant="ghost" 
                                size="sm" 
                                className="h-8 w-8 p-0 hover:bg-red-900/30" 
                                onClick={() => deleteTask(task.id)}
                              >
                                <X className="h-4 w-4 text-red-500" />
                              </OrangeButton>
                            </div>
                          </div>
                          <p className={`text-sm mt-1 ${
                            task.status === 'completed' 
                              ? 'text-gray-500' 
                              : 'text-gray-400'
                          }`}>
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
                            <div className="mt-2 text-sm italic text-gray-500 border-t border-gray-700 pt-2">
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
                <Calendar className="h-12 w-12 text-orange-500 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-1">Vue calendrier</h3>
                <p className="text-gray-400">L'affichage calendrier sera disponible prochainement</p>
              </div>
            )}
            
            {activeView === 'team' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {team.map((member) => (
                  <Card key={member.id} className="p-4 border-gray-700 bg-gray-800/50">
                    <div className="flex justify-between items-center mb-3">
                      <div>
                        <h3 className="font-medium text-white">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                      <div className="px-2 py-1 rounded-full text-xs bg-orange-950/50 text-orange-400">
                        {tasks.filter(task => task.assignedTo.includes(member.name) && task.status !== 'completed').length} tâches
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {tasks
                        .filter(task => task.assignedTo.includes(member.name) && task.status !== 'completed')
                        .map((task) => (
                          <div key={task.id} className="border-t border-gray-700 pt-2 pb-1">
                            <div className="flex justify-between">
                              <div className="flex items-center">
                                <span className={`w-2 h-2 rounded-full ${getPriorityClass(task.priority).replace('text-', '')}`}></span>
                                <span className="ml-2 text-sm font-medium text-gray-300">{task.title}</span>
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
