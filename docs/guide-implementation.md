# Guide d'Implémentation - Application de Gestion de Stock

## Mise en Place Initiale

### 1. Configuration du Thème Orange

Modifiez le fichier `tailwind.config.ts` pour intégrer les couleurs d'Orange :

```ts
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: "#FF7900",
          500: "#FF7900",
          600: "#CC6100",
        },
      },
    },
  },
}

export default config
```

### 2. Activation du Mode Clair/Sombre

Assurez-vous que le `ThemeProvider` est correctement configuré dans le layout principal :

```tsx
// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

Créez un bouton de basculement de thème :

```tsx
// components/theme-toggle.tsx
'use client'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Changer de thème</span>
    </Button>
  )
}
```

## Implémentation des Pages Principales

### 1. Page d'Accueil / Tableau de Bord

```tsx
// app/page.tsx
import { MetricsCard } from "@/components/metrics-card"
import { StatsChart } from "@/components/stats-chart"
import { Button } from "@/components/ui/button"
import { 
  BarChart3, 
  Package, 
  PackagePlus, 
  PackageMinus,
  Users,
  Search
} from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className="border-r bg-background/50 backdrop-blur">
          <div className="flex h-16 items-center gap-2 border-b px-6">
            <Package className="h-6 w-6 text-orange-500" />
            <span className="font-bold text-orange-500">OrangeStock</span>
          </div>
          
          {/* Navigation */}
          <nav className="space-y-2 px-2 py-4">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <BarChart3 className="h-4 w-4" />
              Tableau de bord
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Package className="h-4 w-4" />
              Produits
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PackagePlus className="h-4 w-4" />
              Entrées stock
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PackageMinus className="h-4 w-4" />
              Sorties stock
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              Fournisseurs
            </Button>
          </nav>
        </aside>
        
        {/* Contenu principal */}
        <main className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">Tableau de bord</h1>
              <div className="text-sm text-muted-foreground">Gestion de stock Orange</div>
            </div>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Nouveau Produit
            </Button>
          </div>
          
          {/* KPIs */}
          <div className="grid gap-4 md:grid-cols-4">
            <MetricsCard
              title="Produits en stock"
              value="245"
              change={{ value: "+12", percentage: "+5%", isPositive: true }}
            />
            <MetricsCard
              title="Valeur du stock"
              value="32 450 €"
              change={{ value: "+1 540 €", percentage: "+4.7%", isPositive: true }}
            />
            <MetricsCard
              title="Produits à commander"
              value="15"
              change={{ value: "+3", percentage: "+25%", isPositive: false }}
            />
            <MetricsCard
              title="Mouvements (7j)"
              value="87"
              change={{ value: "+14", percentage: "+19%", isPositive: true }}
            />
          </div>
          
          {/* Graphique d'activité */}
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-4">Activité du stock</h2>
            <StatsChart />
          </div>
        </main>
      </div>
    </div>
  )
}
```

### 2. Composant de Table de Produits

Créez un composant réutilisable pour afficher les produits en stock :

```tsx
// components/product-table.tsx
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Edit, Trash2, MoreHorizontal } from "lucide-react"

// Type pour les produits
interface Product {
  id: string
  name: string
  category: string
  quantity: number
  price: number
  status: "En stock" | "Stock faible" | "Rupture"
  lastUpdate: string
}

// Données de test
const products: Product[] = [
  {
    id: "P001",
    name: "Smartphone Galaxy S21",
    category: "Téléphones",
    quantity: 24,
    price: 799.99,
    status: "En stock",
    lastUpdate: "22.04.2025",
  },
  {
    id: "P002",
    name: "Livebox Fibre",
    category: "Modems/Routeurs",
    quantity: 5,
    price: 149.99,
    status: "Stock faible",
    lastUpdate: "20.04.2025",
  },
  {
    id: "P003",
    name: "Carte SIM Orange",
    category: "Accessoires",
    quantity: 0,
    price: 9.99,
    status: "Rupture",
    lastUpdate: "15.04.2025",
  },
]

export function ProductTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Référence/Nom</TableHead>
          <TableHead>Catégorie</TableHead>
          <TableHead>Quantité</TableHead>
          <TableHead>Prix unitaire</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Dernière MAJ</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">{product.id}</div>
                <div className="text-xs text-muted-foreground">{product.name}</div>
              </div>
            </TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell>{product.price.toFixed(2)} €</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs ${
                product.status === "En stock" ? "bg-green-500/10 text-green-500" 
                : product.status === "Stock faible" ? "bg-yellow-500/10 text-yellow-500"
                : "bg-red-500/10 text-red-500"
              }`}>
                {product.status}
              </span>
            </TableCell>
            <TableCell>{product.lastUpdate}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### 3. Formulaire d'Ajout/Modification de Produit

```tsx
// components/product-form.tsx
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Le nom doit contenir au moins 2 caractères",
  }),
  category: z.string().min(1, {
    message: "Veuillez sélectionner une catégorie",
  }),
  quantity: z.coerce.number().min(0, {
    message: "La quantité ne peut pas être négative",
  }),
  price: z.coerce.number().min(0, {
    message: "Le prix ne peut pas être négatif",
  }),
  reorderPoint: z.coerce.number().min(0, {
    message: "Le point de commande ne peut pas être négatif",
  }),
  location: z.string().optional(),
})

export function ProductForm({ product = null }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: product || {
      name: "",
      category: "",
      quantity: 0,
      price: 0,
      reorderPoint: 5,
      location: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    toast({
      title: "Produit enregistré",
      description: "Le produit a été enregistré avec succès",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom du produit</FormLabel>
              <FormControl>
                <Input placeholder="Smartphone Galaxy S21" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="telephones">Téléphones</SelectItem>
                  <SelectItem value="modems">Modems/Routeurs</SelectItem>
                  <SelectItem value="accessoires">Accessoires</SelectItem>
                  <SelectItem value="cartes">Cartes SIM/Prépayées</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantité</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix unitaire (€)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="reorderPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Point de commande</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Emplacement</FormLabel>
                <FormControl>
                  <Input placeholder="Étagère A3" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
          {product ? "Mettre à jour" : "Ajouter le produit"}
        </Button>
      </form>
    </Form>
  )
}
```

## Configurations Supplémentaires

### Adaptation du Logo Orange

Créez un composant de logo Orange :

```tsx
// components/orange-logo.tsx
export function OrangeLogo({ className = "h-8 w-8" }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" rx="50" fill="#FF7900" />
      <path d="M30 40 H70 V60 H30 Z" fill="white" />
    </svg>
  );
}
```

### Composant de Navigation avec Thème Orange

```tsx
// components/navbar.tsx
import { OrangeLogo } from "./orange-logo"
import { ThemeToggle } from "./theme-toggle"
import { Button } from "./ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Bell, Search } from "lucide-react"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <OrangeLogo />
          <span className="text-xl font-bold text-orange-500">OrangeStock</span>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <ThemeToggle />
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="bg-orange-100 text-orange-800">JD</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
```
