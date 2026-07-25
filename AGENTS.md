# Instructions de développement obligatoires

Ces règles s'appliquent à l'ensemble du dépôt, sans exception.

## Avant toute modification

1. Lire intégralement `STABLE_AI_CODING_SKILL.md`.
2. Appliquer `STABLE_FRAMEWORK.md` au cadrage, à l'implémentation et à la vérification.
3. Consulter `PROJECT_TRACKER.md`, `src/lib/project-tracker-data.ts` et `CODE_HANDOFF.md` pour connaître l'état courant.
4. Définir les critères d'acceptation, les zones affectées et les risques de régression avant de coder.

## Pendant l'implémentation

- Faire le plus petit changement correct et préserver les comportements existants.
- Respecter l'architecture, le typage, les conventions et les limites du projet.
- Ne jamais revendiquer une vérification qui n'a pas été réellement exécutée.

## Après chaque feature ou correction

1. Mettre à jour `src/lib/project-tracker-data.ts` pour la vue UI.
2. Synchroniser `PROJECT_TRACKER.md` et son journal d'audit.
3. Mettre à jour `CODE_HANDOFF.md` avec les décisions, fichiers, tests, risques, rollback et prochaine action.
4. Exécuter les contrôles STABLE proportionnés au changement.
5. Vérifier que les trois sources de suivi décrivent le même état avant commit.
