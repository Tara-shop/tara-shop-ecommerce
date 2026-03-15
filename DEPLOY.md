# 🚀 Guide de Déploiement - Tara shopp sur GitHub et Vercel

## 📋 Prérequis

1. **Compte GitHub** : https://github.com/signup
2. **Compte Vercel** : https://vercel.com/signup
3. **Compte MongoDB Atlas** : https://www.mongodb.com/cloud/atlas/register

---

## 📦 ÉTAPE 1 : Créer MongoDB Atlas (Gratuit)

### 1.1 Créer un compte
- Allez sur https://www.mongodb.com/cloud/atlas/register
- Inscrivez-vous gratuitement
- Sélectionnez "FREE" (M0 Sandbox)

### 1.2 Créer un cluster
1. Cliquez sur "Build a Database"
2. Choisissez "FREE" (M0)
3. Sélectionnez une région proche (ex: Europe - Paris ou Belgique)
4. Nom du cluster : laissez par défaut ou "TaraShopp"
5. Cliquez "Create"

### 1.3 Configurer l'accès
1. **Database Access** :
   - Cliquez "Database Access" dans le menu
   - "Add New Database User"
   - Username : `tarashopp`
   - Password : **Notez-le bien !** (ex: MonMotDePasse123)
   - Rôle : "Read and write to any database"
   - Cliquez "Add User"

2. **Network Access** :
   - Cliquez "Network Access"
   - "Add IP Address"
   - Sélectionnez "Allow Access from Anywhere" (0.0.0.0/0)
   - Cliquez "Confirm"

### 1.4 Obtenir l'URL de connexion
1. Retournez à "Database"
2. Cliquez "Connect" sur votre cluster
3. Choisissez "Connect your application"
4. Copiez l'URL qui ressemble à :
   ```
   mongodb+srv://tarashopp:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
5. **IMPORTANT** : Remplacez `<password>` par votre mot de passe réel

---

## 🐙 ÉTAPE 2 : Pousser le code sur GitHub

### 2.1 Créer un dépôt GitHub
1. Allez sur https://github.com/new
2. Nom du dépôt : `tara-shopp-ecommerce`
3. Description : "Boutique e-commerce Tara shopp - Sénégal"
4. **Important** : Laissez en "Public" ou "Private" (votre choix)
5. **NE cochez PAS** "Add a README file"
6. Cliquez "Create repository"

### 2.2 Commandes Git (à exécuter dans votre terminal)

**Si vous êtes sur Emergent, utilisez ces commandes :**

```bash
# Se placer dans le dossier du projet
cd /app

# Initialiser Git (si pas déjà fait)
git init

# Ajouter tous les fichiers
git add .

# Créer le premier commit
git commit -m "Initial commit - Tara shopp e-commerce"

# Connecter au dépôt GitHub (remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub)
git remote add origin https://github.com/VOTRE_USERNAME/tara-shopp-ecommerce.git

# Pousser le code
git branch -M main
git push -u origin main
```

**Si Git demande vos identifiants** :
- Username : votre nom d'utilisateur GitHub
- Password : utilisez un **Personal Access Token** (voir section ci-dessous)

### 2.3 Créer un Personal Access Token GitHub (si nécessaire)
1. Allez sur https://github.com/settings/tokens
2. Cliquez "Generate new token" > "Generate new token (classic)"
3. Note : "Vercel Deploy"
4. Cochez : `repo` (tous les sous-items)
5. Cliquez "Generate token"
6. **COPIEZ LE TOKEN** (vous ne le reverrez plus !)
7. Utilisez ce token comme mot de passe lors du `git push`

---

## ☁️ ÉTAPE 3 : Déployer sur Vercel

### 3.1 Créer un compte Vercel
1. Allez sur https://vercel.com/signup
2. **Recommandé** : Connectez-vous avec GitHub (plus simple)
3. Autorisez Vercel à accéder à vos dépôts

### 3.2 Importer votre projet
1. Sur le dashboard Vercel, cliquez "Add New..." > "Project"
2. Importez votre dépôt `tara-shopp-ecommerce`
3. Vercel détectera automatiquement Next.js ✅

### 3.3 Configurer les variables d'environnement
**TRÈS IMPORTANT** - Ajoutez ces variables :

| Nom | Valeur |
|-----|--------|
| `MONGO_URL` | Votre URL MongoDB Atlas (celle copiée à l'étape 1.4) |
| `DB_NAME` | `senegal_ecommerce` |
| `CORS_ORIGINS` | `*` |

**Comment ajouter** :
1. Cliquez sur "Environment Variables"
2. Ajoutez chaque variable une par une
3. Cliquez "Add" après chaque variable

### 3.4 Déployer
1. Cliquez "Deploy" 🚀
2. Attendez 2-3 minutes
3. Votre site sera en ligne à : `https://tara-shopp-ecommerce.vercel.app` (ou un nom similaire)

---

## ✅ ÉTAPE 4 : Initialiser les données

Une fois déployé :

1. Allez sur votre site : `https://votre-site.vercel.app`
2. Ouvrez la console du navigateur (F12)
3. L'application initialisera automatiquement les 8 produits au premier chargement

Ou manuellement :
```bash
curl -X POST https://votre-site.vercel.app/api/init-data -H "Content-Type: application/json" -d '{}'
```

---

## 🎉 TERMINÉ !

Votre boutique est maintenant en ligne à :
- **Site principal** : `https://votre-site.vercel.app`
- **Admin** : `https://votre-site.vercel.app/admin`

---

## 🔄 Mises à jour futures

Pour mettre à jour votre site après des modifications :

```bash
git add .
git commit -m "Description des changements"
git push
```

Vercel redéploiera automatiquement ! ✨

---

## 📞 Support

Si vous rencontrez des problèmes :
1. Vérifiez les logs sur Vercel Dashboard
2. Vérifiez que MongoDB Atlas autorise toutes les IPs
3. Vérifiez que les variables d'environnement sont correctes

---

**Développé avec ❤️ pour Tara shopp - Sénégal 🇸🇳**
