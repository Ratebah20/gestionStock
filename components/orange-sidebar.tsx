// components/orange-sidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  LayoutDashboard, 
  Search, 
  MapPin, 
  Bell, 
  Package, 
  DollarSign, 
  QrCode, 
  Truck, 
  FileText, 
  BarChart3, 
  AlertTriangle, 
  TrendingUp, 
  RotateCcw, 
  CheckSquare
} from "lucide-react"

export function OrangeSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Menu principal",
      items: [
        {
          title: "Dashboard",
          icon: <LayoutDashboard className="h-5 w-5" />,
          href: "/dashboard",
        },
        {
          title: "Intervention Search",
          icon: <Search className="h-5 w-5" />,
          href: "/intervention-search",
        },
        {
          title: "Locations",
          icon: <MapPin className="h-5 w-5" />,
          href: "/locations",
        },
        {
          title: "Notifications",
          icon: <Bell className="h-5 w-5" />,
          href: "/notifications",
        },
      ],
    },
    {
      title: "Inventory",
      items: [
        {
          title: "Inventory",
          icon: <Package className="h-5 w-5" />,
          href: "/inventory",
        },
        {
          title: "Inventory Value",
          icon: <DollarSign className="h-5 w-5" />,
          href: "/inventory-value",
        },
        {
          title: "QR & Barcodes",
          icon: <QrCode className="h-5 w-5" />,
          href: "/qr-barcodes",
        },
        {
          title: "Shipments",
          icon: <Truck className="h-5 w-5" />,
          href: "/shipments",
        },
        {
          title: "Order Form",
          icon: <FileText className="h-5 w-5" />,
          href: "/order-form",
        },
      ],
    },
    {
      title: "Analytics",
      items: [
        {
          title: "Reports",
          icon: <BarChart3 className="h-5 w-5" />,
          href: "/reports",
        },
        {
          title: "Stock Alerts",
          icon: <AlertTriangle className="h-5 w-5" />,
          href: "/stock-alerts",
        },
        {
          title: "Inventory Forecast",
          icon: <TrendingUp className="h-5 w-5" />,
          href: "/inventory-forecast",
        },
        {
          title: "Stock Rotation",
          icon: <RotateCcw className="h-5 w-5" />,
          href: "/stock-rotation",
        },
        {
          title: "Tasks",
          icon: <CheckSquare className="h-5 w-5" />,
          href: "/tasks",
        },
      ],
    },
  ]

  return (
    <div className="w-64 h-screen overflow-y-hidden bg-gray-900 border-r border-orange-700/30 hidden md:block">
      <div className="p-4">
        <div className="space-y-6">
          {menuItems.map((section, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-xs uppercase tracking-wider text-orange-500 font-semibold px-3">
                {section.title}
              </h3>
              <div className="space-y-1">
                {section.items.map((item, j) => (
                  <Link
                    key={j}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 text-sm rounded-md group transition-colors",
                      pathname === item.href
                        ? "bg-orange-950/50 text-orange-400"
                        : "text-gray-400 hover:text-orange-400 hover:bg-orange-950/30"
                    )}
                  >
                    <span className={cn(
                      "transition-colors",
                      pathname === item.href
                        ? "text-orange-400"
                        : "text-gray-400 group-hover:text-orange-400"
                    )}>
                      {item.icon}
                    </span>
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
