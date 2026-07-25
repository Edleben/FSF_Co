# FSF Website — Code Handoff

> Document vivant · À mettre à jour après chaque feature, correction ou changement d'architecture.

## 1. État de la livraison

| Champ | Valeur |
|---|---|
| Projet | Frédéric Saba Foundation Website |
| Branche active | `feature/FSF_site_Update` |
| Dernière mise à jour | 2026-07-20 |
| Tracker fonctionnel | `PROJECT_TRACKER.md` |
| Tracker UI | `/project-tracker` |
| Référentiel d'ingénierie | `STABLE_FRAMEWORK.md` |
| Règles AI obligatoires | `STABLE_AI_CODING_SKILL.md` |
| État de vérification | TypeScript et build statique validés |

## 2. Objectif du projet

Le dépôt contient le site institutionnel bilingue de la Fondation Frédéric Saba. Le socle public est un export statique Next.js. Les prochaines étapes prioritaires concernent la fiabilisation des contenus, les formulaires côté serveur, les dons, l'administration, la performance des médias et les quality gates.

## 3. Architecture actuelle

| Zone | Emplacement | Responsabilité |
|---|---|---|
| Routes | `src/app` | Pages App Router et génération statique |
| Composants | `src/components` | UI, navigation et layout partagés |
| Traductions | `src/contexts/LanguageContext.tsx` | Traductions FR/EN et persistance de la langue |
| Contenu métier | `src/lib/*-data.ts` | Initiatives, actualités et événements statiques |
| Données du tracker | `src/lib/project-tracker-data.ts` | Sprints, features, statuts, preuves et critères |
| Tracker UI | `src/app/project-tracker/page.tsx` | Visualisation interactive et accordéons |
| Hébergement | `.github/workflows/deploy.yml`, `apphosting.yaml` | GitHub Pages et préparation Firebase |

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
- GitHub Pages et Firebase App Hosting coexistent sans décision de cible officielle.
- Le tracker est alimenté par des données statiques : son polling recalcule l'état embarqué, mais ne consulte pas encore une source distante.

## 7. Prochaines actions recommandées

1. Valider les coordonnées, profils, mentions légales et contenus officiels.
2. Choisir l'architecture backend et la cible de déploiement.
3. Mettre en service le formulaire de contact avec sécurité et observabilité.
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
