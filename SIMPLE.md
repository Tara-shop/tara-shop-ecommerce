# 🚀 DÉPLOIEMENT SIMPLE - 3 ÉTAPES

## ÉTAPE 1 : MONGODB (Base de données gratuite)

### A. Créer un compte
1. Allez ici : https://mongodb.com/cloud/atlas/register
2. Cliquez sur "Sign Up"
3. Remplissez vos informations

### B. Créer une base de données
1. Cliquez sur "Build a Database"
2. Choisissez "FREE" (M0)
3. Cliquez "Create"
4. Attendez 3 minutes

### C. Créer un utilisateur
1. Vous verrez "Username" et "Password"
2. Notez bien le mot de passe !
3. Cliquez "Create User"

### D. Autoriser l'accès
1. Cliquez "Network Access" (menu gauche)
2. Cliquez "Add IP Address"
3. Cliquez "Allow Access from Anywhere"
4. Cliquez "Confirm"

### E. Copier l'URL
1. Cliquez "Database" (menu gauche)
2. Cliquez "Connect"
3. Cliquez "Drivers"
4. COPIEZ l'URL qui ressemble à ça :
   ```
   mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/
   ```
5. **IMPORTANT** : Remplacez `<password>` par votre vrai mot de passe

📝 GARDEZ CETTE URL PRÉCIEUSEMENT !

---

## ÉTAPE 2 : GITHUB

### A. Créer un compte
1. Allez ici : https://github.com/signup
2. Créez votre compte

### B. Créer un dépôt
1. Allez ici : https://github.com/new
2. Nom du dépôt : `tara-shopp`
3. Laissez tout par défaut
4. Cliquez "Create repository"

### C. Copier ces commandes

Ouvrez un terminal et copiez ces commandes UNE PAR UNE :

```bash
cd /app
```

```bash
git init
```

```bash
git add .
```

```bash
git commit -m "Mon site Tara shopp"
```

**⚠️ REMPLACEZ "VOTRE_USERNAME" PAR VOTRE NOM GITHUB !**

Par exemple, si votre nom GitHub est "amadou123", écrivez :
```bash
git remote add origin https://github.com/amadou123/tara-shopp.git
```

Votre commande :
```bash
git remote add origin https://github.com/VOTRE_USERNAME/tara-shopp.git
```

```bash
git branch -M main
```

```bash
git push -u origin main
```

**Si ça demande un mot de passe** :
- Nom d'utilisateur : votre nom GitHub
- Mot de passe : créez un token ici → https://github.com/settings/tokens/new
  - Cochez "repo"
  - Cliquez "Generate token"
  - Copiez le token
  - Collez comme mot de passe

---

## ÉTAPE 3 : VERCEL (Mettre en ligne)

### A. Créer un compte
1. Allez ici : https://vercel.com/signup
2. Cliquez "Continue with GitHub"
3. Autorisez Vercel

### B. Déployer
1. Cliquez "Add New Project"
2. Trouvez "tara-shopp" dans la liste
3. Cliquez "Import"

### C. Ajouter les variables

Cliquez sur "Environment Variables"

Ajoutez ces 3 variables :

**Variable 1 :**
- Name : `MONGO_URL`
- Value : COLLEZ VOTRE URL MONGODB (celle de l'étape 1)

**Variable 2 :**
- Name : `DB_NAME`
- Value : `senegal_ecommerce`

**Variable 3 :**
- Name : `CORS_ORIGINS`
- Value : `*`

### D. Déployer
1. Cliquez "Deploy"
2. Attendez 3 minutes
3. ✅ VOTRE SITE EST EN LIGNE !

---

## ✅ C'EST FINI !

Votre site sera à :
👉 https://tara-shopp.vercel.app (ou un nom similaire)

Admin :
👉 https://tara-shopp.vercel.app/admin

---

## 🆘 PROBLÈME ?

**MongoDB demande carte bancaire ?**
- Non, cliquez juste "Skip" ou "Maybe later"

**Git demande mot de passe ?**
- Créez un token : https://github.com/settings/tokens/new
- Cochez "repo"
- Utilisez le token comme mot de passe

**Vercel ne trouve pas mon dépôt ?**
- Reconnectez GitHub dans les settings Vercel

---

C'EST TOUT ! 🎉
