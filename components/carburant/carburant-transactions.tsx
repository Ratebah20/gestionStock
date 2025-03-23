"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Transaction {
  id: string
  date: string
  stationService: string
  litres: number
  prix: number
  statut: "normal" | "suspect"
}

interface CarburantTransactionsProps {
  employeId: string
  employeNom: string
  transactions: Transaction[]
}

const statutColors = {
  normal: "bg-blue-500",
  suspect: "bg-red-500"
}

export default function CarburantTransactions({
  employeId,
  employeNom,
  transactions
}: CarburantTransactionsProps) {
  const totalLitres = transactions.reduce((acc, t) => acc + t.litres, 0)
  const totalEuros = transactions.reduce((acc, t) => acc + t.prix, 0)
  const moyennePrixLitre = totalEuros / totalLitres

  const transactionsSuspectes = transactions.filter(t => t.statut === "suspect")

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Litres</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLitres.toFixed(0)}L</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Dépenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalEuros.toFixed(2)}€</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Prix Moyen/Litre</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moyennePrixLitre.toFixed(2)}€</div>
          </CardContent>
        </Card>
      </div>

      {transactionsSuspectes.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-semibold">Alertes</h3>
          {transactionsSuspectes.map(transaction => (
            <Alert key={transaction.id} variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Transaction Suspecte</AlertTitle>
              <AlertDescription>
                {transaction.litres}L pour {transaction.prix}€ le {transaction.date}
                <br />
                <span className="text-sm">{transaction.stationService}</span>
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Historique des Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Station</TableHead>
                <TableHead>Litres</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Prix/L</TableHead>
                <TableHead>Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.date}</TableCell>
                  <TableCell>{transaction.stationService}</TableCell>
                  <TableCell>{transaction.litres}L</TableCell>
                  <TableCell>{transaction.prix}€</TableCell>
                  <TableCell>
                    {(transaction.prix / transaction.litres).toFixed(2)}€
                  </TableCell>
                  <TableCell>
                    <Badge className={statutColors[transaction.statut]}>
                      {transaction.statut}
                    </Badge>
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