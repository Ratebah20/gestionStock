"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

type BudgetItem = {
  id: number
  department: string
  allocated: number
  spent: number
  remaining: number
  percentage: number
}

type ExpenseItem = {
  id: number
  date: string
  formation: string
  department: string
  amount: number
  participants: number
  costPerPerson: number
}

export default function FormationBudget() {
  const [year, setYear] = useState("2025")
  const [formOpen, setFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    department: "",
    allocated: ""
  })
  
  const [budgetData, setBudgetData] = useState<BudgetItem[]>([
    { 
      id: 1, 
      department: "Informatique", 
      allocated: 25000, 
      spent: 12500, 
      remaining: 12500, 
      percentage: 50 
    },
    { 
      id: 2, 
      department: "Marketing", 
      allocated: 15000, 
      spent: 9000, 
      remaining: 6000, 
      percentage: 60 
    },
    { 
      id: 3, 
      department: "Ressources Humaines", 
      allocated: 10000, 
      spent: 3000, 
      remaining: 7000, 
      percentage: 30 
    },
    { 
      id: 4, 
      department: "Finance", 
      allocated: 8000, 
      spent: 2000, 
      remaining: 6000, 
      percentage: 25 
    },
    { 
      id: 5, 
      department: "Production", 
      allocated: 20000, 
      spent: 15000, 
      remaining: 5000, 
      percentage: 75 
    }
  ])

  const [expenseData, setExpenseData] = useState<ExpenseItem[]>([
    {
      id: 1,
      date: "15/01/2025",
      formation: "Formation Excel Avancé",
      department: "Finance",
      amount: 2000,
      participants: 5,
      costPerPerson: 400
    },
    {
      id: 2,
      date: "22/02/2025",
      formation: "Développement Web",
      department: "Informatique",
      amount: 8500,
      participants: 10,
      costPerPerson: 850
    },
    {
      id: 3,
      date: "10/03/2025",
      formation: "Stratégies Marketing Digital",
      department: "Marketing",
      amount: 6000,
      participants: 8,
      costPerPerson: 750
    },
    {
      id: 4,
      date: "05/04/2025",
      formation: "Gestion d'Équipe",
      department: "Ressources Humaines",
      amount: 3000,
      participants: 6,
      costPerPerson: 500
    },
    {
      id: 5,
      date: "18/05/2025",
      formation: "Optimisation de Production",
      department: "Production",
      amount: 9000,
      participants: 12,
      costPerPerson: 750
    }
  ])

  const totalBudget = budgetData.reduce((sum, item) => sum + item.allocated, 0)
  const totalSpent = budgetData.reduce((sum, item) => sum + item.spent, 0)
  const totalRemaining = budgetData.reduce((sum, item) => sum + item.remaining, 0)
  const overallPercentage = Math.round((totalSpent / totalBudget) * 100)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    
    const allocated = parseFloat(formData.allocated)
    
    const newBudgetItem: BudgetItem = {
      id: Date.now(),
      department: formData.department,
      allocated: allocated,
      spent: 0,
      remaining: allocated,
      percentage: 0
    }

    setBudgetData([...budgetData, newBudgetItem])
    setFormOpen(false)
    
    // Reset form
    setFormData({
      department: "",
      allocated: ""
    })
  }

  // Data for charts
  const pieData = budgetData.map(item => ({
    name: item.department,
    value: item.allocated
  }))

  const barData = budgetData.map(item => ({
    name: item.department,
    allocated: item.allocated,
    spent: item.spent,
    remaining: item.remaining
  }))

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d']

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBudget.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">Budget formation {year}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Dépensé</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSpent.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">{overallPercentage}% du budget total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Restant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRemaining.toLocaleString()} €</div>
            <p className="text-xs text-muted-foreground">{100 - overallPercentage}% du budget total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Progress value={overallPercentage} className="h-2" />
              <span className="text-sm font-medium">{overallPercentage}%</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Consommation du budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Suivi Budgétaire par Département</CardTitle>
                <CardDescription>
                  Budget alloué et dépenses par département pour l'année {year}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
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
                
                <Dialog open={formOpen} onOpenChange={setFormOpen}>
                  <DialogTrigger asChild>
                    <Button>Ajouter</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Ajouter un budget départemental</DialogTitle>
                      <DialogDescription>
                        Définissez le budget alloué à un département pour l'année {year}
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="department">Département</Label>
                        <Input 
                          id="department" 
                          name="department" 
                          value={formData.department} 
                          onChange={handleInputChange} 
                          placeholder="Nom du département" 
                          required 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allocated">Budget alloué (€)</Label>
                        <Input 
                          id="allocated" 
                          name="allocated" 
                          type="number" 
                          value={formData.allocated} 
                          onChange={handleInputChange} 
                          placeholder="Montant" 
                          required 
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="submit">Ajouter</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Département</TableHead>
                  <TableHead>Budget Alloué</TableHead>
                  <TableHead>Dépensé</TableHead>
                  <TableHead>Restant</TableHead>
                  <TableHead>Progression</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.department}</TableCell>
                    <TableCell>{item.allocated.toLocaleString()} €</TableCell>
                    <TableCell>{item.spent.toLocaleString()} €</TableCell>
                    <TableCell>{item.remaining.toLocaleString()} €</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Progress value={item.percentage} className="h-2 w-[100px]" />
                        <span className="text-sm">{item.percentage}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Répartition du Budget</CardTitle>
            <CardDescription>
              Visualisation de la répartition budgétaire
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pie">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="pie">Camembert</TabsTrigger>
                <TabsTrigger value="bar">Barres</TabsTrigger>
              </TabsList>
              <TabsContent value="pie" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value="bar" className="h-[300px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={barData}
                    margin={{
                      top: 5,
                      right: 5,
                      left: 5,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{fontSize: 10}} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="spent" name="Dépensé" fill="#8884d8" />
                    <Bar dataKey="remaining" name="Restant" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Historique des Dépenses</CardTitle>
          <CardDescription>
            Détail des dépenses de formation par département
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Formation</TableHead>
                <TableHead>Département</TableHead>
                <TableHead>Montant</TableHead>
                <TableHead>Participants</TableHead>
                <TableHead>Coût/Personne</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseData.map((expense) => (
                <TableRow key={expense.id}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell className="font-medium">{expense.formation}</TableCell>
                  <TableCell>{expense.department}</TableCell>
                  <TableCell>{expense.amount.toLocaleString()} €</TableCell>
                  <TableCell>{expense.participants}</TableCell>
                  <TableCell>{expense.costPerPerson.toLocaleString()} €</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
