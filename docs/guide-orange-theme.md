# Guide d'Intégration des Couleurs et de l'Identité Orange

## Introduction

Ce guide explique comment intégrer l'identité visuelle d'Orange dans notre application de gestion de stock, en utilisant les couleurs officielles, les bonnes pratiques de design et les principes de la marque.

## Palette de Couleurs Orange

La couleur principale d'Orange est un orange vif (#FF7900) qui doit être utilisé stratégiquement pour:
- Les éléments d'action primaires (boutons principaux)
- Les points forts de la navigation
- Les indicateurs importants

### Palette complète

```css
:root {
  /* Couleurs principales */
  --orange-brand: #FF7900;
  --black: #000000;
  --white: #FFFFFF;
  
  /* Nuances d'orange */
  --orange-50: #FFF1E6;
  --orange-100: #FFE8D9;
  --orange-200: #FFD1B3;
  --orange-300: #FFBA8C;
  --orange-400: #FFA366;
  --orange-500: #FF7900;
  --orange-600: #CC6100;
  --orange-700: #994900;
  --orange-800: #663000;
  --orange-900: #331800;
  
  /* Couleurs complémentaires */
  --grey-50: #F8F8F8;
  --grey-100: #F2F2F2;
  --grey-200: #D8D8D8;
  --grey-300: #BEBEBE;
  --grey-400: #A4A4A4;
  --grey-500: #8A8A8A;
  --grey-600: #707070;
  --grey-700: #565656;
  --grey-800: #3C3C3C;
  --grey-900: #222222;
}
```

## Implémenter la Palette dans Tailwind CSS

### 1. Configuration Tailwind

Adaptez votre fichier `tailwind.config.ts` pour intégrer les couleurs d'Orange:

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss"

const config: Config = {
  theme: {
    extend: {
      colors: {
        // Couleur principale
        "orange-brand": "#FF7900",
        
        // Nuances d'orange
        orange: {
          50: "#FFF1E6",
          100: "#FFE8D9",
          200: "#FFD1B3",
          300: "#FFBA8C",
          400: "#FFA366",
          500: "#FF7900", // Orange principal
          600: "#CC6100",
          700: "#994900",
          800: "#663000",
          900: "#331800",
        },
        
        // Gris
        grey: {
          50: "#F8F8F8",
          100: "#F2F2F2",
          200: "#D8D8D8",
          300: "#BEBEBE",
          400: "#A4A4A4",
          500: "#8A8A8A",
          600: "#707070",
          700: "#565656",
          800: "#3C3C3C",
          900: "#222222",
        },
      },
    },
  },
  // Reste de la configuration...
}

export default config
```

### 2. Définir des Variables CSS pour le Mode Clair/Sombre

Créez un fichier `styles/theme-orange.css`:

```css
/* styles/theme-orange.css */
:root {
  /* Mode clair */
  --background: 0 0% 100%;
  --foreground: 0 0% 10%;
  
  --primary: 25 100% 50%; /* Orange */
  --primary-foreground: 0 0% 100%;
  
  --secondary: 25 30% 96%;
  --secondary-foreground: 25 50% 40%;
  
  --muted: 0 0% 96%;
  --muted-foreground: 0 0% 45%;
  
  --accent: 25 10% 94%;
  --accent-foreground: 25 90% 40%;
  
  --destructive: 0 100% 50%;
  --destructive-foreground: 0 0% 100%;
  
  --border: 0 0% 90%;
  --input: 0 0% 90%;
  --ring: 25 100% 50%; /* Orange */
  
  --radius: 0.5rem;
}

.dark {
  /* Mode sombre */
  --background: 0 0% 10%;
  --foreground: 0 0% 98%;
  
  --primary: 25 100% 50%; /* Orange */
  --primary-foreground: 0 0% 100%;
  
  --secondary: 25 30% 15%;
  --secondary-foreground: 25 50% 90%;
  
  --muted: 0 0% 20%;
  --muted-foreground: 0 0% 70%;
  
  --accent: 25 10% 25%;
  --accent-foreground: 25 90% 90%;
  
  --destructive: 0 70% 45%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 20%;
  --input: 0 0% 20%;
  --ring: 25 100% 50%; /* Orange */
}
```

Importez ces styles dans votre `globals.css`:

```css
@import 'theme-orange.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-background text-foreground;
  }
}
```

## Application du Style Orange

### Composants avec l'Identité Orange

#### 1. Boutons Orange

```tsx
// components/ui/orange-button.tsx
import { cva } from "class-variance-authority"
import { Button, ButtonProps } from "./button"

