import { Card } from "@/components/ui/card"
import { ArrowUpRight } from "lucide-react"
import type React from "react" // Added import for React

interface MetricsCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
  chart?: React.ReactNode
}

export function MetricsCard({ title, value, change, chart }: MetricsCardProps) {
  return (
    <Card className="p-4 border border-orange-800/30 bg-gray-800/50 backdrop-blur hover:shadow-lg transition-shadow duration-200 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-orange-500">{title}</h3>
        {chart ? <ArrowUpRight className="h-4 w-4 text-orange-500" /> : null}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white">{value}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-sm text-gray-300">{change.value}</span>
            <span className={`text-sm ${change.isPositive ? "text-orange-500" : "text-red-400"}`}>
              {change.percentage}
            </span>
          </div>
        </div>
        {chart}
      </div>
    </Card>
  )
}

