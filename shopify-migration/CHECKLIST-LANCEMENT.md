# Checklist de lancement Celestiar sur Shopify

Boutique : https://bys-user-store-938300-ctzwc00n.myshopify.com

Utilisez cette checklist dans l'ordre. Ne publiez le thème qu'à la toute fin.

## 0. Préparer les fichiers

- [ ] Télécharger `celestiar-shopify-theme.zip`
- [ ] Télécharger `produits-celestiar.csv`
- [ ] Garder ce guide ouvert pendant l'installation
- [ ] Se connecter à Shopify Admin : https://bys-user-store-938300-ctzwc00n.myshopify.com/admin

## 1. Importer le thème sans le publier

- [ ] Aller dans Boutique en ligne → Thèmes
- [ ] Cliquer sur Ajouter un thème → Importer un fichier ZIP
- [ ] Choisir `celestiar-shopify-theme.zip`
- [ ] Attendre la fin de l'import
- [ ] Cliquer sur les trois points du thème importé → Aperçu
- [ ] Vérifier que l'accueil Celestiar s'affiche avec les étoiles, les mockups et les 5 affiches
- [ ] Ne pas cliquer sur Publier pour le moment

Si l'aperçu est cassé ou vide : arrêter ici et me signaler le message d'erreur exact.

## 2. Importer les 5 produits

- [ ] Aller dans Produits → Importer
- [ ] Choisir `produits-celestiar.csv`
- [ ] Lancer l'import et attendre l'e-mail ou la confirmation Shopify
- [ ] Ouvrir Produits et vérifier que les 5 produits existent :
  - [ ] Aurore Boréale — handle `aurore-boreale`
  - [ ] Nuages Roses — handle `nuages-roses`
  - [ ] Étoiles Célestes — handle `etoiles-celestes`
  - [ ] Voie Lactée — handle `voie-lactee`
  - [ ] Étoiles Filantes — handle `etoiles-filantes`
- [ ] Ouvrir chaque produit et vérifier les options :
  - [ ] Option 1 : Taille
  - [ ] Option 2 : Cadre
  - [ ] 18 variantes par produit
- [ ] Vérifier les prix de base : 59,90 € / 74,90 € / 89,90 € / 124,90 € / 154,90 € / 189,90 €
- [ ] Vérifier que Chêne ajoute 7,90 €
- [ ] Ajouter l'image correspondante à chaque produit :
  - [ ] `poster-aurore.jpg`
  - [ ] `poster-nuages.jpg`
  - [ ] `poster-etoiles-celestes.jpg`
  - [ ] `poster-voie-lactee.jpg`
  - [ ] `poster-etoiles.jpg`

Important : ne changez pas les handles produits, sinon le thème ne pourra pas associer automatiquement les bons visuels.

## 3. Créer les pages nécessaires

Pour chaque page : Boutique en ligne → Pages → Ajouter une page → choisir le modèle dans la colonne de droite.

- [ ] Créer la page `FAQ`
  - Handle : `faq`
  - Modèle : `page.faq`
- [ ] Créer la page `Suivi`
  - Handle : `suivi`
  - Modèle : `page.suivi`
- [ ] Créer la page `À propos`
  - Handle : `a-propos`
  - Modèle : `page.a-propos`
- [ ] Enregistrer chaque page
- [ ] Dans l'aperçu du thème, cliquer sur les liens FAQ, Suivi et À propos du menu

## 4. Activer Shopify Payments

- [ ] Aller dans Paramètres → Paiements
- [ ] Cliquer sur Activer Shopify Payments
- [ ] Compléter les informations de l'entreprise et du responsable
- [ ] Ajouter le compte bancaire de réception des paiements
- [ ] Activer les cartes bancaires souhaitées
- [ ] Activer Apple Pay si souhaité
- [ ] Activer PayPal si souhaité
- [ ] Garder le mode test activé jusqu'à la commande de validation

Shopify demandera les informations légales et bancaires directement dans son interface sécurisée. Ne les envoyez pas dans le chat.

## 5. Configurer la TVA et les prix TTC

