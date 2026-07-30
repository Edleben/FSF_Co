# FSF Website — Code Handoff

> Document vivant · À mettre à jour après chaque feature, correction ou changement d'architecture.

## 1. État de la livraison

| Champ | Valeur |
|---|---|
| Projet | Frédéric Saba Foundation Website |
| Branche active | `feature/FSF_site_Update` |
| Dernière mise à jour | 2026-07-30 |
| Tracker fonctionnel | `PROJECT_TRACKER.md` |
| Tracker UI | `/project-tracker` |
| Référentiel d'ingénierie | `STABLE_FRAMEWORK.md` |
| Règles AI obligatoires | `STABLE_AI_CODING_SKILL.md` |
| État de vérification | TypeScript, build statique et déploiement GitHub Pages validés |

## 2. Objectif du projet

Le dépôt contient le site institutionnel bilingue de la Fondation Frédéric Saba. Le socle public est un export statique Next.js. Les prochaines étapes prioritaires concernent la fiabilisation des contenus, les formulaires côté serveur, les dons, l'administration, la performance des médias et les quality gates.

## 3. Architecture actuelle

| Zone | Emplacement | Responsabilité |
|---|---|---|
| Routes | `src/app` | Pages App Router et génération statique |
| Composants | `src/components` | UI, navigation et layout partagés |
| Traductions | `src/contexts/LanguageContext.tsx` | Traductions FR/EN et persistance de la langue |
| Contenu métier | `src/lib/*-data.ts` | Initiatives, actualités et événements statiques |
| Données de galerie | `src/data/gallery-images.json`, `src/lib/gallery-data.ts` | Catalogue de 230 images, typage et catégories |
| Données du tracker | `src/lib/project-tracker-data.ts` | Sprints, features, statuts, preuves et critères |
| Tracker UI | `src/app/project-tracker/page.tsx` | Visualisation interactive et accordéons |
| Hébergement | `.github/workflows/deploy.yml`, `apphosting.yaml` | GitHub Pages pour le frontend public; Firebase réservé à une future décision backend |

## 4. Features livrées dans le cycle courant

### Project Tracker Markdown et UI

- Registre d'audit structuré par sprint.
- Source de données typée pour le tracker UI.
- Progression globale, par sprint et par feature.
- Filtres par sprint et statut.
- Statuts, priorités, preuves et critères d'acceptation.
- Actualisation périodique de l'affichage.
- Accès direct depuis le menu du site.

### Accordéons de sprint

- Chaque sprint affiche son nom métier et son objectif à l'état fermé.
- Un clic ouvre les features rattachées au sprint.
- Chaque feature expose description, statut, priorité et progression.
- Un seul sprint est ouvert à la fois.
- Interaction clavier et attributs ARIA inclus.
- Comportement mobile vérifié dans le navigateur intégré.

### Gouvernance STABLE

- Les deux documents STABLE ont été intégrés au dépôt sans modification de contenu.
- Le workflow STABLE est obligatoire pour toute future intervention.
- Le tracker Markdown, sa source UI et ce handoff doivent évoluer ensemble après chaque feature.

### Fiabilisation de la galerie

- Source typée unique pour les cinq séries de la galerie.
- Référence Notsé alignée sur les 69 fichiers réellement présents.
- Lieu, date, description et nombre de photos affichés pour chaque série.
- Métadonnées éditoriales et textes alternatifs disponibles en français et en anglais.
- Chargement différé conservé pour limiter le coût initial des 230 images.
- Hero moderne avec une image représentative par catégorie, rotation automatique et commandes accessibles.
- Recherche débouncée à 250 ms et filtre par catégorie.
- Grille montée par lots de 24 avec `IntersectionObserver`; images rendues avec `loading="lazy"`.
- Modal agrandi avec détails et navigation précédente/suivante.

## 5. Vérifications exécutées

| Vérification | Résultat | Notes |
|---|---|---|
| `npm.cmd run typecheck` | Réussi | Aucun diagnostic TypeScript |
| `npm.cmd run build` | Réussi | Export statique généré, route `/project-tracker` incluse |
| `npm.cmd run lint` | Bloqué par configuration | La commande ouvre l'assistant interactif Next.js; ESLint doit être configuré dans un prochain quality gate |
| Test navigateur du tracker | Réussi | Chargement sans erreur console |
| Test accordéon Sprint 1 | Réussi | Passage fermé → ouvert et quatre features affichées |
| `git diff --check` | Réussi | Aucun défaut de patch; avertissements CRLF Windows seulement |

