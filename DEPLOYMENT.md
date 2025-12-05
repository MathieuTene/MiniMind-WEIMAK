# Guide de déploiement sur Render

## Prérequis

1. Un compte Render (gratuit) : https://render.com
2. Votre code poussé sur GitHub, GitLab ou Bitbucket
3. Votre clé API Google (GOOGLE_API_KEY)

## Étapes de configuration sur Render

### Option 1 : Déploiement automatique avec render.yaml (Recommandé)

1. **Connecter votre dépôt**
   - Allez sur https://dashboard.render.com
   - Cliquez sur "New +" → "Blueprint"
   - Connectez votre dépôt GitHub/GitLab/Bitbucket
   - Render détectera automatiquement le fichier `render.yaml`
   - Cliquez sur "Apply"

2. **Configurer les variables d'environnement**
   - Dans le dashboard Render, allez dans votre service
   - Allez dans l'onglet "Environment"
   - Ajoutez la variable :
     - **Key**: `GOOGLE_API_KEY`
     - **Value**: Votre clé API Google
   - Cliquez sur "Save Changes"

3. **Déployer**
   - Render commencera automatiquement le build
   - Vous pouvez suivre les logs en temps réel
   - Une fois terminé, votre site sera accessible sur `https://votre-service.onrender.com`

### Option 2 : Déploiement manuel

1. **Créer un nouveau service**
   - Allez sur https://dashboard.render.com
   - Cliquez sur "New +" → "Web Service"
   - Connectez votre dépôt GitHub/GitLab/Bitbucket

2. **Configurer le service**
   - **Name**: `minimind-weimak` (ou le nom de votre choix)
   - **Region**: `Frankfurt` (ou la région la plus proche)
   - **Branch**: `main` (ou votre branche principale)
   - **Root Directory**: `.` (laisser vide)
   - **Environment**: Sélectionnez `Docker`
   - **Dockerfile Path**: `./Dockerfile`
   - **Docker Context**: `.`
   - **Plan**: `Free` (ou un plan payant si nécessaire)

3. **Variables d'environnement**
   - Cliquez sur "Advanced" → "Add Environment Variable"
   - Ajoutez :
     - **Key**: `GOOGLE_API_KEY`
     - **Value**: Votre clé API Google
   - Ajoutez aussi (optionnel mais recommandé) :
     - **Key**: `NODE_ENV`
     - **Value**: `production`
     - **Key**: `PORT`
     - **Value**: `3000`

4. **Déployer**
   - Cliquez sur "Create Web Service"
   - Render commencera à construire votre image Docker
   - Le premier déploiement peut prendre 5-10 minutes
   - Une fois terminé, votre site sera accessible

## Configuration du port

Render définit automatiquement la variable `PORT`. Le Dockerfile est déjà configuré pour utiliser cette variable.

## Vérification

Une fois déployé, vous pouvez :
- Voir les logs en temps réel dans l'onglet "Logs"
- Tester votre application sur l'URL fournie
- Vérifier que les routes API fonctionnent correctement

## Notes importantes

- Le plan gratuit met votre service en veille après 15 minutes d'inactivité
- Le premier démarrage après veille peut prendre 30-60 secondes
- Pour éviter la veille, vous pouvez utiliser un service de monitoring externe
- Les variables d'environnement sont sécurisées et ne sont pas visibles publiquement

## Dépannage

### Le build échoue
- Vérifiez les logs dans l'onglet "Logs"
- Assurez-vous que `GOOGLE_API_KEY` est bien configurée
- Vérifiez que le Dockerfile est présent à la racine du projet

### L'application ne démarre pas
- Vérifiez que le port est bien configuré (3000)
- Consultez les logs pour voir les erreurs
- Vérifiez que toutes les variables d'environnement sont définies

### Erreur 502 Bad Gateway
- Attendez quelques secondes (le service peut être en train de démarrer)
- Vérifiez les logs pour plus de détails
- Assurez-vous que l'application écoute sur `0.0.0.0` (déjà configuré dans le Dockerfile)