- [ ] Aller dans Paramètres → Taxes et droits
- [ ] Vérifier la France comme marché principal
- [ ] Vérifier que la TVA française est à 20 %
- [ ] Activer l'option pour inclure la taxe dans les prix si Shopify la propose pour votre configuration
- [ ] Ouvrir un produit et vérifier que le prix affiché reste bien le prix TTC prévu

Exemple de contrôle : 30 × 40 cm + Noir = 89,90 € TTC ; 60 × 90 cm + Chêne = 197,80 € TTC.

## 6. Configurer la livraison offerte

- [ ] Aller dans Paramètres → Expédition et livraison
- [ ] Ouvrir le profil d'expédition général
- [ ] Créer ou modifier la zone France
- [ ] Ajouter un tarif à 0 € nommé `Livraison suivie offerte`
- [ ] Ajouter les autres pays uniquement si vous voulez y livrer
- [ ] Supprimer ou désactiver tout tarif payant de test

## 7. Tester la personnalisation

Dans l'aperçu du thème :

- [ ] Ouvrir Aurore Boréale
- [ ] Saisir `MARIE-CHARLOTTE-ANNE` dans Prénom
- [ ] Vérifier que le prénom reste dans l'affiche
- [ ] Saisir une date, une heure, une ville et une phrase
- [ ] Choisir 60 × 90 cm
- [ ] Choisir Chêne
- [ ] Vérifier le prix : 197,80 € TTC
- [ ] Cocher la case de vérification d'orthographe
- [ ] Ajouter au panier
- [ ] Vérifier que le panier affiche Prénom, Date, Heure, Ville, Phrase et Orthographe vérifiée

## 8. Passer une commande test

- [ ] Garder Shopify Payments en mode test
- [ ] Ajouter une affiche au panier
- [ ] Passer au paiement Shopify
- [ ] Utiliser les identifiants de test proposés par Shopify
- [ ] Vérifier que la commande arrive dans Shopify Admin → Commandes
- [ ] Ouvrir la commande et vérifier les propriétés de personnalisation
- [ ] Vérifier l'e-mail de confirmation client
- [ ] Vérifier que le total TTC et la livraison offerte sont corrects
- [ ] Annuler ou rembourser la commande test après vérification

## 9. Connecter Astra à l'API définitive

- [ ] Vérifier que l'API Celestiar est déployée sur une URL publique stable
- [ ] Aller dans Boutique en ligne → Thèmes → Personnaliser
- [ ] Ouvrir Paramètres du thème → Assistante Astra
- [ ] Remplacer l'URL de prévisualisation par l'URL publique définitive se terminant par `/api`
- [ ] Enregistrer
- [ ] Ouvrir l'aperçu et poser à Astra : « Quels sont les délais ? »
- [ ] Vérifier qu'Astra répond sans mentionner Stripe

Si vous n'avez pas encore d'URL API publique stable, laisser le champ vide ou garder la valeur de prévisualisation uniquement pour les tests.

## 10. Vérifications mobiles

- [ ] Tester l'accueil sur mobile
- [ ] Tester la boutique sur mobile
- [ ] Tester une fiche produit sur mobile
- [ ] Tester le panier sur mobile
- [ ] Tester le checkout Shopify sur mobile
- [ ] Tester Astra sur mobile

## 11. Publier

- [ ] Désactiver le mode test Shopify Payments
- [ ] Vérifier les informations légales dans les modales du pied de page
- [ ] Vérifier que SIRET, adresse et TVA intracommunautaire ne contiennent plus de `[à compléter]`
- [ ] Connecter le nom de domaine final dans Paramètres → Domaines
- [ ] Aller dans Boutique en ligne → Thèmes
- [ ] Cliquer sur Publier sur le thème Celestiar
- [ ] Retirer le mot de passe de la boutique si elle est encore protégée
- [ ] Passer une dernière commande test réelle ou en mode test selon votre choix

## À me demander si un point bloque

- Import ZIP refusé : m'envoyer le message d'erreur Shopify
- Import CSV refusé : m'envoyer la ligne concernée
- Prix incorrects : me dire la taille et le cadre concernés
- Astra ne répond pas : me donner l'URL API configurée
- Checkout indisponible : vérifier d'abord que Shopify Payments est activé et que la boutique n'est pas en mode développement