## 6. Risques et dettes connus

- Next.js 15.2.3 et React 18 doivent être évalués pour mise à niveau et correctifs de sécurité.
- Le build ignore actuellement les erreurs TypeScript et ESLint dans `next.config.ts`.
- Aucun test automatisé n'est encore présent.
- ESLint n'est pas encore configuré pour une exécution non interactive en CI.
- Les formulaires n'ont pas de backend et journalisent les données côté navigateur.
- Le paiement reste simulé.
- Plusieurs contenus institutionnels sont fictifs ou anciens.
- Environ 2,85 Go de médias sont stockés directement dans Git.
- GitHub Pages est la cible publique officielle du frontend statique; le rôle futur de Firebase pour le backend reste à définir.
- Le tracker est alimenté par des données statiques : son polling recalcule l'état embarqué, mais ne consulte pas encore une source distante.

## 7. Prochaines actions recommandées

1. Lors de la prochaine revue de roadmap, revisiter les trois features différées du Sprint 1 : coordonnées officielles, contenus récents et conformité légale.
2. Lors de la reprise du Sprint 2, choisir l'architecture backend et la cible de déploiement.
3. Replanifier ensemble le traitement des contacts, les candidatures bénévoles, la sécurité des formulaires et les inscriptions aux événements.
4. Ajouter les premiers tests automatisés et activer les quality gates.
5. Déplacer et optimiser les médias via un stockage/CDN adapté.
6. Intégrer ensuite le paiement et les dons récurrents.

## 8. Procédure obligatoire après chaque feature

### Avant l'implémentation

1. Lire `STABLE_AI_CODING_SKILL.md` et appliquer `STABLE_FRAMEWORK.md`.
2. Définir le but, les critères d'acceptation, les zones affectées et les risques de régression.
3. Identifier le sprint et la feature correspondante dans le tracker.

### Après l'implémentation

1. Mettre à jour le statut, le pourcentage, la preuve et les critères dans `src/lib/project-tracker-data.ts`.
2. Reporter le même état dans `PROJECT_TRACKER.md` et ajouter une entrée au journal d'audit.
3. Mettre à jour ce fichier avec les changements, décisions, vérifications, risques et prochaines actions.
4. Exécuter les contrôles proportionnés : typecheck, lint, tests, build et QA manuelle.
5. Vérifier `git diff`, créer un commit explicite et pousser la branche de travail.

## 9. Modèle d'entrée de handoff

Copier ce bloc à la suite du journal pour chaque livraison :

```markdown
### YYYY-MM-DD — Nom de la feature

- Objectif :
- Sprint / feature :
- Fichiers modifiés :
- Décisions d'architecture :
- Critères d'acceptation vérifiés :
- Commandes et tests exécutés :
- Résultat QA manuelle :
- Risques ou limitations :
- Rollback :
- Prochaine action :
```

## 10. Journal de handoff

### 2026-07-20 — Project Tracker, accordéons et gouvernance STABLE

- Objectif : rendre l'avancement auditable et transmettre un contexte fiable aux prochains développeurs.
- Sprint / feature : Sprint 6 — gouvernance de développement et handoff.
- Fichiers principaux : `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`, `src/lib/project-tracker-data.ts`, `src/app/project-tracker/page.tsx`, navigation et traductions.
- Décision : conserver une source UI typée et un registre Markdown lisible hors application.
- Vérifications : typecheck et build statique réussis; test navigateur, accordéon et console validés; lint non exécutable tant qu'ESLint n'est pas configuré.
- Risques : synchronisation manuelle entre le Markdown et les données UI jusqu'à l'automatisation future.
- Rollback : retirer la route du tracker et l'entrée de navigation; les pages publiques historiques restent indépendantes.
- Prochaine action : commencer le Sprint 1 par la validation des données institutionnelles.

### 2026-07-26 — Coordonnées et profils officiels marqués incomplets

