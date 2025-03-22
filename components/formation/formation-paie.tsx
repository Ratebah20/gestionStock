import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, Download, Send, CheckCircle, XCircle } from "lucide-react"

interface Employe {
  id: string
  nom: string
  prenom: string
  departement: string
  salaire: number
  primes: number
  absences: number
  conges: number
  statut: "valide" | "en_attente" | "erreur"
  fichePaie: {
    date: string
    montant: number
    statut: "envoyee" | "en_attente"
  }
}

const employesSimules: Employe[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Marie",
    departement: "Développement",
    salaire: 3500,
    primes: 500,
    absences: 0,
    conges: 5,
    statut: "valide",
    fichePaie: {
      date: "2024-03-19",
      montant: 4000,
      statut: "envoyee"
    }
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Pierre",
    departement: "Marketing",
    salaire: 3200,
    primes: 300,
    absences: 1,
    conges: 3,
    statut: "en_attente",
    fichePaie: {
      date: "2024-03-19",
      montant: 3500,
      statut: "en_attente"
    }
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Sophie",
    departement: "Design",
    salaire: 3800,
    primes: 400,
    absences: 2,
    conges: 0,
    statut: "erreur",
    fichePaie: {
      date: "2024-03-19",
      montant: 4200,
      statut: "en_attente"
    }
  }
]

const statutColors = {
  valide: "bg-green-500",
  en_attente: "bg-yellow-500",
  erreur: "bg-red-500"
}

export default function FormationPaie() {
  const [employes, setEmployes] = useState<Employe[]>(employesSimules)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDepartement, setSelectedDepartement] = useState<string>("tous")

  const employesFiltres = employes.filter(employe => 
    (employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (selectedDepartement === "tous" || employe.departement === selectedDepartement)
  )

  const totalSalaires = employes.reduce((acc, emp) => acc + emp.salaire, 0)
  const totalPrimes = employes.reduce((acc, emp) => acc + emp.primes, 0)
  const totalAbsences = employes.reduce((acc, emp) => acc + emp.absences, 0)
  const totalConges = employes.reduce((acc, emp) => acc + emp.conges, 0)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tableau de bord Paie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalSalaires.toLocaleString()}€</div>
                <p className="text-xs text-muted-foreground">Total Salaires</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalPrimes.toLocaleString()}€</div>
                <p className="text-xs text-muted-foreground">Total Primes</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalAbsences}</div>
                <p className="text-xs text-muted-foreground">Total Absences</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{totalConges}</div>
                <p className="text-xs text-muted-foreground">Total Congés</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des Paies</CardTitle>
            <div className="flex gap-2">
              <Select value={selectedDepartement} onValueChange={setSelectedDepartement}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Département" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tous">Tous les départements</SelectItem>
                  <SelectItem value="Développement">Développement</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="Design">Design</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Rechercher un employé..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tous">
            <TabsList>
              <TabsTrigger value="tous">Tous</TabsTrigger>
              <TabsTrigger value="valide">Validés</TabsTrigger>
              <TabsTrigger value="en_attente">En attente</TabsTrigger>
              <TabsTrigger value="erreur">Erreurs</TabsTrigger>
            </TabsList>
            <TabsContent value="tous">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employé</TableHead>
                    <TableHead>Département</TableHead>
                    <TableHead>Salaire</TableHead>
                    <TableHead>Primes</TableHead>
                    <TableHead>Absences</TableHead>
                    <TableHead>Congés</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {employesFiltres.map((employe) => (
                    <TableRow key={employe.id}>
                      <TableCell>
                        <div className="font-medium">
                          {employe.prenom} {employe.nom}
                        </div>
                      </TableCell>
                      <TableCell>{employe.departement}</TableCell>
                      <TableCell>{employe.salaire.toLocaleString()}€</TableCell>
                      <TableCell>{employe.primes.toLocaleString()}€</TableCell>
                      <TableCell>{employe.absences}</TableCell>
                      <TableCell>{employe.conges}</TableCell>
                      <TableCell>
                        <Badge className={statutColors[employe.statut]}>
                          {employe.statut.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Send className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertes et Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Attention</AlertTitle>
              <AlertDescription>
                Sophie Bernard a 2 absences non justifiées ce mois-ci.
              </AlertDescription>
            </Alert>
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                Les fiches de paie de mars 2024 sont prêtes à être validées.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 