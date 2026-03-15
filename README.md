# 🏪 Boutique E-commerce Sénégal

Plateforme e-commerce optimisée pour le marché sénégalais, avec support des méthodes de paiement locales (Wave, Orange Money, Cash on Delivery).

## 🌟 Fonctionnalités

### Interface Client
- **Catalogue de produits** : Meubles de salon, bureau, armoires, électroménager
- **Filtres par catégorie** : Tous, Salon, Bureau, Rangement, Électroménager
- **Panier d'achat** : Persistance avec localStorage
- **Gestion des quantités** : Augmenter/diminuer depuis le panier

### Processus de Checkout (PRIORITÉ)
- **Formulaire complet** :
  - Prénom et Nom (obligatoires)
  - Téléphone (obligatoire - format sénégalais)
  - Quartier/Ville (14 localisations au Sénégal : Dakar, Pikine, Thiès, etc.)
  
- **3 Options de Paiement** :
  - 💳 **Wave** (simulation)
  - 📱 **Orange Money** (simulation)
  - 💵 **Paiement à la livraison** (Cash on Delivery)

- **Récapitulatif de commande** avec total en FCFA
- **Page de confirmation** avec détails de livraison

### Admin Dashboard
- **Gestion des produits** : Ajouter, modifier, supprimer
- **Vue des commandes** : Liste avec statuts et détails
- **Interface simple** : Navigation par onglets

## 💰 Devise

Tous les prix sont affichés en **FCFA** (Franc CFA).

## 📱 Design

- **Mobile-first** : Optimisé pour les écrans mobiles
- **Responsive** : S'adapte à tous les formats
- **Images optimisées** : Lazy loading pour connexion 4G
- **Chargement rapide** : Minimisation des requêtes

## 🛠️ Technologies

- **Framework** : Next.js 14
- **Styling** : Tailwind CSS + shadcn/ui
- **Base de données** : MongoDB
- **Icônes** : Lucide React

## 🚀 Accès

- **Boutique** : https://nextjs-senegal.preview.emergentagent.com
- **Admin Dashboard** : https://nextjs-senegal.preview.emergentagent.com/admin

## 📊 Produits Initiaux

L'application est pré-remplie avec 8 produits exemples :
- Canapé 5 places moderne (350 000 FCFA)
- Table basse en bois (75 000 FCFA)
- Bureau professionnel (125 000 FCFA)
- Chaise de bureau ergonomique (65 000 FCFA)
- Armoire en plastique 4 portes (45 000 FCFA)
- Réfrigérateur 250L (285 000 FCFA)
- Ventilateur sur pied (35 000 FCFA)
- Cuisinière 4 feux (175 000 FCFA)

## 🔧 API Endpoints

### Produits
- `GET /api/products` - Liste tous les produits
- `POST /api/products` - Ajouter un produit (admin)
- `PUT /api/products/:id` - Modifier un produit (admin)
- `DELETE /api/products/:id` - Supprimer un produit (admin)

### Commandes
- `POST /api/orders` - Créer une commande
- `GET /api/orders` - Liste toutes les commandes (admin)

### Initialisation
- `POST /api/init-data` - Initialiser les produits exemples

## 📝 Notes

- Les paiements Wave et Orange Money sont **simulés** pour le moment
- Aucune clé API n'est requise pour tester l'application
- Le panier est sauvegardé dans le navigateur (localStorage)
- L'admin dashboard n'a pas d'authentification (à ajouter en production)

## 🎯 Prochaines Étapes

Pour intégrer les vraies API de paiement :
1. Obtenir les clés API Wave et Orange Money
2. Implémenter les webhooks de paiement
3. Ajouter la gestion des statuts de paiement
4. Mettre en place l'authentification admin
5. Ajouter un système de notifications par SMS

## ✅ Testé et Fonctionnel

- ✅ Affichage des produits (desktop et mobile)
- ✅ Ajout/retrait du panier
- ✅ Processus de checkout complet
- ✅ Création de commandes
- ✅ Gestion des produits (admin)
- ✅ Vue des commandes (admin)
- ✅ Design responsive mobile-first

---

Développé pour le marché sénégalais 🇸🇳