- Objectif : refléter honnêtement l'impossibilité de finaliser la feature sans données officielles du client.
- Sprint / feature : Sprint 1 — Coordonnées et profils officiels.
- Fichiers modifiés : `src/lib/project-tracker-data.ts`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décision d'architecture : aucun code public ni contenu institutionnel n'est modifié tant que les données ne sont pas validées; la feature reste `in-progress`, à 20 %, avec un blocage explicite.
- Critères d'acceptation vérifiés : statut incomplet visible dans les sources de suivi; dépendance client et condition de reprise documentées.
- Commandes et tests exécutés : `npm.cmd run typecheck` et `git diff --check` réussis.
- Résultat QA manuelle : tracker UI version 1.2 chargé sans erreur console; Sprint 1 affiche 40 % et la feature ouverte affiche `In progress`, priorité `Critical`, progression 20 %.
- Risques ou limitations : les coordonnées fictives restent présentes dans le site existant et ne doivent pas être considérées comme officielles.
- Rollback : rétablir la version 1.1 des trois sources de suivi.
- Prochaine action : rappeler au client de fournir l'adresse, le téléphone, l'e-mail, les profils d'équipe et les liens sociaux officiels, puis reprendre cette feature.

### 2026-07-26 — Fiabilisation de la galerie

- Objectif : supprimer les références cassées et rendre chaque série identifiable et auditable.
- Sprint / feature : Sprint 1 — Fiabilisation de la galerie.
- Fichiers modifiés : `src/lib/gallery-data.ts`, `src/app/gallerie/page.tsx`, `src/contexts/LanguageContext.tsx`, `src/lib/project-tracker-data.ts`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décisions d'architecture : extraction des séries dans une source typée; la page reste responsable uniquement du rendu et du formatage localisé des dates.
- Critères d'acceptation vérifiés : 230 références pour 230 fichiers, aucun fichier manquant, cinq séries avec lieu/date/description, textes alternatifs contextualisés, rendu FR/EN.
- Commandes et tests exécutés : audit PowerShell des références, `npm.cmd run build`, puis `npm.cmd run typecheck`; les trois contrôles réussissent. Le premier typecheck parallèle au build a échoué par collision temporaire sur `.next`, puis a réussi en exécution séquentielle.
- Résultat QA manuelle : `/gallerie` vérifiée sur le serveur local; 230 images chargées, zéro image cassée, zéro erreur console, métadonnées correctes en anglais et en français.
- Risques ou limitations : les dates de Davié, des kits d'Agogomé et des distributions de vivres proviennent des métadonnées EXIF; la période du Mini-Camp provient de la publication publique relative à l'événement. Une validation éditoriale client reste souhaitable.
- Rollback : rétablir l'ancienne définition locale des sections dans `src/app/gallerie/page.tsx` et la progression 65 %, en sachant que cela réintroduit la référence Notsé inexistante numéro 70.
- Prochaine action : faire confirmer les dates historiques par le client lors de la prochaine revue éditoriale.

### 2026-07-26 — Expérience avancée de la galerie

- Objectif : transformer la galerie fiabilisée en expérience moderne, recherchable et performante.
- Sprint / feature : Sprint 1 — Fiabilisation de la galerie, amélioration UI/UX.
- Fichiers modifiés : `src/data/gallery-images.json`, `src/lib/gallery-data.ts`, `src/components/gallery/gallery-hero.tsx`, `src/components/gallery/gallery-explorer.tsx`, `src/app/gallerie/page.tsx`, traductions et trois sources de suivi.
- Décisions d'architecture : catalogue JSON indépendant de l'UI; composants séparés pour le hero et l'exploration; aucun nouveau package; recherche débouncée à 250 ms et pagination visuelle par lots de 24 avec `IntersectionObserver`.
- Critères d'acceptation vérifiés : 230 objets JSON complets et uniques; hero par catégorie; recherche Notsé = 69 résultats; filtre Kits scolaires = 116 résultats; modal détaillé et navigation suivante; deuxième lot chargé à l'approche du bas de grille.
- Commandes et tests exécutés : audit JSON et chemins, `npm.cmd run typecheck`, `npm.cmd run build`, QA navigateur.
- Résultat QA manuelle : hero, recherche, filtre, modal et chargement progressif fonctionnels; 24 cartes montées initialement puis 48; aucune erreur console.
- Risques ou limitations : le catalogue JSON augmente la taille de la route galerie, mais évite 230 composants montés au premier rendu; les images originales restent lourdes et non optimisées en attendant la feature CDN/médiathèque.
- Rollback : retirer les deux composants `src/components/gallery`, restaurer la page galerie par séries et la source typée précédente; le catalogue JSON peut être supprimé sans toucher aux fichiers médias.
- Prochaine action : mesurer Lighthouse sur une cible déployée puis traiter l'optimisation/CDN des médias dans le Sprint 5.

