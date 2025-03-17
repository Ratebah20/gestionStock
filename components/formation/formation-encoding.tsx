"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { fr } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function FormationEncoding() {
  const [date, setDate] = useState<Date>()
  const [formationList, setFormationList] = useState<any[]>([])
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    provider: "",
    duration: "",
    participants: "",
    cost: "",
    description: ""
  })

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
    const newFormation = {
      ...formData,
      date: date ? format(date, 'dd/MM/yyyy') : '',
      id: Date.now()
    }
    setFormationList([...formationList, newFormation])
    
    // Reset form
    setFormData({
      title: "",
      type: "",
      provider: "",
      duration: "",
      participants: "",
      cost: "",
      description: ""
    })
    setDate(undefined)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Encodage d'une Formation</CardTitle>
          <CardDescription>
            Renseignez les détails de la formation pour l'enregistrer dans le système.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
                <Label>Date de la formation</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, 'dd MMMM yyyy', { locale: fr }) : <span>Sélectionner une date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Prestataire</Label>
              <Input 
                id="provider" 
                name="provider" 
                value={formData.provider} 
                onChange={handleInputChange} 
                placeholder="Nom du prestataire" 
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4">
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
              
              <div className="space-y-2">
                <Label htmlFor="participants">Participants</Label>
                <Input 
                  id="participants" 
                  name="participants" 
                  type="number" 
                  value={formData.participants} 
                  onChange={handleInputChange} 
                  placeholder="Nombre" 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cost">Coût (€)</Label>
                <Input 
                  id="cost" 
                  name="cost" 
                  type="number" 
                  value={formData.cost} 
                  onChange={handleInputChange} 
                  placeholder="Montant" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                placeholder="Détails de la formation" 
                rows={3} 
              />
            </div>
            
            <Button type="submit" className="w-full">Enregistrer la formation</Button>
          </form>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Formations Encodées</CardTitle>
          <CardDescription>
            Liste des formations récemment encodées dans le système.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {formationList.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Titre</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Coût</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {formationList.map((formation) => (
                  <TableRow key={formation.id}>
                    <TableCell className="font-medium">{formation.title}</TableCell>
                    <TableCell>{formation.type}</TableCell>
                    <TableCell>{formation.date}</TableCell>
                    <TableCell>{formation.cost} €</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Aucune formation encodée pour le moment.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
