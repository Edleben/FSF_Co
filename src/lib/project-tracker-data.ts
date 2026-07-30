export type FeatureStatus = "completed" | "in-progress" | "not-started" | "deferred";
export type FeaturePriority = "critical" | "high" | "medium" | "low";

export interface TrackerFeature {
  id: string;
  title: string;
  description: string;
  status: FeatureStatus;
  progress: number;
  priority: FeaturePriority;
  evidence: string;
  acceptanceCriteria: string[];
}

export interface TrackerSprint {
  id: string;
  title: string;
  objective: string;
  horizon: string;
  features: TrackerFeature[];
}

export const trackerMeta = {
  project: "Frédéric Saba Foundation Website",
  version: "1.9",
  auditDate: "2026-07-30",
  scoring: "Terminée = 100 %, en cours = estimation vérifiée, à revisiter = progression historique conservée, non commencée = 0 %.",
};

export const projectSprints: TrackerSprint[] = [
  {
    id: "sprint-0",
    title: "Sprint 0 — Socle vitrine",
    objective: "Stabiliser l'expérience publique déjà disponible.",
    horizon: "Réalisé / maintenance",
    features: [
      { id: "responsive-ui", title: "Interface responsive", description: "Navigation, pages et composants adaptés aux écrans mobiles et desktop.", status: "completed", progress: 100, priority: "high", evidence: "Layouts Tailwind, menu desktop et Sheet mobile.", acceptanceCriteria: ["Navigation utilisable au clavier", "Mise en page sans débordement sur mobile"] },
      { id: "public-pages", title: "Pages institutionnelles", description: "Accueil, fondation, initiatives, actualités, événements, galerie et pages légales.", status: "completed", progress: 100, priority: "high", evidence: "Routes présentes dans src/app.", acceptanceCriteria: ["Toutes les routes principales répondent", "Les liens de navigation sont cohérents"] },
      { id: "content-pages", title: "Pages de détail statiques", description: "Génération des pages de détail par slug pour initiatives, actualités et événements.", status: "completed", progress: 100, priority: "medium", evidence: "generateStaticParams et notFound implémentés.", acceptanceCriteria: ["Tous les slugs connus sont générés", "Un slug inconnu retourne une page 404"] },
      { id: "design-system", title: "Système de composants UI", description: "Bibliothèque de composants Radix UI/shadcn et thème FSF partagé.", status: "completed", progress: 100, priority: "medium", evidence: "Composants partagés dans src/components/ui.", acceptanceCriteria: ["Composants réutilisables", "Styles cohérents entre les pages"] },
    ],
  },
  {
    id: "sprint-1",
    title: "Sprint 1 — Données institutionnelles",
    objective: "Remplacer les contenus de démonstration par des informations officielles et fiables.",
    horizon: "À revisiter ultérieurement",
    features: [
      { id: "official-content", title: "Coordonnées et profils officiels", description: "Valider adresse, téléphone, e-mail, équipe et liens sociaux.", status: "deferred", progress: 20, priority: "critical", evidence: "Feature incomplète, différée le 2026-07-26 et à revisiter : les données officielles du client ne sont pas encore disponibles; les valeurs d'exemple existantes ne doivent pas être considérées comme validées.", acceptanceCriteria: ["Toutes les coordonnées sont validées par le client", "Aucun contenu d'exemple ne subsiste", "Reprendre la feature dès réception des données officielles"] },
      { id: "fresh-content", title: "Actualités et événements à jour", description: "Remplacer les événements 2024 et établir une cadence de publication.", status: "deferred", progress: 30, priority: "high", evidence: "Feature différée le 2026-07-26 et à revisiter; la structure existe, mais les dates et contenus restent anciens.", acceptanceCriteria: ["Replanifier la feature lors d'une prochaine revue", "Au moins trois actualités récentes", "Événements futurs vérifiés"] },
      { id: "legal-content", title: "Conformité éditoriale et légale", description: "Finaliser confidentialité, mentions légales, consentements et droits photo.", status: "deferred", progress: 45, priority: "critical", evidence: "Feature différée le 2026-07-26 et à revisiter; les pages légales existent sans validation juridique documentée.", acceptanceCriteria: ["Replanifier la feature avec le responsable légal", "Textes validés par le responsable", "Consentement explicite sur les formulaires", "Droits des médias documentés"] },
      { id: "gallery-quality", title: "Fiabilisation de la galerie", description: "Corriger les références d'images et enrichir les métadonnées.", status: "completed", progress: 100, priority: "high", evidence: "Les 230 images sont décrites dans un JSON audité et exploitées par un hero par catégorie, une recherche débouncée, des filtres, une grille progressive par lots de 24 et un modal détaillé navigable.", acceptanceCriteria: ["Aucune image cassée", "Chaque image possède nom, catégorie, description et chemin dans le JSON", "Recherche et filtre par catégorie fonctionnels", "Ouverture détaillée et navigation clavier dans le modal", "Images de grille chargées paresseusement et montées progressivement", "Interface responsive disponible en français et en anglais"] },
    ],
  },
  {
    id: "sprint-2",
    title: "Sprint 2 — Formulaires et sécurité",
    objective: "Transformer les formulaires simulés en parcours fiables et sécurisés.",
    horizon: "À revisiter ultérieurement",
    features: [
      { id: "contact-backend", title: "Traitement des messages de contact", description: "API, stockage, e-mail et suivi de statut pour chaque demande.", status: "deferred", progress: 35, priority: "critical", evidence: "Feature différée le 2026-07-29 et à revisiter; l'interface et la validation existent, mais la soumission reste limitée à console.log faute d'architecture backend validée.", acceptanceCriteria: ["Replanifier après choix de l'architecture backend et de la cible de déploiement", "Message stocké côté serveur", "Notification envoyée", "Erreur serveur gérée"] },
      { id: "volunteer-backend", title: "Gestion des candidatures bénévoles", description: "Enregistrer, notifier et permettre le suivi des candidatures.", status: "deferred", progress: 35, priority: "high", evidence: "Feature différée le 2026-07-29 et à revisiter; le formulaire est validé côté client, sans persistance ni notification.", acceptanceCriteria: ["Replanifier après choix de l'architecture backend", "Candidature persistée", "Accusé de réception envoyé", "Statut consultable par l'équipe"] },
      { id: "form-security", title: "Protection antispam et confidentialité", description: "CAPTCHA, rate limiting, consentement et journalisation sûre.", status: "deferred", progress: 0, priority: "critical", evidence: "Feature non commencée, différée le 2026-07-29 et à revisiter avec les backends des formulaires.", acceptanceCriteria: ["Replanifier avec les parcours de formulaire côté serveur", "Rate limiting actif", "CAPTCHA accessible", "Aucune donnée personnelle dans les logs client"] },
      { id: "event-registration", title: "Inscription aux événements", description: "Places, formulaire d'inscription, confirmation et annulation.", status: "deferred", progress: 0, priority: "medium", evidence: "Feature non commencée, différée le 2026-07-29 et à revisiter; seul un placeholder est présent sur la page événement.", acceptanceCriteria: ["Replanifier lors d'une prochaine revue de roadmap", "Capacité configurable", "Confirmation envoyée", "Liste des participants exportable"] },
    ],
  },
  {
    id: "sprint-3",
    title: "Sprint 3 — Dons",
    objective: "Mettre en service une collecte sécurisée, traçable et transparente.",
    horizon: "Dépend du choix du prestataire",
    features: [
      { id: "donation-ui", title: "Parcours de don", description: "Montant libre ou prédéfini, fréquence, identité et message.", status: "completed", progress: 100, priority: "high", evidence: "Interface et validation Zod présentes.", acceptanceCriteria: ["Validation des montants", "Parcours mobile utilisable"] },
      { id: "payment-provider", title: "Paiement réel", description: "Intégrer Stripe, PayPal ou un prestataire compatible avec les besoins FSF.", status: "in-progress", progress: 25, priority: "critical", evidence: "Interface prête; commentaire d'intégration future dans le code.", acceptanceCriteria: ["Paiement test et production", "Webhooks vérifiés", "Échecs et remboursements gérés"] },
      { id: "recurring-donations", title: "Dons récurrents", description: "Créer, modifier et arrêter les contributions mensuelles.", status: "in-progress", progress: 15, priority: "high", evidence: "Option mensuelle visible, sans traitement associé.", acceptanceCriteria: ["Abonnement créé chez le prestataire", "Portail donateur disponible"] },
      { id: "donation-receipts", title: "Reçus et suivi des dons", description: "Reçus automatiques, historique et export administratif.", status: "not-started", progress: 0, priority: "high", evidence: "Aucun stockage ou génération de reçu.", acceptanceCriteria: ["Reçu généré automatiquement", "Export comptable disponible"] },
      { id: "campaign-progress", title: "Campagnes et objectifs", description: "Affecter les dons à des campagnes et afficher leur progression.", status: "not-started", progress: 0, priority: "medium", evidence: "Aucun modèle de campagne dynamique.", acceptanceCriteria: ["Objectif configurable", "Progression publique exacte"] },
    ],
  },
  {
    id: "sprint-4",
    title: "Sprint 4 — Administration et contenus",
    objective: "Rendre l'équipe autonome dans la publication et le traitement des demandes.",
    horizon: "Après choix Firebase/CMS",
    features: [
      { id: "firebase-foundation", title: "Socle Firebase", description: "Configurer projet, environnements, règles et accès aux services nécessaires.", status: "in-progress", progress: 20, priority: "critical", evidence: "Dépendances et App Hosting présents; aucune donnée applicative connectée.", acceptanceCriteria: ["Environnements séparés", "Règles de sécurité testées", "Secrets hors du dépôt"] },
      { id: "admin-auth", title: "Authentification administrateur", description: "Connexion sécurisée et rôles pour l'équipe FSF.", status: "not-started", progress: 0, priority: "critical", evidence: "Aucun système d'authentification.", acceptanceCriteria: ["MFA disponible", "Rôles et permissions vérifiés", "Sessions révocables"] },
      { id: "cms", title: "Gestion des contenus", description: "Créer et publier initiatives, actualités, événements et traductions.", status: "not-started", progress: 0, priority: "high", evidence: "Contenus codés dans des fichiers TypeScript.", acceptanceCriteria: ["Brouillon et publication", "Prévisualisation", "Historique des modifications"] },
      { id: "media-library", title: "Médiathèque", description: "Téléverser, décrire, optimiser et organiser les médias.", status: "not-started", progress: 0, priority: "high", evidence: "Environ 2,85 Go d'images stockées directement dans Git.", acceptanceCriteria: ["Stockage CDN", "Optimisation automatique", "Métadonnées et droits associés"] },
      { id: "case-management", title: "Suivi opérationnel", description: "Tableaux de traitement pour messages, bénévoles, événements et dons.", status: "not-started", progress: 0, priority: "medium", evidence: "Aucun tableau de bord métier.", acceptanceCriteria: ["Filtres et statuts", "Historique d'activité", "Exports contrôlés"] },
    ],
  },
  {
    id: "sprint-5",
    title: "Sprint 5 — Qualité et croissance",
    objective: "Améliorer visibilité, performance, accessibilité et mesure d'impact.",
    horizon: "Amélioration continue",
    features: [
      { id: "seo", title: "SEO et partage social", description: "Métadonnées par page, sitemap, robots, canonical et Open Graph.", status: "in-progress", progress: 25, priority: "high", evidence: "Métadonnées globales minimales seulement.", acceptanceCriteria: ["Sitemap et robots valides", "Aperçus sociaux corrects", "Données structurées pertinentes"] },
      { id: "i18n", title: "Internationalisation robuste", description: "Traductions complètes, URLs localisées et validations bilingues.", status: "in-progress", progress: 70, priority: "high", evidence: "FR/EN et persistance disponibles; quelques chaînes restent en anglais.", acceptanceCriteria: ["Aucune clé ou chaîne non traduite", "SEO distinct par langue"] },
      { id: "performance", title: "Performance des médias", description: "Compression, formats modernes, CDN et chargement progressif.", status: "in-progress", progress: 20, priority: "critical", evidence: "Images locales non optimisées; corpus proche de 2,85 Go.", acceptanceCriteria: ["Budgets Lighthouse définis", "Images WebP/AVIF", "Poids initial maîtrisé"] },
      { id: "accessibility", title: "Accessibilité", description: "Audit WCAG, navigation clavier, contrastes et alternatives médias.", status: "in-progress", progress: 45, priority: "high", evidence: "Attributs alt et primitives accessibles présents; aucun audit automatisé.", acceptanceCriteria: ["Audit WCAG 2.2 AA", "Parcours clavier vérifiés", "Formulaires annoncés correctement"] },
      { id: "analytics", title: "Analytics et mesure d'impact", description: "Mesurer les parcours et publier des indicateurs d'impact fiables.", status: "not-started", progress: 0, priority: "medium", evidence: "Aucune solution analytics identifiée.", acceptanceCriteria: ["Consentement respecté", "Événements clés documentés", "Tableau d'impact alimenté"] },
      { id: "search-newsletter", title: "Recherche et newsletter", description: "Recherche globale, filtres de contenu et inscription newsletter.", status: "not-started", progress: 0, priority: "low", evidence: "Fonctionnalités absentes.", acceptanceCriteria: ["Recherche pertinente", "Désinscription newsletter disponible"] },
    ],
  },
  {
    id: "sprint-6",
    title: "Sprint 6 — Fiabilité et innovation",
    objective: "Industrialiser la livraison puis introduire des fonctions avancées utiles.",
    horizon: "Long terme",
    features: [
      { id: "automated-tests", title: "Tests automatisés", description: "Tests unitaires, composants, intégration et parcours end-to-end.", status: "not-started", progress: 0, priority: "critical", evidence: "Aucune suite de tests identifiée.", acceptanceCriteria: ["Parcours critiques couverts", "Tests exécutés en CI"] },
      { id: "quality-gates", title: "Quality gates CI", description: "Bloquer les builds en cas d'erreur TypeScript, lint, test ou accessibilité critique.", status: "in-progress", progress: 30, priority: "critical", evidence: "Typecheck réussit, mais les erreurs TypeScript et ESLint sont ignorées au build.", acceptanceCriteria: ["Aucune erreur ignorée", "CI requise avant fusion"] },
      { id: "monitoring", title: "Monitoring et alertes", description: "Suivi des erreurs, disponibilité, performance et incidents.", status: "not-started", progress: 0, priority: "high", evidence: "Aucun outil de monitoring identifié.", acceptanceCriteria: ["Alertes actionnables", "Erreurs front et backend corrélées"] },
      { id: "deployment-strategy", title: "Stratégie de déploiement", description: "Choisir et documenter GitHub Pages, Firebase App Hosting ou une autre cible.", status: "in-progress", progress: 90, priority: "high", evidence: "GitHub Pages est la cible publique du frontend statique; le workflow déploie main sous /FSF_Co et le composant image partagé préfixe les médias locaux au build sans modifier leurs sources métier.", acceptanceCriteria: ["Cible officielle choisie", "Déploiement GitHub Pages, routes, scripts, styles et images vérifiés", "Galerie chargée progressivement sans monter les 230 images initialement", "Rollback documenté", "Environnements preview et production"] },
      { id: "ai-assistance", title: "Fonctions IA encadrées", description: "Assistant multilingue, recherche sémantique ou aide éditoriale avec validation humaine.", status: "in-progress", progress: 10, priority: "low", evidence: "Genkit/Gemini configuré sans flow ni interface.", acceptanceCriteria: ["Cas d'usage validé", "Protection des données", "Évaluation qualité et coût"] },
      { id: "stable-handoff", title: "Gouvernance STABLE et handoff", description: "Appliquer un cadre d'ingénierie commun et transmettre un état vérifiable après chaque feature.", status: "completed", progress: 100, priority: "critical", evidence: "STABLE_FRAMEWORK.md, STABLE_AI_CODING_SKILL.md et CODE_HANDOFF.md intégrés; procédure de synchronisation documentée.", acceptanceCriteria: ["Règles STABLE présentes dans le dépôt", "Handoff initial créé", "Tracker Markdown et UI mis à jour", "Procédure post-feature documentée"] },
    ],
  },
];

export const allTrackerFeatures = projectSprints.flatMap((sprint) =>
  sprint.features.map((feature) => ({ ...feature, sprintId: sprint.id, sprintTitle: sprint.title }))
);

export function calculateProgress(features: Pick<TrackerFeature, "progress">[]) {
  if (!features.length) return 0;
  return Math.round(features.reduce((sum, feature) => sum + feature.progress, 0) / features.length);
}