### 2026-07-26 — Report du reste de Sprint 1

- Objectif : rendre explicite la décision de reprendre ultérieurement les features institutionnelles non terminées.
- Sprint / feature : Sprint 1 — coordonnées officielles, actualités et événements, conformité éditoriale et légale.
- Fichiers modifiés : `src/lib/project-tracker-data.ts`, `src/app/project-tracker/page.tsx`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décisions d'architecture : ajout du statut typé `deferred`, présenté comme « À revisiter » en français et `Deferred` en anglais; les pourcentages audités sont conservés.
- Critères d'acceptation vérifiés : trois features différées, galerie maintenue terminée, filtre et compteur dédiés disponibles dans l'UI.
- Commandes et tests exécutés : `npm.cmd run typecheck`, `npm.cmd run build` et `git diff --check` réussis.
- Résultat QA manuelle : tracker UI version 1.5 chargé sans erreur console; compteur `Deferred` = 3, Sprint 1 = 49 %, trois features différées et Galerie maintenue `Completed` à 100 %; filtre `Deferred` limité à Sprint 1.
- Risques ou limitations : aucune date de reprise n'est encore définie; la prochaine revue de roadmap doit replanifier ces trois features.
- Rollback : rétablir leur statut `in-progress` et retirer le statut `deferred` du tracker.
- Prochaine action : revisiter ces trois features lors de la prochaine revue convenue avec le client.

### 2026-07-29 — Report de Sprint 2

- Objectif : rendre explicite la décision de reprendre ultérieurement les parcours de formulaires et de sécurité.
- Sprint / feature : Sprint 2 — traitement des contacts, candidatures bénévoles, protection antispam et confidentialité, inscriptions aux événements.
- Fichiers modifiés : `src/lib/project-tracker-data.ts`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décisions d'architecture : les quatre features passent au statut typé `deferred`; leurs progressions auditées restent à 35 %, 35 %, 0 % et 0 %, soit 18 % pour le sprint. Aucun formulaire ni comportement public n'est modifié.
- Critères d'acceptation vérifiés : toutes les features de Sprint 2 sont visibles comme « À revisiter » dans les sources de suivi; les conditions de reprise sont documentées.
- Commandes et tests exécutés : `npm.cmd run typecheck`, `npm.cmd run build` et `git diff --check` réussis; le build statique inclut `/project-tracker`.
- Résultat QA manuelle : non exécutée dans le navigateur intégré, l'accès automatisé à l'URL locale ayant été refusé par sa politique de sécurité; la cohérence des données et la génération de la route ont été vérifiées statiquement.
- Risques ou limitations : les formulaires existants restent simulés et ne transmettent aucune donnée; aucune date de reprise n'est définie.
- Rollback : rétablir les deux premières features à `in-progress`, les deux autres à `not-started`, puis remettre le tracker en version 1.5.
- Prochaine action : replanifier le Sprint 2 après choix de l'architecture backend, de la cible de déploiement et des services de notification.

### 2026-07-29 — Activation du déploiement GitHub Pages

