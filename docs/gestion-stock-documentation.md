# Documentation - Application de Gestion de Stock avec les Composants React

## Table des matières

1. [Introduction](#introduction)
2. [Composants Recommandés](#composants-recommandés)
3. [Mode Clair/Sombre](#mode-clairsombre)
4. [Personnalisation aux Couleurs Orange](#personnalisation-aux-couleurs-orange)
5. [Architecture Recommandée](#architecture-recommandée)

## Introduction

Cette documentation présente une analyse des composants React disponibles dans le projet et propose une stratégie pour les utiliser afin de créer une application complète de gestion de stock. Le projet contient de nombreux composants UI réutilisables construits avec React, Next.js, Tailwind CSS et shadcn/ui qui peuvent être adaptés pour répondre aux besoins spécifiques d'un système de gestion de stock.

## Composants Recommandés

Après analyse du projet, voici les composants qui seront les plus utiles pour notre application de gestion de stock :

### 1. Composants pour la structure générale

- **Layout** : En tant que conteneur principal, permettant une disposition cohérente sur toutes les pages
- **Sidebar** (`components/ui/sidebar.tsx`) : Pour la navigation principale
- **Navigation Menu** (`components/ui/navigation-menu.tsx`) : Pour organiser la navigation entre les différentes sections

### 2. Composants pour l'affichage des données d'inventaire

- **Table** (`components/ui/table.tsx`) : Élément essentiel pour afficher les listes de produits, les mouvements de stock, etc.
- **VaultTable** (`components/vault-table.tsx`) : Peut être adapté pour afficher les articles en stock avec priorité, statut, etc.
- **Card** (`components/ui/card.tsx`) : Pour afficher des informations détaillées sur les produits

### 3. Composants pour les tableaux de bord et statistiques

- **MetricsCard** (`components/metrics-card.tsx`) : Parfait pour afficher des indicateurs clés comme:
  - Nombre total d'articles en stock
  - Valeur totale de l'inventaire
  - Articles en rupture de stock
  - Articles à commander
- **StatsChart** (`components/stats-chart.tsx`) : Pour visualiser les tendances et les statistiques (entrées/sorties de stock, évolution des stocks)
- **Chart** (`components/ui/chart.tsx`) : Pour des visualisations de données personnalisées

### 4. Composants pour la saisie et la manipulation des données

- **Form** (`components/ui/form.tsx`) : Pour créer des formulaires de saisie d'articles, d'entrées/sorties de stock
- **Input** (`components/ui/input.tsx`) : Pour les champs de saisie
- **Select** (`components/ui/select.tsx`) : Pour les listes déroulantes (catégories de produits, fournisseurs, etc.)
- **Button** (`components/ui/button.tsx`) : Pour les actions (ajouter, modifier, supprimer)
- **Dialog/Modal** (`components/ui/dialog.tsx`) : Pour les confirmations et les formulaires contextuels
- **Alert** (`components/ui/alert.tsx`) : Pour les notifications importantes (rupture de stock, seuil minimum atteint)

### 5. Composants pour la recherche et le filtrage

- **Command** (`components/ui/command.tsx`) : Pour une recherche rapide dans l'inventaire
- **Filter** (à implémenter) : Pour filtrer les articles par catégorie, statut, etc.

## Mode Clair/Sombre

Le projet intègre déjà un système de gestion du mode clair/sombre via `next-themes`. La configuration est présente dans:

- `components/theme-provider.tsx` : Fournit le contexte de thème à l'application
- Le composant utilise `next-themes` qui facilite la gestion du thème

Pour activer complètement le mode clair/sombre dans notre application de gestion de stock:

1. **Inclure le ThemeProvider dans le layout principal**:

```tsx
// Dans app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider"

export default function RootLayout({ children }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
```

2. **Ajouter un bouton de basculement de thème**:

```tsx
// Créer un composant ThemeToggle.tsx
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
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
```

## Personnalisation aux Couleurs Orange

Pour personnaliser l'application selon l'identité visuelle d'Orange:

### 1. Configuration des couleurs dans Tailwind

Modifiez le fichier `tailwind.config.ts` pour intégrer les couleurs d'Orange:

```typescript
import type { Config } from "tailwindcss"

const config: Config = {
  // ...
  theme: {
    extend: {
      colors: {
        // Palette de couleurs Orange
        orange: {
          DEFAULT: "#FF7900",  // Orange principal
          50: "#FFF1E6",
          100: "#FFE8D9",
          200: "#FFD1B3",
          300: "#FFBA8C",
          400: "#FFA366",
          500: "#FF7900",  // Orange principal
          600: "#CC6100",
          700: "#994900",
          800: "#663000",
          900: "#331800",
        },
        // Couleurs complémentaires
        black: "#000000",
        white: "#FFFFFF",
        grey: {
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
      // Personnalisation des thèmes clair/sombre
      borderRadius: {
        lg: "0.5rem",
        md: "calc(0.5rem - 2px)",
        sm: "calc(0.5rem - 4px)",
      },
    },
  },
  // ...
}

export default config
```

### 2. Création d'un thème personnalisé

Créer un fichier `styles/theme.css` pour définir les variables CSS des thèmes:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 0 0% 3.9%;
  
  --primary: 25 100% 50%;  /* Orange principal */
  --primary-foreground: 0 0% 98%;
  
  --secondary: 0 0% 96.1%;
  --secondary-foreground: 0 0% 9%;
  
  --muted: 0 0% 96.1%;
  --muted-foreground: 0 0% 45.1%;
  
  --accent: 0 0% 96.1%;
  --accent-foreground: 0 0% 9%;
  
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 89.8%;
  --input: 0 0% 89.8%;
  --ring: 25 100% 50%;  /* Orange principal */
  
  --radius: 0.5rem;
}

.dark {
  --background: 0 0% 3.9%;
  --foreground: 0 0% 98%;
  
  --primary: 25 100% 50%;  /* Orange principal */
  --primary-foreground: 0 0% 98%;
  
  --secondary: 0 0% 14.9%;
  --secondary-foreground: 0 0% 98%;
  
  --muted: 0 0% 14.9%;
  --muted-foreground: 0 0% 63.9%;
  
  --accent: 0 0% 14.9%;
  --accent-foreground: 0 0% 98%;
  
  --destructive: 0 62.8% 30.6%;
  --destructive-foreground: 0 0% 98%;
  
  --border: 0 0% 14.9%;
  --input: 0 0% 14.9%;
  --ring: 25 100% 50%;  /* Orange principal */
}
```

### 3. Personnalisation du Logo et des Images

- Remplacer les icônes et logos par ceux d'Orange
- Utiliser le logo Orange en SVG dans les composants d'en-tête
- Appliquer la typographie officielle d'Orange (si disponible via Google Fonts ou en l'important)

## Architecture Recommandée

Pour une application de gestion de stock efficace, nous recommandons l'architecture suivante:

### Structure des dossiers

```
app/
├── api/                  # Routes API pour le backend
│   ├── auth/             # Authentification
│   ├── products/         # API pour les produits
│   ├── inventory/        # API pour les mouvements de stock
│   └── reports/          # API pour les rapports
├── (auth)/               # Pages protégées (nécessitant authentification)
│   ├── dashboard/        # Tableau de bord principal
│   ├── products/         # Gestion des produits
│   ├── inventory/        # Mouvements de stock (entrées/sorties)
│   ├── suppliers/        # Gestion des fournisseurs
│   └── reports/          # Rapports et statistiques
└── layout.tsx            # Layout principal avec ThemeProvider

components/
├── dashboard/            # Composants spécifiques au tableau de bord
├── products/             # Composants pour la gestion des produits
│   ├── product-form.tsx  # Formulaire de produit
│   ├── product-list.tsx  # Liste des produits
│   └── product-card.tsx  # Carte de produit
├── inventory/            # Composants pour la gestion du stock
├── reports/              # Composants pour les rapports
└── ui/                   # Composants UI génériques (déjà présents)

lib/
├── api/                  # Fonctions d'appel API
├── utils/                # Utilitaires
└── hooks/                # Hooks personnalisés

types/                    # Types TypeScript
```

### Pages principales à implémenter

1. **Tableau de bord** - Vue d'ensemble:
   - Indicateurs clés (KPIs)
   - Produits à réapprovisionner
   - Derniers mouvements de stock

2. **Gestion des produits**:
   - Liste des produits
   - Ajout/modification de produit
   - Détails du produit

3. **Gestion des stocks**:
   - Entrées de stock
   - Sorties de stock
   - Historique des mouvements

4. **Fournisseurs**:
   - Liste des fournisseurs
   - Détails des fournisseurs

5. **Rapports et statistiques**:
   - Valeur du stock
   - Rotation des stocks
   - Produits les plus demandés

Cette architecture permet d'exploiter pleinement les composants existants tout en organisant le code de manière modulaire et maintenable.
