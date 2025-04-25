// components/orange-header.tsx
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { OrangeButton } from "./ui/orange-button"
import { ThemeToggle } from "./theme-toggle"
import { Search, Bell, Menu, User } from "lucide-react"

export function OrangeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-orange-700/30 bg-background/95 backdrop-blur">
      <div className="container px-4 sm:px-6 flex h-16 sm:h-18 md:h-20 items-center justify-between">
        {/* Logo Orange - Responsive */}
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="flex items-center gap-2 md:gap-3">
            <Image 
              src="/orange.jpg" 
              alt="Orange Logo" 
              width={32} 
              height={32} 
              className="rounded-md w-8 h-8 md:w-10 md:h-10"
            />
            <span className="font-bold text-xl md:text-2xl tracking-tight text-orange-500 hidden sm:inline-block">GestionStock</span>
            <span className="font-bold text-lg tracking-tight text-orange-500 sm:hidden">GS</span>
          </Link>
        </div>
        
        {/* All icons moved to right - Responsive */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-5">
          <Button variant="ghost" size="icon" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 hidden md:flex">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Avatar>
            <AvatarFallback className="bg-orange-600 text-white h-8 w-8 sm:h-9 sm:w-9">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
            </AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="text-orange-500 hover:text-orange-400 hover:bg-orange-950/50 sm:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