- Objectif : publier le frontend statique sur une URL partageable avec le client.
- Sprint / feature : Sprint 6 — Stratégie de déploiement.
- Fichiers modifiés : `.github/workflows/deploy.yml`, `src/lib/project-tracker-data.ts`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décisions d'architecture : GitHub Pages devient la cible publique du frontend statique; `actions/configure-pages` est autorisé à activer Pages automatiquement. Firebase reste hors du chemin de publication frontend.
- Critères d'acceptation vérifiés : Pages activé et workflow terminé avec succès; la première vérification HTTP a toutefois révélé des ressources 404 à cause d'un sous-chemin incorrect.
- Commandes et tests exécutés : premier workflow diagnostiqué; échec confirmé à l'étape `Setup Pages`, puis nouvelle exécution réussie après activation manuelle de Pages.
- Résultat QA manuelle : page HTML publique accessible, mais CSS et JavaScript 404 sous `/FSF_Com`; correction reportée dans l'entrée suivante.
- Risques ou limitations : le dépôt et l'artefact contiennent environ 2,85 Go de médias, ce qui allonge fortement le checkout et peut dépasser les limites de GitHub Pages.
- Rollback : retirer `enablement: true` et revenir au commit de déploiement précédent; le site local reste inchangé.
- Prochaine action : pousser la correction, attendre le workflow, puis vérifier l'URL publique et les routes principales.

### 2026-07-29 — Correction du sous-chemin GitHub Pages

- Objectif : rendre la publication GitHub Pages entièrement fonctionnelle sous le nom exact du dépôt.
- Sprint / feature : Sprint 6 — Stratégie de déploiement.
- Fichiers modifiés : `next.config.ts`, `src/lib/project-tracker-data.ts`, `PROJECT_TRACKER.md`, `CODE_HANDOFF.md`.
- Décisions d'architecture : `basePath` et `assetPrefix` utilisent `/FSF_Co`, identique au nom sensible à la casse du dépôt et à l'URL Pages.
- Critères d'acceptation vérifiés : workflow GitHub Pages réussi; accueil, tracker, galerie et contact répondent en HTTP 200; les ressources CSS et JavaScript contrôlées répondent également en HTTP 200.
- Commandes et tests exécutés : `npm.cmd run typecheck`, build avec `GITHUB_PAGES=true`, contrôle de `out/index.html` et `git diff --check` réussis; aucun chemin `/FSF_Com` ne subsiste dans la page exportée.
- Résultat QA manuelle : URL publique `https://edleben.github.io/FSF_Co/` accessible avec le titre FSF; sous-chemin corrigé et ressources statiques chargées depuis `/FSF_Co`.
- Risques ou limitations : le poids des médias allonge le workflow; les formulaires backend restent hors du périmètre GitHub Pages.
- Rollback : rétablir le sous-chemin précédent, ce qui remettrait les ressources publiques en erreur 404.
- Prochaine action : construire avec `GITHUB_PAGES=true`, publier et contrôler la page, les assets et les routes principales.

### 2026-07-30 — Fiabilisation des images sur GitHub Pages

- Objectif : afficher les images sur toutes les pages déployées sans charger l'intégralité de la galerie au premier rendu.
- Sprint / feature : Sprint 6 — Stratégie de déploiement; contrôle de non-régression de Sprint 1 — Fiabilisation de la galerie.
- Fichiers modifiés : `src/components/site-image.tsx`, `next.config.ts`, les consommateurs de `next/image` et les trois sources de suivi.
- Décisions d'architecture : composant image partagé qui préfixe uniquement les chemins locaux avec `NEXT_PUBLIC_SITE_BASE_PATH`; le JSON de 230 images conserve ses chemins indépendants de l'hébergement. Le préfixe est vide en local et vaut `/FSF_Co` au build GitHub Pages.
- Critères d'acceptation vérifiés : aucune image exportée sous `/images` ou `/team` sans préfixe; toutes les pages utilisent le composant partagé; la galerie conserve `PAGE_SIZE = 24`, `loading="lazy"` et `IntersectionObserver`.
- Commandes et tests exécutés : `npm.cmd run typecheck`, build avec `GITHUB_PAGES=true`, audit des pages HTML exportées et `git diff --check`.
- Résultat QA manuelle : à compléter après déploiement et contrôles HTTP des images publiques.
- Risques ou limitations : les fichiers images originaux restent lourds; ce correctif résout leur URL, pas leur compression ni leur migration vers un CDN.
- Rollback : rétablir les imports directs depuis `next/image`, retirer le composant partagé et la variable de préfixe; cela réintroduirait les images 404 sur GitHub Pages.
- Prochaine action : déployer, vérifier un échantillon d'images sur les pages publiques et confirmer que la galerie ne charge pas les 230 médias initialement.
