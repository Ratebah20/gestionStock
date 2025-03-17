"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format, isSameMonth, isSameDay } from "date-fns"
import { fr } from "date-fns/locale"

type Formation = {
  id: number
  title: string
  date: Date
  type: string
  duration: string
  status: "planned" | "confirmed" | "completed" | "cancelled"
}

export default function FormationPlanning() {
  const [date, setDate] = useState<Date>(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [formationList, setFormationList] = useState<Formation[]>([
    {
      id: 1,
      title: "Formation React Avancé",
      date: new Date(2025, 3, 15),
      type: "technique",
      duration: "14",
      status: "planned"
    },
    {
      id: 2,
      title: "Leadership & Management",
      date: new Date(2025, 3, 22),
      type: "management",
      status: "confirmed",
      duration: "7"
    },
    {
      id: 3,
      title: "Communication Efficace",
      date: new Date(2025, 4, 10),
      type: "soft-skills",
      status: "planned",
      duration: "7"
    }
  ])
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    duration: "",
    status: "planned"
  })
  const [formationDate, setFormationDate] = useState<Date>()

  // Formations for the selected month
  const monthFormations = formationList.filter(formation => 
    isSameMonth(formation.date, date)
  )

  // Formations for the selected day
  const dayFormations = selectedDate 
    ? formationList.filter(formation => isSameDay(formation.date, selectedDate))
    : []

  const handleDayClick = (day: Date | undefined) => {
    setSelectedDate(day)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formationDate) return

    const newFormation: Formation = {
      id: Date.now(),
      title: formData.title,
      date: formationDate,
      type: formData.type,
      duration: formData.duration,
      status: formData.status as "planned" | "confirmed" | "completed" | "cancelled"
    }

    setFormationList([...formationList, newFormation])
    setFormOpen(false)
    
    // Reset form
    setFormData({
      title: "",
      type: "",
      duration: "",
      status: "planned"
    })
    setFormationDate(undefined)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "planned":
        return <Badge variant="outline">Planifiée</Badge>
      case "confirmed":
        return <Badge variant="secondary">Confirmée</Badge>
      case "completed":
        return <Badge variant="default">Terminée</Badge>
      case "cancelled":
        return <Badge variant="destructive">Annulée</Badge>
      default:
        return <Badge variant="outline">Planifiée</Badge>
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Planning Annuel des Formations</CardTitle>
              <CardDescription>
                Visualisez et gérez le calendrier des formations
              </CardDescription>
            </div>
            <Dialog open={formOpen} onOpenChange={setFormOpen}>
              <DialogTrigger asChild>
                <Button>Ajouter une formation</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Planifier une nouvelle formation</DialogTitle>
                  <DialogDescription>
                    Renseignez les détails de la formation à planifier
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre de la formation</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      placeholder="Titre de la formation" 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Date de la formation</Label>
                    <Calendar
                      mode="single"
                      selected={formationDate}
                      onSelect={setFormationDate}
                      className="border rounded-md p-3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Type de formation</Label>
                      <Select 
                        onValueChange={(value) => handleSelectChange("type", value)}
                        value={formData.type}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technique">Technique</SelectItem>
                          <SelectItem value="management">Management</SelectItem>
                          <SelectItem value="soft-skills">Soft Skills</SelectItem>
                          <SelectItem value="certification">Certification</SelectItem>
                          <SelectItem value="autre">Autre</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="duration">Durée (heures)</Label>
                      <Input 
                        id="duration" 
                        name="duration" 
                        type="number" 
                        value={formData.duration} 
                        onChange={handleInputChange} 
                        placeholder="Durée" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="status">Statut</Label>
                    <Select 
                      onValueChange={(value) => handleSelectChange("status", value)}
                      value={formData.status}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planned">Planifiée</SelectItem>
                        <SelectItem value="confirmed">Confirmée</SelectItem>
                        <SelectItem value="completed">Terminée</SelectItem>
                        <SelectItem value="cancelled">Annulée</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <DialogFooter>
                    <Button type="submit">Ajouter au planning</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(day: Date | undefined) => day && setDate(day)}
              onDayClick={handleDayClick}
              locale={fr}
              className="rounded-md border"
              modifiers={{
                event: (date) => 
                  formationList.some(formation => 
                    isSameDay(formation.date, date)
                  )
              }}
              modifiersClassNames={{
                event: "bg-primary/20 font-bold text-primary"
              }}
            />
            
            <div>
              <h3 className="font-medium mb-2">Formations du mois ({format(date, 'MMMM yyyy', { locale: fr })})</h3>
              {monthFormations.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Formation</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {monthFormations.map((formation) => (
                      <TableRow key={formation.id}>
                        <TableCell>{format(formation.date, 'dd/MM/yyyy')}</TableCell>
                        <TableCell className="font-medium">{formation.title}</TableCell>
                        <TableCell>{formation.type}</TableCell>
                        <TableCell>{getStatusBadge(formation.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  Aucune formation planifiée ce mois-ci.
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {selectedDate 
              ? `Formations du ${format(selectedDate, 'dd MMMM yyyy', { locale: fr })}`
              : "Sélectionnez une date"
            }
          </CardTitle>
          <CardDescription>
            {selectedDate 
              ? "Détails des formations pour cette journée"
              : "Cliquez sur une date dans le calendrier pour voir les formations"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {selectedDate ? (
            dayFormations.length > 0 ? (
              <div className="space-y-4">
                {dayFormations.map((formation) => (
                  <div key={formation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-medium">{formation.title}</h3>
                      {getStatusBadge(formation.status)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Type: {formation.type}</p>
                      <p>Durée: {formation.duration} heures</p>
                    </div>
                    <div className="flex justify-end gap-2 mt-3">
                      <Button variant="outline" size="sm">Modifier</Button>
                      <Button variant="outline" size="sm">Détails</Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                Aucune formation planifiée pour cette date.
              </div>
            )
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Sélectionnez une date dans le calendrier pour voir les formations planifiées.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
