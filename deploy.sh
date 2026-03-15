#!/bin/bash

# 🚀 Script de déploiement rapide pour Tara shopp
# Ce fichier contient toutes les commandes pour pousser sur GitHub

echo "📦 Préparation du déploiement Tara shopp..."

# 1. Initialiser Git (si pas déjà fait)
git init

# 2. Configurer votre identité Git (remplacez par vos informations)
# git config --global user.name "Votre Nom"
# git config --global user.email "votre.email@example.com"

# 3. Ajouter tous les fichiers
git add .

# 4. Créer le commit initial
git commit -m "Initial commit - Tara shopp e-commerce Sénégal"

# 5. Connecter au dépôt GitHub
# ⚠️ IMPORTANT : Remplacez VOTRE_USERNAME par votre nom d'utilisateur GitHub
# git remote add origin https://github.com/VOTRE_USERNAME/tara-shopp-ecommerce.git

# 6. Pousser le code
# git branch -M main
# git push -u origin main

echo "✅ Préparation terminée !"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Créez un dépôt sur GitHub : https://github.com/new"
echo "2. Décommentez et modifiez les lignes avec VOTRE_USERNAME"
echo "3. Exécutez les commandes git remote, branch et push"
echo ""
echo "📖 Consultez DEPLOY.md pour le guide complet"
