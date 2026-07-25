# FSF Website — Project Tracker & Audit

> Version 1.1 · Audit de référence : 20 juillet 2026 · Branche de travail : `feature/FSF_site_Update`

Ce document est le registre d'évolution du site de la Fondation Frédéric Saba. Il doit être revu à chaque livraison, audit fonctionnel ou changement de périmètre. La page `/project-tracker` fournit la vue interactive correspondante.

## Méthode de suivi

- **Terminée** : critères d'acceptation vérifiés, progression 100 %.
- **En cours** : interface, socle ou partie du parcours disponible; le pourcentage est une estimation auditée.
- **Non commencée** : aucune implémentation exploitable identifiée, progression 0 %.
- Le taux d'un sprint est la moyenne des pourcentages de ses features.
- Une feature ne passe à 100 % qu'après vérification de ses critères d'acceptation.

## Synthèse actuelle

| Sprint | Objectif | Progression | État dominant |
|---|---|---:|---|
| Sprint 0 | Socle vitrine | 100 % | Terminé |
| Sprint 1 | Données institutionnelles | 44 % | En cours |
| Sprint 2 | Formulaires et sécurité | 18 % | En cours |
| Sprint 3 | Dons | 28 % | En cours |
| Sprint 4 | Administration et contenus | 4 % | À démarrer |
| Sprint 5 | Qualité et croissance | 27 % | En cours |
| Sprint 6 | Fiabilité et innovation | 33 % | En cours |

## Sprint 0 — Socle vitrine

**Objectif :** stabiliser l'expérience publique déjà disponible.  
**Horizon :** réalisé / maintenance.

| Feature | Statut | Progression | Preuve d'audit |
|---|---|---:|---|
| Interface responsive | Terminée | 100 % | Layouts Tailwind et menus desktop/mobile présents. |
| Pages institutionnelles | Terminée | 100 % | Routes principales présentes dans `src/app`. |
| Pages de détail statiques | Terminée | 100 % | `generateStaticParams` et gestion 404. |
| Système de composants UI | Terminée | 100 % | Bibliothèque partagée dans `src/components/ui`. |

## Sprint 1 — Données institutionnelles

**Objectif :** remplacer les contenus de démonstration par des informations officielles.

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| Coordonnées et profils officiels | En cours | 35 % | Supprimer toutes les valeurs d'exemple. |
| Actualités et événements à jour | En cours | 30 % | Publier du contenu récent et vérifié. |
| Conformité éditoriale et légale | En cours | 45 % | Validation juridique et consentements. |
| Fiabilisation de la galerie | En cours | 65 % | Corriger Notsé 70/69 et ajouter les métadonnées. |

## Sprint 2 — Formulaires et sécurité

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| Traitement des messages de contact | En cours | 35 % | Stockage serveur, notification et gestion d'erreur. |
| Gestion des candidatures bénévoles | En cours | 35 % | Persistance, accusé de réception et suivi. |
| Protection antispam et confidentialité | Non commencée | 0 % | CAPTCHA, rate limiting et consentement. |
| Inscription aux événements | Non commencée | 0 % | Capacité, inscription, confirmation et export. |

## Sprint 3 — Dons

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| Parcours de don | Terminée | 100 % | Maintenir la validation et l'ergonomie mobile. |
| Paiement réel | En cours | 25 % | Prestataire, webhooks, échecs et remboursements. |
| Dons récurrents | En cours | 15 % | Cycle complet de l'abonnement donateur. |
| Reçus et suivi des dons | Non commencée | 0 % | Reçus automatiques et export comptable. |
| Campagnes et objectifs | Non commencée | 0 % | Objectifs configurables et progression publique. |

## Sprint 4 — Administration et contenus

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| Socle Firebase | En cours | 20 % | Environnements, règles et secrets sécurisés. |
| Authentification administrateur | Non commencée | 0 % | MFA, rôles et sessions révocables. |
| Gestion des contenus | Non commencée | 0 % | Brouillon, publication, aperçu et historique. |
| Médiathèque | Non commencée | 0 % | CDN, optimisation et droits des médias. |
| Suivi opérationnel | Non commencée | 0 % | Statuts, filtres, historique et exports. |

## Sprint 5 — Qualité et croissance

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| SEO et partage social | En cours | 25 % | Sitemap, robots, canonical, Open Graph et Schema.org. |
| Internationalisation robuste | En cours | 70 % | Traductions intégrales et SEO par langue. |
| Performance des médias | En cours | 20 % | CDN, compression, WebP/AVIF et budgets Lighthouse. |
| Accessibilité | En cours | 45 % | Audit WCAG 2.2 AA et parcours clavier. |
| Analytics et mesure d'impact | Non commencée | 0 % | Mesure consentie et indicateurs documentés. |
| Recherche et newsletter | Non commencée | 0 % | Recherche pertinente et désinscription. |

## Sprint 6 — Fiabilité et innovation

| Feature | Statut | Progression | Prochaine validation |
|---|---|---:|---|
| Tests automatisés | Non commencée | 0 % | Couvrir les parcours critiques dans la CI. |
| Quality gates CI | En cours | 30 % | Ne plus ignorer TypeScript/ESLint et exiger la CI. |
| Monitoring et alertes | Non commencée | 0 % | Alertes et corrélation front/backend. |
| Stratégie de déploiement | En cours | 55 % | Choisir la cible officielle et documenter le rollback. |
| Fonctions IA encadrées | En cours | 10 % | Valider l'usage, la confidentialité, la qualité et le coût. |
| Gouvernance STABLE et handoff | Terminée | 100 % | Maintenir STABLE, le tracker et `CODE_HANDOFF.md` après chaque feature. |

## Journal d'audit

| Date | Version | Portée | Résultat |
|---|---|---|---|
| 2026-07-20 | 1.0 | Audit initial du dépôt | Baseline créée; socle vitrine complet, backends et administration prioritaires. |
| 2026-07-20 | 1.1 | Tracker UI, accordéons et gouvernance | Tracker intégré au site; accordéons par sprint; STABLE et handoff ajoutés. |

## Procédure de mise à jour

1. Vérifier la feature dans le code et, si applicable, dans l'environnement déployé.
2. Mettre à jour son statut, son pourcentage, sa preuve et ses critères d'acceptation dans `src/lib/project-tracker-data.ts`.
3. Reporter le même changement dans ce document et recalculer la synthèse.
4. Mettre à jour `CODE_HANDOFF.md` avec les décisions, vérifications, risques et prochaines actions.
5. Ajouter une ligne au journal d'audit avec la date, la portée et le résultat.
6. Exécuter les contrôles STABLE appropriés avant de déclarer une feature terminée.

## Risques ouverts

- Les formulaires donnent une confirmation sans transmettre réellement les données.
- Le paiement est simulé.
- Des coordonnées et profils sont encore fictifs.
- Environ 2,85 Go d'images sont versionnés directement dans Git.
- Les configurations GitHub Pages et Firebase App Hosting coexistent sans cible officielle.
- Les erreurs TypeScript et ESLint sont ignorées pendant le build.
- Aucun test automatisé ou monitoring n'est actuellement identifié.
