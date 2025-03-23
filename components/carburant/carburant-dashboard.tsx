"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Download, AlertCircle, Fuel, CreditCard, Users, TrendingUp } from "lucide-react"

interface Transaction {
  id: string
  employeId: string
  date: string
  stationService: string
  litres: number
  prix: number
  statut: "normal" | "suspect"
}

interface Employe {
  id: string
  nom: string
  prenom: string
  departement: string
  numeroCarte: string
  statut: "actif" | "suspendu" | "bloque"
  consommationMensuelle: number
  transactions: Transaction[]
}

const employesSimules: Employe[] = [
  {
    id: "1",
    nom: "Dupont",
    prenom: "Marie",
    departement: "Commercial",
    numeroCarte: "4519 XXXX XXXX 1234",
    statut: "actif",
    consommationMensuelle: 250,
    transactions: [
      {
        id: "t1",
        employeId: "1",
        date: "2024-03-19",
        stationService: "Total - A6",
        litres: 45,
        prix: 89.55,
        statut: "normal"
      },
      {
        id: "t2",
        employeId: "1",
        date: "2024-03-15",
        stationService: "BP - Lyon",
        litres: 50,
        prix: 98.50,
        statut: "normal"
      }
    ]
  },
  {
    id: "2",
    nom: "Martin",
    prenom: "Pierre",
    departement: "Logistique",
    numeroCarte: "4519 XXXX XXXX 5678",
    statut: "actif",
    consommationMensuelle: 480,
    transactions: [
      {
        id: "t3",
        employeId: "2",
        date: "2024-03-18",
        stationService: "Shell - Paris",
        litres: 60,
        prix: 118.20,
        statut: "suspect"
      }
    ]
  }
]

const statutColors = {
  actif: "bg-green-500",
  suspendu: "bg-yellow-500",
  bloque: "bg-red-500",
  normal: "bg-blue-500",
  suspect: "bg-red-500"
}

export default function CarburantDashboard() {
  const [employes] = useState<Employe[]>(employesSimules)
  const [searchTerm, setSearchTerm] = useState("")

  const totalLitres = employes.reduce((acc, emp) => 
    acc + emp.transactions.reduce((sum, t) => sum + t.litres, 0), 0
  )
  
  const totalEuros = employes.reduce((acc, emp) => 
    acc + emp.transactions.reduce((sum, t) => sum + t.prix, 0), 0
  )

  const employesTries = [...employes].sort((a, b) => 
    b.consommationMensuelle - a.consommationMensuelle
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Gestion des Cartes Carburant</h1>
        <div className="flex gap-2">
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exporter Rapport
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consommation Totale
            </CardTitle>
            <Fuel className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLitres.toFixed(0)}L</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Dépenses Totales
            </CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEuros.toFixed(2)}€</div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Cartes Actives
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {employes.filter(e => e.statut === "actif").length}
            </div>
            <p className="text-xs text-muted-foreground">
              Sur {employes.length} cartes
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Coût Moyen/Litre
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(totalEuros / totalLitres).toFixed(2)}€
            </div>
            <p className="text-xs text-muted-foreground">
              Ce mois
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top Consommateurs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employesTries.slice(0, 5).map((employe) => (
                <div key={employe.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{employe.prenom} {employe.nom}</p>
                    <p className="text-sm text-muted-foreground">{employe.departement}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{employe.consommationMensuelle}L</p>
                    <p className="text-sm text-muted-foreground">Ce mois</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alertes Récentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {employes
                .flatMap(e => e.transactions)
                .filter(t => t.statut === "suspect")
                .map((transaction) => {
                  const employe = employes.find(e => e.id === transaction.employeId)!
                  return (
                    <Alert key={transaction.id} variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Transaction Suspecte</AlertTitle>
                      <AlertDescription>
                        {employe.prenom} {employe.nom} - {transaction.litres}L pour {transaction.prix}€
                        <br />
                        <span className="text-sm">{transaction.stationService} - {transaction.date}</span>
                      </AlertDescription>
                    </Alert>
                  )
                })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Gestion des Cartes</CardTitle>
            <Input
              placeholder="Rechercher un employé..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[300px]"
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Numéro de Carte</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Conso. Mensuelle</TableHead>
                <TableHead>Dernière Transaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employes
                .filter(employe =>
                  employe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  employe.prenom.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((employe) => (
                  <TableRow key={employe.id}>
                    <TableCell>
                      <div className="font-medium">
                        {employe.prenom} {employe.nom}
                      </div>
                    </TableCell>
                    <TableCell>{employe.numeroCarte}</TableCell>
                    <TableCell>{employe.departement}</TableCell>
                    <TableCell>
                      <Badge className={statutColors[employe.statut]}>
                        {employe.statut}
                      </Badge>
                    </TableCell>
                    <TableCell>{employe.consommationMensuelle}L</TableCell>
                    <TableCell>
                      {employe.transactions[0]?.date || "Aucune"}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 