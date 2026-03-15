# 📦 CODE PRÊT POUR GITHUB - Tara shopp

## ✅ Fichiers Préparés

Votre code est prêt à être déployé ! Voici la structure complète :

```
/app/
├── app/
│   ├── admin/page.js          # Admin dashboard
│   ├── api/[[...path]]/route.js  # Backend API
│   ├── layout.js              # Layout principal
│   ├── page.js                # Page d'accueil (boutique)
│   └── globals.css            # Styles globaux
├── components/ui/             # Composants shadcn/ui
├── lib/utils.js               # Utilitaires
├── .env.example               # Variables d'environnement (exemple)
├── .gitignore                 # Fichiers à ignorer
├── package.json               # Dépendances
├── vercel.json                # Configuration Vercel
├── README.md                  # Documentation
├── DEPLOY.md                  # Guide de déploiement complet
└── deploy.sh                  # Script de déploiement
```

---

## 🚀 DÉPLOIEMENT RAPIDE (3 étapes)

### 1️⃣ Créer MongoDB Atlas (5 min)
- Allez sur https://mongodb.com/cloud/atlas
- Créez un compte gratuit
- Créez un cluster M0 (gratuit)
- Copiez votre URL de connexion

### 2️⃣ Pousser sur GitHub (2 min)

**Option A - Interface GitHub :**
1. Allez sur https://github.com/new
2. Créez un dépôt : `tara-shopp-ecommerce`
3. Téléchargez TOUT le dossier `/app`
4. Uploadez-le sur GitHub via l'interface web

**Option B - Ligne de commande :**
```bash
cd /app
git init
git add .
git commit -m "Initial commit - Tara shopp"
git remote add origin https://github.com/VOTRE_USERNAME/tara-shopp-ecommerce.git
git branch -M main
git push -u origin main
```

### 3️⃣ Déployer sur Vercel (3 min)
1. Allez sur https://vercel.com
2. Cliquez "New Project"
3. Importez votre dépôt GitHub
4. Ajoutez les variables d'environnement :
   - `MONGO_URL` = votre URL MongoDB Atlas
   - `DB_NAME` = `senegal_ecommerce`
   - `CORS_ORIGINS` = `*`
5. Cliquez "Deploy" 🚀

---

## 📋 Variables d'Environnement Vercel

```env
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
DB_NAME=senegal_ecommerce
CORS_ORIGINS=*
```

---

## 📖 Documentation Complète

Pour un guide détaillé étape par étape, consultez **DEPLOY.md**

---

## 🎯 Après le Déploiement

Votre site sera accessible à :
- **Boutique** : `https://votre-site.vercel.app`
- **Admin** : `https://votre-site.vercel.app/admin`

Les 8 produits s'initialiseront automatiquement au premier chargement.

---

## 💡 Conseils

- ✅ Utilisez MongoDB Atlas (gratuit)
- ✅ Connectez Vercel avec GitHub pour déploiement automatique
- ✅ Ne committez JAMAIS le fichier `.env` (déjà dans .gitignore)
- ✅ Utilisez `.env.example` comme modèle

---

## 🆘 Besoin d'Aide ?

Consultez DEPLOY.md pour :
- Guide complet MongoDB Atlas
- Instructions GitHub détaillées
- Configuration Vercel pas à pas
- Résolution des problèmes courants

---

**Tara shopp - Bienvenue chez vous 🇸🇳**
