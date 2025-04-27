// components/orange-header.tsx
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { ThemeToggle } from "./theme-toggle"
import { Search, Bell, Menu, User } from "lucide-react"

export function OrangeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-700/30 bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between px-4">
        {/* Logo et nom */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
              <Image 
                src="/orange.jpg" 
                alt="Orange Logo" 
                width={32} 
                height={32} 
                className="rounded-md"
              />
            </div>
            <span className="font-bold text-xl tracking-tight text-orange-500">GestionStock</span>
          </Link>
        </div>
        
        {/* Boutons alignés à droite */}
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="text-foreground">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Avatar>
            <AvatarFallback className="bg-orange-600 text-white">
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}