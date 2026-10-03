# Installation du thème Celestiar sur Shopify

Boutique concernée : https://bys-user-store-938300-ctzwc00n.myshopify.com

## 1. Importer le thème

1. Ouvrez Shopify Admin → Boutique en ligne → Thèmes.
2. Cliquez sur Ajouter un thème → Importer un fichier ZIP.
3. Importez `celestiar-shopify-theme.zip`.
4. Ouvrez Aperçu pour vérifier le rendu avant publication.

Le thème contient déjà les visuels des 5 affiches, l'aperçu personnalisé, le panier Shopify, la FAQ, la page Suivi, la page À propos, les modales légales et l'assistante Astra.

## 2. Créer les 5 produits

Les produits ne sont pas inclus dans le ZIP : Shopify ne crée pas de produits lors de l'import d'un thème.

Méthode rapide :

1. Shopify Admin → Produits → Importer.
2. Importez `produits-celestiar.csv`.
3. Vérifiez que les 5 produits ont les handles exacts :
   - aurore-boreale
   - nuages-roses
   - etoiles-celestes
   - voie-lactee
   - etoiles-filantes
4. Vérifiez les options : Taille puis Cadre.
5. Vérifiez les prix : 59,90 € à 189,90 €, avec +7,90 € pour Chêne.
6. Ajoutez manuellement l'image de chaque produit dans sa fiche produit. Les images propres sont dans le ZIP du thème, dossier `assets` : `poster-aurore.jpg`, `poster-nuages.jpg`, `poster-etoiles-celestes.jpg`, `poster-voie-lactee.jpg`, `poster-etoiles.jpg`.

Le thème affiche automatiquement les champs de personnalisation sur chaque produit. Les valeurs saisies arrivent dans la commande Shopify comme propriétés de ligne : Prénom, Date, Heure, Ville, Phrase et Orthographe vérifiée.

## 3. Créer les pages

Créez ces pages dans Shopify Admin → Boutique en ligne → Pages :

| Titre | Handle exact | Modèle de thème |
| --- | --- | --- |
| FAQ | faq | page.faq |
| Suivi | suivi | page.suivi |
| À propos | a-propos | page.a-propos |

Pour chaque page : ouvrez la page, puis choisissez le modèle correspondant dans la colonne de droite.

## 4. Activer les prix TTC

1. Shopify Admin → Paramètres → Taxes et droits.
2. Activez l'affichage des prix TTC / taxes incluses selon votre configuration fiscale.
3. Vérifiez que le taux français de TVA à 20 % est correctement configuré.

Les prix du CSV sont saisis en TTC, mais l'affichage légal dépend de votre configuration Shopify.

## 5. Configurer la livraison offerte

1. Shopify Admin → Paramètres → Expédition et livraison.
2. Dans le profil d'expédition, créez un tarif à 0 € pour la France et les zones desservies.
3. Si vous ne livrez que certains pays, limitez les zones ici.

## 6. Activer les paiements Shopify

1. Shopify Admin → Paramètres → Paiements.
2. Activez Shopify Payments.
3. Activez les moyens souhaités : Visa, Mastercard, Apple Pay, PayPal, etc.
4. Pour tester, utilisez le mode test de Shopify Payments ou le fournisseur de test Shopify, puis passez une commande complète.

Le client paiera directement sur Shopify Checkout. Le checkout Stripe du site React n'est plus utilisé.

## 7. Astra

Le thème contient l'interface Astra. Le champ « URL de l'API Astra » est prérempli avec l'API de prévisualisation actuelle :

`https://html-collab-build.preview.emergentagent.com/api`

Avant la mise en production, remplacez-la par l'URL publique définitive de l'API Celestiar dans :

Boutique en ligne → Thèmes → Personnaliser → Paramètres du thème → Assistante Astra.

Si l'URL est vide, Astra affiche un message de contact au lieu de répondre par IA.

## 8. Suivi des commandes

Shopify gère nativement la confirmation, les e-mails et la page de statut de commande. La page « Suivi » du thème renvoie vers le compte client et vers le lien reçu par e-mail.

Pour un moteur de recherche de commande par référence personnalisée, il faudra ensuite connecter une application Shopify ou une API Admin sécurisée. Ne collez jamais une clé Admin dans le code du thème.

## 9. Tests avant publication

- Créer les 5 produits et leurs 18 variantes.
- Ajouter une affiche avec un prénom long, par exemple MARIE-CHARLOTTE.
- Vérifier que le texte reste dans l'aperçu.
- Ajouter au panier avec Noir, Blanc et Chêne.
- Vérifier que les propriétés personnalisées apparaissent au panier et dans la commande.
- Passer une commande en mode test.
- Vérifier l'e-mail de confirmation Shopify.
- Vérifier l'affichage mobile, tablette et ordinateur.
- Publier le thème seulement après ces tests.


## 10. Checklist de lancement

Une version simple à cocher est disponible dans `CHECKLIST-LANCEMENT.md`. Suivez-la dans l'ordre : import du thème, produits, pages, paiements, TVA, livraison, commande test, Astra, mobile, puis publication.
