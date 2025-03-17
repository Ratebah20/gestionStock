"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { format, addDays, isBefore } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon, Bell, Mail, Send, CheckCircle2, AlertCircle, Clock } from "lucide-react"

type Notification = {
  id: number
  type: "convocation" | "reminder" | "feedback"
  formation: string
  recipient: string
  date: Date
  status: "scheduled" | "sent" | "failed"
  subject: string
}

type Template = {
  id: number
  name: string
  type: "convocation" | "reminder" | "feedback"
  subject: string
  content: string
}

export default function FormationNotifications() {
  const today = new Date()
  
  const [activeTab, setActiveTab] = useState("notifications")
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      type: "convocation",
      formation: "Formation React Avancé",
      recipient: "equipe-dev@entreprise.com",
      date: addDays(today, 7),
      status: "scheduled",
      subject: "Convocation: Formation React Avancé"
    },
    {
      id: 2,
      type: "reminder",
      formation: "Formation React Avancé",
      recipient: "equipe-dev@entreprise.com",
      date: addDays(today, 1),
      status: "scheduled",
      subject: "Rappel: Formation React Avancé demain"
    },
    {
      id: 3,
      type: "convocation",
      formation: "Leadership & Management",
      recipient: "managers@entreprise.com",
      date: addDays(today, -3),
      status: "sent",
      subject: "Convocation: Formation Leadership & Management"
    },
    {
      id: 4,
      type: "feedback",
      formation: "Communication Efficace",
      recipient: "participants-comm@entreprise.com",
      date: addDays(today, -10),
      status: "sent",
      subject: "Feedback: Formation Communication Efficace"
    }
  ])
  
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      name: "Convocation Standard",
      type: "convocation",
      subject: "Convocation: [FORMATION_TITLE]",
      content: "Bonjour [RECIPIENT_NAME],\n\nVous êtes convoqué(e) à la formation [FORMATION_TITLE] qui se déroulera le [FORMATION_DATE] de [START_TIME] à [END_TIME] à [LOCATION].\n\nMerci de confirmer votre présence.\n\nCordialement,\nService Formation"
    },
    {
      id: 2,
      name: "Rappel J-1",
      type: "reminder",
      subject: "Rappel: Formation [FORMATION_TITLE] demain",
      content: "Bonjour [RECIPIENT_NAME],\n\nNous vous rappelons que la formation [FORMATION_TITLE] aura lieu demain, [FORMATION_DATE] de [START_TIME] à [END_TIME] à [LOCATION].\n\nNous vous attendons.\n\nCordialement,\nService Formation"
    },
    {
      id: 3,
      name: "Demande de Feedback",
      type: "feedback",
      subject: "Feedback: Formation [FORMATION_TITLE]",
      content: "Bonjour [RECIPIENT_NAME],\n\nVous avez récemment participé à la formation [FORMATION_TITLE].\n\nAfin d'améliorer nos formations, nous vous invitons à compléter le questionnaire de satisfaction en cliquant sur le lien suivant: [FEEDBACK_LINK].\n\nMerci pour votre participation.\n\nCordialement,\nService Formation"
    }
  ])
  
  const [formOpen, setFormOpen] = useState(false)
  const [templateFormOpen, setTemplateFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    type: "convocation",
    formation: "",
    recipient: "",
    subject: "",
    template: "1"
  })
  
  const [templateFormData, setTemplateFormData] = useState({
    name: "",
    type: "convocation",
    subject: "",
    content: ""
  })
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }
  
  const handleTemplateInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTemplateFormData({
      ...templateFormData,
      [name]: value
    })
  }
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Auto-fill subject based on template
    if (name === "template") {
      const selectedTemplate = templates.find(t => t.id.toString() === value)
      if (selectedTemplate) {
        setFormData(prev => ({
          ...prev,
          subject: selectedTemplate.subject.replace("[FORMATION_TITLE]", prev.formation)
        }))
      }
    }
  }
  
  const handleTemplateSelectChange = (name: string, value: string) => {
    setTemplateFormData({
      ...templateFormData,
      [name]: value
    })
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newNotification: Notification = {
      id: Date.now(),
      type: formData.type as "convocation" | "reminder" | "feedback",
      formation: formData.formation,
      recipient: formData.recipient,
      date: new Date(),
      status: "scheduled",
      subject: formData.subject
    }
    
    setNotifications([...notifications, newNotification])
    setFormOpen(false)
    
    // Reset form
    setFormData({
      type: "convocation",
      formation: "",
      recipient: "",
      subject: "",
      template: "1"
    })
  }
  
  const handleTemplateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const newTemplate: Template = {
      id: Date.now(),
      name: templateFormData.name,
      type: templateFormData.type as "convocation" | "reminder" | "feedback",
      subject: templateFormData.subject,
      content: templateFormData.content
    }
    
    setTemplates([...templates, newTemplate])
    setTemplateFormOpen(false)
    
    // Reset form
    setTemplateFormData({
      name: "",
      type: "convocation",
      subject: "",
      content: ""
    })
  }
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "convocation":
        return <Mail className="h-4 w-4" />
      case "reminder":
        return <Bell className="h-4 w-4" />
      case "feedback":
        return <Send className="h-4 w-4" />
      default:
        return <Mail className="h-4 w-4" />
    }
  }
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-500" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }
  
  const getNotificationTypeBadge = (type: string) => {
    switch (type) {
      case "convocation":
        return <Badge variant="default">Convocation</Badge>
      case "reminder":
        return <Badge variant="secondary">Rappel</Badge>
      case "feedback":
        return <Badge variant="outline">Feedback</Badge>
      default:
        return <Badge variant="outline">Autre</Badge>
    }
  }
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge variant="default" className="bg-green-500">Envoyé</Badge>
      case "failed":
        return <Badge variant="destructive">Échec</Badge>
      case "scheduled":
        return <Badge variant="outline">Planifié</Badge>
      default:
        return <Badge variant="outline">Inconnu</Badge>
    }
  }
  
  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-8">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Modèles</TabsTrigger>
        </TabsList>
        
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Gestion des Notifications</CardTitle>
                  <CardDescription>
                    Convocations, rappels et demandes de feedback pour les formations
                  </CardDescription>
                </div>
                <Dialog open={formOpen} onOpenChange={setFormOpen}>
                  <DialogTrigger asChild>
                    <Button>Nouvelle notification</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Créer une notification</DialogTitle>
                      <DialogDescription>
                        Configurez une nouvelle notification pour les participants
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="type">Type de notification</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("type", value)}
                          value={formData.type}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="convocation">Convocation</SelectItem>
                            <SelectItem value="reminder">Rappel</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="formation">Formation</Label>
                        <Input 
                          id="formation" 
                          name="formation" 
                          value={formData.formation} 
                          onChange={handleInputChange} 
                          placeholder="Nom de la formation" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="recipient">Destinataire(s)</Label>
                        <Input 
                          id="recipient" 
                          name="recipient" 
                          value={formData.recipient} 
                          onChange={handleInputChange} 
                          placeholder="Email ou groupe" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="template">Modèle</Label>
                        <Select 
                          onValueChange={(value) => handleSelectChange("template", value)}
                          value={formData.template}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un modèle" />
                          </SelectTrigger>
                          <SelectContent>
                            {templates.map(template => (
                              <SelectItem key={template.id} value={template.id.toString()}>
                                {template.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={formData.subject} 
                          onChange={handleInputChange} 
                          placeholder="Sujet de la notification" 
                          required 
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Créer</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Formation</TableHead>
                    <TableHead>Destinataire</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getNotificationIcon(notification.type)}
                          {getNotificationTypeBadge(notification.type)}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{notification.formation}</TableCell>
                      <TableCell>{notification.recipient}</TableCell>
                      <TableCell>{format(notification.date, 'dd/MM/yyyy')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(notification.status)}
                          {getStatusBadge(notification.status)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {notification.status === "scheduled" && (
                            <Button variant="outline" size="sm">Envoyer</Button>
                          )}
                          <Button variant="outline" size="sm">Voir</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Modèles de Notification</CardTitle>
                  <CardDescription>
                    Gérez les modèles pour les convocations, rappels et demandes de feedback
                  </CardDescription>
                </div>
                <Dialog open={templateFormOpen} onOpenChange={setTemplateFormOpen}>
                  <DialogTrigger asChild>
                    <Button>Nouveau modèle</Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Créer un modèle</DialogTitle>
                      <DialogDescription>
                        Créez un nouveau modèle de notification
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleTemplateSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Nom du modèle</Label>
                          <Input 
                            id="name" 
                            name="name" 
                            value={templateFormData.name} 
                            onChange={handleTemplateInputChange} 
                            placeholder="Nom du modèle" 
                            required 
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="type">Type de notification</Label>
                          <Select 
                            onValueChange={(value) => handleTemplateSelectChange("type", value)}
                            value={templateFormData.type}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="convocation">Convocation</SelectItem>
                              <SelectItem value="reminder">Rappel</SelectItem>
                              <SelectItem value="feedback">Feedback</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet</Label>
                        <Input 
                          id="subject" 
                          name="subject" 
                          value={templateFormData.subject} 
                          onChange={handleTemplateInputChange} 
                          placeholder="Sujet de la notification" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="content">Contenu</Label>
                        <Textarea 
                          id="content" 
                          name="content" 
                          value={templateFormData.content} 
                          onChange={handleTemplateInputChange} 
                          placeholder="Contenu du modèle" 
                          rows={8} 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Variables disponibles</Label>
                        <div className="text-sm text-muted-foreground grid grid-cols-2 gap-2">
                          <div>[RECIPIENT_NAME] - Nom du destinataire</div>
                          <div>[FORMATION_TITLE] - Titre de la formation</div>
                          <div>[FORMATION_DATE] - Date de la formation</div>
                          <div>[START_TIME] - Heure de début</div>
                          <div>[END_TIME] - Heure de fin</div>
                          <div>[LOCATION] - Lieu de la formation</div>
                          <div>[FEEDBACK_LINK] - Lien vers le questionnaire</div>
                        </div>
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Créer</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="border">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{template.name}</CardTitle>
                        {getNotificationTypeBadge(template.type)}
                      </div>
                      <CardDescription>{template.subject}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="text-sm whitespace-pre-line h-[100px] overflow-y-auto border rounded-md p-2 bg-muted/50">
                        {template.content}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Dupliquer</Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