// Variants pour les boutons Orange
const orangeButtonVariants = cva(
  "rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500",
  {
    variants: {
      variant: {
        default: "bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700",
        outline: "border border-orange-500 text-orange-500 hover:bg-orange-50 active:bg-orange-100",
        ghost: "text-orange-600 hover:bg-orange-50 active:bg-orange-100",
        link: "text-orange-500 underline-offset-4 hover:underline",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export function OrangeButton({ className, variant, ...props }: ButtonProps) {
  return (
    <Button 
      className={orangeButtonVariants({ variant, className })}
      {...props}
    />
  )
}
```

#### 2. Logo et Entête Orange

```tsx
// components/orange-header.tsx
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { Button } from "./ui/button"
import { Search, Bell, Menu } from "lucide-react"

export function OrangeHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo Orange */}
          <svg className="h-8 w-8" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" rx="50" fill="#FF7900" />
            <path d="M30 40 H70 V60 H30 Z" fill="white" />
          </svg>
          <span className="font-bold text-xl text-orange-500">OrangeStock</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Accueil</Button>
          <Button variant="ghost">Produits</Button>
          <Button variant="ghost">Mouvements</Button>
          <Button variant="ghost">Rapports</Button>
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
            <AvatarFallback className="bg-orange-100 text-orange-800">JD</AvatarFallback>
          </Avatar>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
```

## Exemples Visuels d'Application

### Tableau de Bord Orange Style

Voici comment définir un tableau de bord avec l'identité visuelle Orange:

```tsx
// app/dashboard/page.tsx
import { OrangeHeader } from "@/components/orange-header"
import { MetricsCard } from "@/components/metrics-card"
import { OrangeButton } from "@/components/ui/orange-button"
import { Card } from "@/components/ui/card"
import { Package, Plus } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      <OrangeHeader />
      
      <main className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Tableau de bord</h1>
            <p className="text-muted-foreground">Gestion de stock Orange</p>
          </div>
          
          <OrangeButton className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Nouveau Produit
          </OrangeButton>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Produits"
            value="486"
            change={{ value: "+24", percentage: "+5%", isPositive: true }}
          />
          <MetricsCard
            title="Valeur Stock"
            value="176 320 €"
            change={{ value: "+8 250 €", percentage: "+4.9%", isPositive: true }}
          />
          <MetricsCard
            title="Produits Critique"
            value="8"
            change={{ value: "-3", percentage: "-27%", isPositive: true }}
          />
          <MetricsCard
            title="Nouveaux Articles"
            value="12"
            change={{ value: "+5", percentage: "+71%", isPositive: true }}
          />
        </div>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="col-span-2 p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Mouvements Récents</h2>
            {/* Tableau des mouvements */}
          </Card>
          
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 text-orange-600">Top Produits</h2>
            {/* Liste des produits populaires */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50">
                  <div className="bg-orange-100 text-orange-700 p-2 rounded-md">
                    <Package className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">Produit {i}</h4>
                    <p className="text-sm text-muted-foreground">42 unités</p>
                  </div>
                  <div className="text-right">
                    <span className="font-medium">899 €</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
```

## Règles de Conception pour l'Identité Orange

### 1. Utilisation Stratégique de la Couleur Orange

- Utiliser l'orange comme couleur d'accent et pour attirer l'attention
- Ne pas surcharger l'interface avec trop d'orange vif
- Réserver la couleur orange principalement pour:
  - Les boutons d'action principaux
  - Les éléments de navigation actifs
  - Les titres importants
  - Les indicateurs de progression

### 2. Typographie Adaptée

- Utiliser une typographie claire et professionnelle
- Police recommandée: Helvetica Neue ou une alternative sans-serif
- Hiérarchie visuelle:
  - Titres principaux: 24-32px, semi-bold
  - Sous-titres: 18-20px, medium
  - Corps de texte: 16px, regular
  - Texte secondaire: 14px, regular

### 3. Design Épuré et Professionnel

- Favoriser les espaces blancs pour une lisibilité optimale
- Utiliser des cartes avec des ombres subtiles pour séparer le contenu
- Privilégier des coins légèrement arrondis (border-radius: 6-8px)
- Maintenir une grille cohérente avec des espacements réguliers (multiples de 4px)

### 4. Adaptation aux Modes Clair/Sombre

- Mode clair: fond blanc, texte foncé, accent orange
- Mode sombre: fond sombre (pas noir pur), texte clair, accent orange légèrement adouci
- S'assurer que les contrastes sont suffisants dans les deux modes

## Checklist d'Implémentation de l'Identité Orange


- [ ] Configurer la palette de couleurs dans Tailwind
- [ ] Créer les variables CSS pour les thèmes clair/sombre
- [ ] Adapter les composants UI avec les couleurs Orange
- [ ] Intégrer le logo Orange dans l'en-tête
- [ ] Appliquer la typographie recommandée
- [ ] Tester l'accessibilité des contrastes de couleur
- [ ] Vérifier la cohérence visuelle sur toutes les pages
- [ ] Adapter les icônes et illustrations au style Orange
- [ ] Implémenter le mode sombre conforme à l'identité Orange
- [ ] Implémentre le menu de navigation avec ces élement :

 Reports

Order Form

Dashboard

Intervention Search

Locations

Notifications

QR & Barcodes

Shipments

Stock Alerts

Inventory Forecast

Stock Rotation

Inventory

Inventory Value

Tasks