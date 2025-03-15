import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { VaultTable } from "@/components/vault-table"
import { 
  BarChart3, 
  ChevronDown, 
  Ticket, 
  MessageSquare,
  UserCircle,
  Search,
  Plus,
  Filter
} from "lucide-react"

export default function UserPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="grid lg:grid-cols-[280px_1fr]">
        <aside className="border-r bg-background/50 backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <UserCircle className="h-6 w-6" />
            <span className="font-bold">Mon Espace</span>
          </div>
          <div className="px-4 py-4">
            <Input placeholder="Rechercher un ticket" className="bg-background/50" />
          </div>
          <nav className="space-y-2 px-2">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Ticket className="h-4 w-4" />
              Mes Tickets
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              Mon Activité
            </Button>
          </nav>
        </aside>
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Mes Tickets</h1>
              <div className="text-sm text-muted-foreground">Suivi de vos demandes</div>
            </div>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Nouveau Ticket
            </Button>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <MetricsCard
              title="Tickets en cours"
              value="3"
              change={{ value: "+1", percentage: "+33%", isPositive: true }}
            />
            <MetricsCard
              title="En attente"
              value="2"
              change={{ value: "-1", percentage: "-33%", isPositive: true }}
            />
            <MetricsCard
              title="Résolus (30j)"
              value="8"
              change={{ value: "+3", percentage: "+37%", isPositive: true }}
            />
          </div>
          <Card className="mt-6 p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Historique de mes tickets</h2>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost">
                  7 jours
                </Button>
                <Button size="sm" variant="ghost">
                  30 jours
                </Button>
                <Button size="sm" variant="ghost">
                  Tout
                </Button>
              </div>
            </div>
            <StatsChart />
          </Card>
          <div className="mt-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Mes tickets récents</h2>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtrer
              </Button>
            </div>
            <VaultTable userView={true} /> {/* Nous devrons modifier VaultTable pour gérer une vue utilisateur */}
          </div>
        </main>
      </div>
    </div>
  )
}
