"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts"

export default function FormationDashboard() {
  const [year, setYear] = useState("2025")
  const [period, setPeriod] = useState("year")
  
  // Données pour les statistiques
  const statsData = {
    totalFormations: 48,
    totalParticipants: 320,
    totalHours: 640,
    totalBudget: 78000,
    completionRate: 92,
    satisfactionRate: 87
  }
  
  // Données pour les graphiques
  const monthlyData = [
    { name: "Jan", formations: 4, participants: 28, budget: 6500 },
    { name: "Fév", formations: 5, participants: 32, budget: 7200 },
    { name: "Mar", formations: 6, participants: 40, budget: 9500 },
    { name: "Avr", formations: 3, participants: 22, budget: 5000 },
    { name: "Mai", formations: 5, participants: 35, budget: 8200 },
    { name: "Juin", formations: 4, participants: 30, budget: 7000 },
    { name: "Juil", formations: 2, participants: 15, budget: 3500 },
    { name: "Août", formations: 1, participants: 8, budget: 2000 },
    { name: "Sept", formations: 5, participants: 38, budget: 8800 },
    { name: "Oct", formations: 6, participants: 42, budget: 9800 },
    { name: "Nov", formations: 4, participants: 25, budget: 6000 },
    { name: "Déc", formations: 3, participants: 15, budget: 4500 }
  ]
  
  const typeData = [
    { name: "Technique", value: 40, color: "#0088FE" },
    { name: "Management", value: 25, color: "#00C49F" },
    { name: "Soft Skills", value: 20, color: "#FFBB28" },
    { name: "Certification", value: 10, color: "#FF8042" },
    { name: "Autre", value: 5, color: "#8884D8" }
  ]
  
  const departmentData = [
    { name: "Informatique", formations: 18, participants: 120, budget: 30000 },
    { name: "Marketing", formations: 8, participants: 48, budget: 12000 },
    { name: "RH", formations: 6, participants: 36, budget: 9000 },
    { name: "Finance", formations: 5, participants: 25, budget: 7500 },
    { name: "Production", formations: 11, participants: 91, budget: 19500 }
  ]
  
  const topFormations = [
    { id: 1, title: "Développement Web React", participants: 32, satisfaction: 95, type: "technique" },
    { id: 2, title: "Leadership & Management", participants: 24, satisfaction: 88, type: "management" },
    { id: 3, title: "Communication Efficace", participants: 28, satisfaction: 92, type: "soft-skills" },
    { id: 4, title: "Excel Avancé", participants: 20, satisfaction: 85, type: "technique" },
    { id: 5, title: "Certification Cloud", participants: 15, satisfaction: 90, type: "certification" }
  ]
  
  const getFormationTypeBadge = (type: string) => {
    switch (type) {
      case "technique":
        return <Badge variant="default">Technique</Badge>
      case "management":
        return <Badge variant="secondary">Management</Badge>
      case "soft-skills":
        return <Badge variant="outline">Soft Skills</Badge>
      case "certification":
        return <Badge className="bg-amber-500">Certification</Badge>
      default:
        return <Badge variant="outline">Autre</Badge>
    }
  }
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tableau de Bord des Formations</h2>
        <div className="flex items-center gap-4">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Année</SelectItem>
              <SelectItem value="quarter">Trimestre</SelectItem>
              <SelectItem value="month">Mois</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Année" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Formations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalFormations}</div>
            <p className="text-xs text-muted-foreground">Formations réalisées en {year}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalParticipants}</div>
            <p className="text-xs text-muted-foreground">Participants formés en {year}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalBudget.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">Budget total {year}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Heures de Formation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.totalHours}</div>
            <p className="text-xs text-muted-foreground">Heures dispensées en {year}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Taux de Complétion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.completionRate}%</div>
            <p className="text-xs text-muted-foreground">Formations terminées</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statsData.satisfactionRate}%</div>
            <p className="text-xs text-muted-foreground">Taux de satisfaction moyen</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Évolution des Formations</CardTitle>
            <CardDescription>
              Nombre de formations et participants par mois en {year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={monthlyData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="formations"
                    name="Formations"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line 
                    yAxisId="right" 
                    type="monotone" 
                    dataKey="participants" 
                    name="Participants" 
                    stroke="#82ca9d" 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition par Type</CardTitle>
            <CardDescription>
              Distribution des formations par type en {year}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={typeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {typeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Répartition par Département</CardTitle>
          <CardDescription>
            Formations, participants et budget par département en {year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={departmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="formations" name="Formations" fill="#8884d8" />
                <Bar dataKey="participants" name="Participants" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Top Formations</CardTitle>
          <CardDescription>
            Les formations les plus populaires en {year}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Formation</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Satisfaction</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topFormations.map((formation) => (
                <TableRow key={formation.id}>
                  <TableCell className="font-medium">{formation.title}</TableCell>
                  <TableCell>{getFormationTypeBadge(formation.type)}</TableCell>
                  <TableCell>{formation.participants}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className={`font-medium ${formation.satisfaction >= 90 ? 'text-green-500' : formation.satisfaction >= 80 ? 'text-amber-500' : 'text-red-500'}`}>
                        {formation.satisfaction}%
                      </span>
                    </div>
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
