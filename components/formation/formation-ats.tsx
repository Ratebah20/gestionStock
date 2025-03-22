import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"

interface Candidat {
  id: string
  nom: string
  prenom: string
  poste: string
  dateApplication: string
  statut: "nouveau" | "en_revue" | "entretien" | "rejeté" | "embauché"
  score: number
  competences: string[]
}

const candidatsSimules: Candidat[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Marie",
    poste: "Développeur Frontend",
    dateApplication: "2024-03-19",
    statut: "nouveau",
    score: 85,
    competences: ["React", "TypeScript", "CSS"]
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Pierre",
    poste: "Développeur Backend",
    dateApplication: "2024-03-18",
    statut: "en_revue",
    score: 92,
    competences: ["Node.js", "Python", "SQL"]
  },
  {
    id: "3",
    nom: "Bernard",
    prenom: "Sophie",
    poste: "UX Designer",
    dateApplication: "2024-03-17",
    statut: "entretien",
    score: 88,
    competences: ["Figma", "UI/UX", "Prototypage"]
  }
]

const statutColors = {
  nouveau: "bg-blue-500",
  en_revue: "bg-yellow-500",
  entretien: "bg-green-500",
  rejeté: "bg-red-500",
  embauché: "bg-purple-500"
}

export default function FormationATS() {
  const [candidats, setCandidats] = useState<Candidat[]>(candidatsSimules)
  const [searchTerm, setSearchTerm] = useState("")

  const candidatsFiltres = candidats.filter(candidat => 
    candidat.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidat.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    candidat.poste.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Tableau de bord ATS</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">{candidats.length}</div>
                <p className="text-xs text-muted-foreground">Total Candidats</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {candidats.filter(c => c.statut === "nouveau").length}
                </div>
                <p className="text-xs text-muted-foreground">Nouveaux</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {candidats.filter(c => c.statut === "entretien").length}
                </div>
                <p className="text-xs text-muted-foreground">En Entretien</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-2xl font-bold">
                  {candidats.filter(c => c.statut === "embauché").length}
                </div>
                <p className="text-xs text-muted-foreground">Embauchés</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des Candidats</CardTitle>
            <div className="flex gap-2">
              <Input
                placeholder="Rechercher un candidat..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-[300px]"
              />
              <Button>Importer CV</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="tous">
            <TabsList>
              <TabsTrigger value="tous">Tous</TabsTrigger>
              <TabsTrigger value="nouveau">Nouveaux</TabsTrigger>
              <TabsTrigger value="en_revue">En Revue</TabsTrigger>
              <TabsTrigger value="entretien">Entretien</TabsTrigger>
              <TabsTrigger value="embauché">Embauchés</TabsTrigger>
            </TabsList>
            <TabsContent value="tous">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidat</TableHead>
                    <TableHead>Poste</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Statut</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {candidatsFiltres.map((candidat) => (
                    <TableRow key={candidat.id}>
                      <TableCell>
                        <div className="font-medium">
                          {candidat.prenom} {candidat.nom}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {candidat.competences.join(", ")}
                        </div>
                      </TableCell>
                      <TableCell>{candidat.poste}</TableCell>
                      <TableCell>{candidat.dateApplication}</TableCell>
                      <TableCell>
                        <Badge className={statutColors[candidat.statut]}>
                          {candidat.statut.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={candidat.score} className="w-[100px]" />
                          <span>{candidat.score}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          Voir CV
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
} 