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
  Users, 
  Computer, 
  Box, 
  Settings, 
  Search,
  Plus,
  Filter,
  ArrowRight,
  Package,
  Bell
} from "lucide-react"
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"
import { OrangeButton } from "@/components/ui/orange-button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 overflow-x-hidden">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="flex flex-col items-center justify-center text-center max-w-2xl mx-auto">
            <Image 
              src="/orange.jpg" 
              alt="Orange Logo" 
              width={100} 
              height={100} 
              className="rounded-lg mb-8"
            />
            <h1 className="text-4xl font-bold text-orange-500 mb-4">Gestion de Stock</h1>
            <p className="text-lg text-gray-300 mb-10 max-w-md">
              Solution complète pour la gestion d'inventaire selon les standards Orange.
            </p>
            
            <div className="flex gap-5 mb-16">
              <Link href="/dashboard">
                <OrangeButton size="lg" className="gap-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 shadow-lg shadow-orange-950/20">
                  Dashboard
                  <ArrowRight className="h-4 w-4" />
                </OrangeButton>
              </Link>
              <Link href="/inventory">
                <OrangeButton variant="outline" size="lg" className="rounded-md border-orange-500 text-orange-500 hover:bg-orange-950/30 px-6 py-2.5">
                  Inventaire
                </OrangeButton>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-orange-500 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                    <Package className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-500">Inventaire</h3>
                </div>
                <p className="text-gray-300">Suivi en temps réel de vos stocks avec alertes automatiques.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-orange-500 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-500">Statistiques</h3>
                </div>
                <p className="text-gray-300">Tableaux de bord interactifs pour une analyse approfondie.</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-lg border-l-4 border-orange-500 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-orange-950/50 text-orange-500 p-2 rounded-md">
                    <Bell className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-semibold text-orange-500">Notifications</h3>
                </div>
                <p className="text-gray-300">Système d'alertes configurable selon vos besoins.</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
