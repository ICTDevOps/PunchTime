# PunchTime - Réservation de cours de boxe

Application web moderne pour la réservation de cours de boxe avec partage équitable des coûts entre participants.

## 🥊 Fonctionnalités

### Pour les participants
- **Inscription simple** : Pas besoin de créer un compte, juste un nom/surnom
- **Coût partagé** : Le prix du cours est divisé équitablement entre tous les participants
- **Transparence** : Voir qui participe et combien chacun doit payer
- **Interface intuitive** : Design moderne et responsive

### Pour les administrateurs
- **Gestion des cours** : Créer, modifier et supprimer des cours
- **Suivi des inscriptions** : Vue d'ensemble de tous les participants
- **Statistiques** : Coûts par personne, nombre de participants, etc.

## 🛠️ Technologies utilisées

- **React 18** avec TypeScript
- **React Router** pour la navigation
- **Zustand** pour la gestion d'état
- **Tailwind CSS** pour le styling
- **Lucide React** pour les icônes
- **Vite** pour le développement et le build

## 🚀 Installation et démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation
```bash
# Cloner le repository
git clone https://github.com/ICTDevOps/punchtime-boxing-reservation.git
cd punchtime-boxing-reservation

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run dev
```

L'application sera accessible sur `http://localhost:3000`

## 📦 Scripts disponibles

```bash
# Développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting
npm run lint
```

## 🏗️ Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── CourseCard.tsx
│   ├── ParticipantsList.tsx
│   └── RegistrationModal.tsx
├── pages/              # Pages principales
│   ├── HomePage.tsx
│   ├── CourseDetailPage.tsx
│   └── AdminPage.tsx
├── store/              # Gestion d'état Zustand
│   └── useStore.ts
├── types/              # Types TypeScript
│   └── index.ts
├── data/               # Données de démonstration
│   └── mockData.ts
├── App.tsx             # Composant principal
├── main.tsx            # Point d'entrée
└── index.css           # Styles globaux
```

## 💡 Comment ça marche

1. **Création de cours** : Un admin crée un cours avec un prix fixe
2. **Inscription** : Les participants s'inscrivent avec leur nom
3. **Calcul automatique** : Le coût est divisé par le nombre de participants
4. **Mise à jour temps réel** : Plus il y a de participants, moins chacun paie !

### Exemple
- Cours de boxe : 60€
- 3 participants → 20€ par personne
- 4 participants → 15€ par personne
- 6 participants → 10€ par personne

## 🎨 Design

L'application utilise un thème inspiré de la boxe avec :
- Couleurs principales : Rouge (#DC2626) et noir
- Design moderne et épuré
- Interface responsive (mobile-first)
- Icônes cohérentes avec Lucide React

## 📱 Pages

### Page d'accueil
- Liste de tous les cours disponibles
- Informations essentielles (date, heure, prix, participants)
- Accès rapide à l'inscription

### Page de détails du cours
- Informations complètes du cours
- Liste des participants inscrits
- Bouton d'inscription
- Calcul du coût en temps réel

### Page d'administration
- Vue d'ensemble de tous les cours
- Création/modification/suppression de cours
- Gestion des participants
- Statistiques détaillées

## 💾 Stockage

L'application utilise le localStorage du navigateur pour persister les données :
- Cours créés
- Inscriptions des participants
- Modifications administratives

## 🚀 Déploiement

Le projet est configuré pour être déployé sur Azure Static Web Apps :

```bash
# Build de production
npm run build

# Le dossier dist/ contient les fichiers à déployer
```

## 🔧 Configuration

### Vite
- Configuration optimisée pour React + TypeScript
- Hot reload en développement
- Build optimisé pour la production

### Tailwind CSS
- Configuration personnalisée avec couleurs de thème
- Classes utilitaires pour un développement rapide
- Responsive design intégré

## 📄 Licence

Ce projet est privé et destiné à un usage personnel.

## 🤝 Contribution

Pour contribuer au projet :
1. Créer une branche feature
2. Faire les modifications
3. Tester localement
4. Créer une pull request

---

Développé avec ❤️ pour la communauté de boxe
