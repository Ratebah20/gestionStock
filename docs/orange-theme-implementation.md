# Implémentation du Thème Orange

Ce document décrit l'implémentation de l'identité visuelle Orange dans l'application de gestion de stock.

## Composants Intégrés

### 1. Configuration des Couleurs

- **Palette de couleurs Orange** : Intégrée dans `tailwind.config.ts`
- **Variables CSS** : Définies dans `styles/theme-orange.css` pour les modes clair et sombre
- **Importation** : Les styles Orange sont importés dans `globals.css`

### 2. Composants UI Orange

- **OrangeButton** : Bouton personnalisé avec la palette de couleurs Orange
- **OrangeHeader** : En-tête avec le logo Orange et les couleurs de la marque
- **OrangeSidebar** : Barre latérale de navigation avec les liens pertinents
- **ThemeToggle** : Sélecteur de thème clair/sombre
- **MetricsCard** : Cartes de métriques avec le style Orange

### 3. Pages Démonstratives

- **Page d'accueil (/)** : Présentation des fonctionnalités de l'application
- **Dashboard (/dashboard)** : Tableau de bord avec des statistiques et des données

## Guide d'Utilisation

### Utilisation des Boutons Orange

```jsx
import { OrangeButton } from "@/components/ui/orange-button"

// Bouton Orange par défaut
<OrangeButton>Texte du bouton</OrangeButton>

// Variantes
<OrangeButton variant="outline">Variante Outline</OrangeButton>
<OrangeButton variant="ghost">Variante Ghost</OrangeButton>
<OrangeButton variant="link">Variante Link</OrangeButton>

// Tailles
<OrangeButton size="sm">Petit</OrangeButton>
<OrangeButton size="default">Standard</OrangeButton>
<OrangeButton size="lg">Grand</OrangeButton>
<OrangeButton size="icon"><Icon /></OrangeButton>
```

### Structure des Pages

Pour respecter l'identité Orange, utilisez la structure suivante pour vos pages :

```jsx
import { OrangeHeader } from "@/components/orange-header"
import { OrangeSidebar } from "@/components/orange-sidebar"

export default function MaPage() {
  return (
    <div className="min-h-screen bg-background">
      <OrangeHeader />
      
      <div className="flex">
        <OrangeSidebar />
        
        <main className="flex-1 p-8">
          {/* Contenu de la page */}
        </main>
      </div>
    </div>
  )
}
```

### Utilisation des Couleurs Orange

- `text-orange-brand` : Texte avec la couleur principale Orange
- `bg-orange-500` : Fond avec la couleur principale Orange
- `border-orange-100` : Bordure légère pour les cartes et conteneurs
- `hover:bg-orange-50` : Effet de survol subtil

## Bonnes Pratiques

1. **Utilisation du Orange** : Réservez la couleur orange pour les éléments d'action principaux et les points focaux
2. **Espacement** : Utilisez des espacements cohérents (multiples de 4px)
3. **Mode sombre** : Testez toujours vos composants en mode clair et sombre
4. **Accessibilité** : Assurez-vous d'un contraste suffisant pour tous les textes

## Prochaines Étapes

- [ ] Créer d'autres pages spécifiques (Inventory, Products, etc.)
- [ ] Développer des composants de formulaire avec le style Orange
- [ ] Ajouter des animations subtiles pour améliorer l'UX
- [ ] Optimiser les performances du thème sur mobile
