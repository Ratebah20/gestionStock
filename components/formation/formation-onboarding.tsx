"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type DocumentType = {
  id: string
  name: string
  required: boolean
  description: string
}

type UploadedDocument = {
  id: string
  documentType: string
  fileName: string
  uploadDate: string
  status: "pending" | "approved" | "rejected"
  comment?: string
}

type Employee = {
  id: string
  name: string
  department: string
  startDate: string
  completionPercentage: number
}

export default function FormationOnboarding() {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [selectedDocType, setSelectedDocType] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null)
  
  // Liste des types de documents requis pour l'onboarding
  const [documentTypes] = useState<DocumentType[]>([
    { 
      id: "rib", 
      name: "RIB", 
      required: true, 
      description: "Relevé d'Identité Bancaire pour le versement du salaire" 
    },
    { 
      id: "id", 
      name: "Pièce d'identité", 
      required: true, 
      description: "Carte d'identité, passeport ou titre de séjour" 
    },
    { 
      id: "diploma", 
      name: "Diplômes", 
      required: true, 
      description: "Copies des diplômes mentionnés dans le CV" 
    },
    { 
      id: "cv", 
      name: "CV", 
      required: true, 
      description: "Curriculum Vitae à jour" 
    },
    { 
      id: "ssn", 
      name: "Carte Vitale", 
      required: true, 
      description: "Attestation de sécurité sociale" 
    },
    { 
      id: "address", 
      name: "Justificatif de domicile", 
      required: true, 
      description: "Document de moins de 3 mois" 
    },
    { 
      id: "photo", 
      name: "Photo d'identité", 
      required: false, 
      description: "Photo récente pour le badge d'accès" 
    }
  ])
  
  // Liste des documents déjà téléchargés
  const [uploadedDocuments, setUploadedDocuments] = useState<UploadedDocument[]>([
    {
      id: "1",
      documentType: "rib",
      fileName: "RIB_BNP.pdf",
      uploadDate: "15/03/2025",
      status: "approved"
    },
    {
      id: "2",
      documentType: "id",
      fileName: "CNI.jpg",
      uploadDate: "15/03/2025",
      status: "pending"
    }
  ])
  
  // Liste des employés en cours d'onboarding
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: "emp1",
      name: "Jean Dupont",
      department: "Informatique",
      startDate: "01/04/2025",
      completionPercentage: 28
    },
    {
      id: "emp2",
      name: "Marie Martin",
      department: "Marketing",
      startDate: "15/04/2025",
      completionPercentage: 14
    },
    {
      id: "emp3",
      name: "Lucas Bernard",
      department: "Ressources Humaines",
      startDate: "01/05/2025",
      completionPercentage: 42
    }
  ])
  
  // Gestion de la sélection de fichier
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0])
    }
  }
  
  // Gestion de l'envoi du formulaire
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDocType || !selectedFile || !selectedEmployee) return
    
    // Création d'un nouveau document téléchargé
    const newDocument: UploadedDocument = {
      id: Date.now().toString(),
      documentType: selectedDocType,
      fileName: selectedFile.name,
      uploadDate: new Date().toLocaleDateString('fr-FR'),
      status: "pending"
    }
    
    setUploadedDocuments([...uploadedDocuments, newDocument])
    
    // Mise à jour du pourcentage de complétion pour l'employé
    const updatedEmployees = employees.map(emp => {
      if (emp.id === selectedEmployee) {
        // Calcul simple du pourcentage basé sur le nombre de documents requis
        const requiredDocs = documentTypes.filter(dt => dt.required).length
        const uploadedRequiredDocs = new Set([
          ...uploadedDocuments.map(ud => ud.documentType),
          selectedDocType
        ]).size
        
        const newPercentage = Math.min(
          Math.round((uploadedRequiredDocs / requiredDocs) * 100),
          100
        )
        
        return {
          ...emp,
          completionPercentage: newPercentage
        }
      }
      return emp
    })
    
    setEmployees(updatedEmployees)
    
    // Réinitialisation du formulaire
    setSelectedDocType("")
    setSelectedFile(null)
    setUploadDialogOpen(false)
  }
  
  // Fonction pour obtenir le statut d'un type de document
  const getDocumentStatus = (employeeId: string, docTypeId: string) => {
    const doc = uploadedDocuments.find(
      ud => ud.documentType === docTypeId
    )
    
    if (!doc) return "Non fourni"
    
    switch (doc.status) {
      case "approved": return "Approuvé"
      case "rejected": return "Rejeté"
      default: return "En attente"
    }
  }
  
  // Fonction pour obtenir la couleur du badge selon le statut
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Approuvé": return "bg-green-100 text-green-800"
      case "Rejeté": return "bg-red-100 text-red-800"
      case "En attente": return "bg-yellow-100 text-yellow-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold tracking-tight">Onboarding des Nouveaux Employés</h2>
        <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
          <DialogTrigger asChild>
            <Button>Déposer un document</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Déposer un document</DialogTitle>
              <DialogDescription>
                Sélectionnez le type de document et le fichier à déposer pour l'employé.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="employee" className="text-right">
                    Employé
                  </Label>
                  <Select 
                    value={selectedEmployee || ""} 
                    onValueChange={(value) => setSelectedEmployee(value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un employé" />
                    </SelectTrigger>
                    <SelectContent>
                      {employees.map(emp => (
                        <SelectItem key={emp.id} value={emp.id}>
                          {emp.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="docType" className="text-right">
                    Type
                  </Label>
                  <Select 
                    value={selectedDocType} 
                    onValueChange={(value) => setSelectedDocType(value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Sélectionner un type" />
                    </SelectTrigger>
                    <SelectContent>
                      {documentTypes.map(docType => (
                        <SelectItem key={docType.id} value={docType.id}>
                          {docType.name} {docType.required && "*"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Fichier
                  </Label>
                  <Input
                    id="file"
                    type="file"
                    className="col-span-3"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" disabled={!selectedDocType || !selectedFile || !selectedEmployee}>
                  Déposer
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      
      <Alert>
        <AlertTitle>Information importante</AlertTitle>
        <AlertDescription>
          Tous les documents marqués d'un astérisque (*) sont obligatoires pour finaliser l'onboarding.
          Les documents sont vérifiés par le service RH dans un délai de 48h ouvrées.
        </AlertDescription>
      </Alert>
      
      <Tabs defaultValue="employees">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="employees">Employés</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="employees" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Nouveaux Employés</CardTitle>
              <CardDescription>
                Liste des employés en cours d'onboarding et leur progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nom</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Date d'entrée</TableHead>
                    <TableHead>Progression</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employees.map(employee => (
                    <TableRow key={employee.id}>
                      <TableCell className="font-medium">{employee.name}</TableCell>
                      <TableCell>{employee.department}</TableCell>
                      <TableCell>{employee.startDate}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={employee.completionPercentage} className="h-2 w-full" />
                          <span className="text-sm">{employee.completionPercentage}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            setSelectedEmployee(employee.id)
                            setUploadDialogOpen(true)
                          }}
                        >
                          Ajouter un document
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Documents Requis</CardTitle>
              <CardDescription>
                Liste des documents nécessaires pour l'onboarding
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Document</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Obligatoire</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documentTypes.map(docType => (
                    <TableRow key={docType.id}>
                      <TableCell className="font-medium">{docType.name}</TableCell>
                      <TableCell>{docType.description}</TableCell>
                      <TableCell>{docType.required ? "Oui" : "Non"}</TableCell>
                      <TableCell>
                        {selectedEmployee && (
                          <Badge className={getStatusBadgeColor(getDocumentStatus(selectedEmployee, docType.id))}>
                            {getDocumentStatus(selectedEmployee, docType.id)}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Documents Déposés</CardTitle>
              <CardDescription>
                Historique des documents déposés
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Nom du fichier</TableHead>
                    <TableHead>Date de dépôt</TableHead>
                    <TableHead>Statut</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {uploadedDocuments.map(doc => (
                    <TableRow key={doc.id}>
                      <TableCell className="font-medium">
                        {documentTypes.find(dt => dt.id === doc.documentType)?.name || doc.documentType}
                      </TableCell>
                      <TableCell>{doc.fileName}</TableCell>
                      <TableCell>{doc.uploadDate}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(
                          doc.status === "approved" ? "Approuvé" : 
                          doc.status === "rejected" ? "Rejeté" : "En attente"
                        )}>
                          {doc.status === "approved" ? "Approuvé" : 
                           doc.status === "rejected" ? "Rejeté" : "En attente"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
